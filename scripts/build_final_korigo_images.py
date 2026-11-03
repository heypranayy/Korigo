import os
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

def create_photorealistic_shadow(alpha_mask, light_angle_deg=-45, distance=20, blur_radius=18, max_opacity=0.50):
    w, h = alpha_mask.size
    pad = blur_radius * 2 + distance
    
    rad = np.radians(light_angle_deg + 180)
    dx = int(distance * np.cos(rad))
    dy = int(distance * np.sin(rad))
    
    shadow_canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    cast_shadow = Image.new("RGBA", (w, h), (18, 20, 24, int(255 * max_opacity)))
    cast_shadow.putalpha(ImageEnhance.Brightness(alpha_mask).enhance(max_opacity))
    
    shadow_canvas.paste(cast_shadow, (pad + dx, pad + dy), cast_shadow)
    soft_shadow = shadow_canvas.filter(ImageFilter.GaussianBlur(blur_radius))
    
    contact_canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    contact_shadow = Image.new("RGBA", (w, h), (12, 14, 18, int(255 * 0.70)))
    contact_shadow.putalpha(ImageEnhance.Brightness(alpha_mask).enhance(0.70))
    contact_canvas.paste(contact_shadow, (pad, pad + 4), contact_shadow)
    tight_contact = contact_canvas.filter(ImageFilter.GaussianBlur(4))
    
    combined = Image.alpha_composite(soft_shadow, tight_contact)
    return combined, pad

def place_packet(layer, img_path, target_h, angle_deg, pos_xy, shadow_params=None):
    pack = Image.open(img_path).convert('RGBA')
    aspect = pack.width / pack.height
    target_w = int(target_h * aspect)
    resized = pack.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    if angle_deg != 0:
        rotated = resized.rotate(angle_deg, resample=Image.Resampling.BICUBIC, expand=True)
    else:
        rotated = resized
        
    x, y = pos_xy
    if shadow_params:
        shadow, pad = create_photorealistic_shadow(
            rotated.getchannel('A'),
            light_angle_deg=shadow_params.get('light_angle', -45),
            distance=shadow_params.get('distance', 18),
            blur_radius=shadow_params.get('blur', 16),
            max_opacity=shadow_params.get('opacity', 0.50)
        )
        layer.paste(shadow, (x - pad, y - pad), shadow)
        
    layer.paste(rotated, (x, y), rotated)

def generate_travel_blog_image():
    base = Image.open('public/assets/korigo/blogs/healthy-travel-snacks.jpg').convert('RGBA')
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    
    # In travel shot, window light is from right side. Light angle = 45 deg (casts shadow towards bottom-left).
    shadow_cfg_bg = {'light_angle': 45, 'distance': 22, 'blur': 18, 'opacity': 0.45}
    shadow_cfg_fg = {'light_angle': 45, 'distance': 24, 'blur': 20, 'opacity': 0.50}
    
    # 1. Citrus Cartel (behind, slightly smaller, angled right)
    place_packet(
        layer,
        'public/assets/korigo/products/transparent_citrus_cartel.png',
        target_h=420,
        angle_deg=5,
        pos_xy=(370, 275),
        shadow_params=shadow_cfg_bg
    )
    
    # 2. Sour Creme d' Onion (in front, prominent, angled left)
    place_packet(
        layer,
        'public/assets/korigo/products/transparent_creme_onion.png',
        target_h=465,
        angle_deg=-4,
        pos_xy=(195, 250),
        shadow_params=shadow_cfg_fg
    )
    
    result = Image.alpha_composite(base, layer).convert('RGB')
    target = 'public/assets/korigo/blogs/healthy-travel-snacks.jpg'
    result.save(target, quality=95)
    print(f"Generated travel blog image: {target} ({result.size})")

def generate_corporate_blog_image():
    base = Image.open('public/assets/korigo/blogs/healthy-corporate-gifts.jpg').convert('RGBA')
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    
    # Light from top-left. Light angle = -45 deg (casts shadow towards bottom-right).
    shadow_cfg_left = {'light_angle': -45, 'distance': 18, 'blur': 16, 'opacity': 0.45}
    shadow_cfg_right = {'light_angle': -45, 'distance': 20, 'blur': 18, 'opacity': 0.45}
    shadow_cfg_center = {'light_angle': -45, 'distance': 24, 'blur': 22, 'opacity': 0.55}
    
    # 1. Left pack: Coco Island leaning on the left side of the hamper
    place_packet(
        layer,
        'public/assets/korigo/products/transparent_coco_island.png',
        target_h=410,
        angle_deg=6,
        pos_xy=(185, 260),
        shadow_params=shadow_cfg_left
    )
    
    # 2. Right pack: Sour Creme d' Onion on the right side
    place_packet(
        layer,
        'public/assets/korigo/products/transparent_creme_onion.png',
        target_h=390,
        angle_deg=-6,
        pos_xy=(730, 270),
        shadow_params=shadow_cfg_right
    )
    
    # 3. Centerpiece: Korigo Makhana Combo Pack (Garlicked Cheese + Citrus Cartel duo)
    place_packet(
        layer,
        'public/assets/korigo/combos/transparent_garlc_citrus.png',
        target_h=475,
        angle_deg=-2,
        pos_xy=(375, 215),
        shadow_params=shadow_cfg_center
    )
    
    result = Image.alpha_composite(base, layer).convert('RGB')
    target = 'public/assets/korigo/blogs/healthy-corporate-gifts.jpg'
    result.save(target, quality=95)
    print(f"Generated corporate blog image: {target} ({result.size})")

if __name__ == '__main__':
    generate_travel_blog_image()
    generate_corporate_blog_image()
