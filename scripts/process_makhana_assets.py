import os
from PIL import Image
import numpy as np

os.makedirs(r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\makhana", exist_ok=True)
os.makedirs(r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\hero", exist_ok=True)

brain_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\b239affd-80b4-48b2-8e83-390812c4cfe0"

items = [
    ("floating_makhana_pop_1792168926342.jpg", "makhana_roasted.png"),
    ("sriracha_makhana_pop_1792168943624.jpg", "makhana_sriracha.png"),
    ("cheese_makhana_pop_1792168967462.jpg", "makhana_cheese.png"),
]

for src_name, dst_name in items:
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\makhana", dst_name)
    
    img = Image.open(src_path).convert("RGBA")
    data = np.array(img)
    
    # Check pixels close to white
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    # Brightness threshold
    brightness = (r.astype(int) + g.astype(int) + b.astype(int)) / 3.0
    
    # Smooth alpha falloff for white background
    # Between 240 and 254
    alpha = np.where(brightness >= 252, 0,
            np.where(brightness >= 238, ((252 - brightness) / 14.0) * 255, 255))
    
    data[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)
    
    out_img = Image.fromarray(data)
    out_img.save(dst_path, "PNG")
    print(f"Saved transparent makhana to {dst_path}")

# Also copy cinematic background
bg_src = os.path.join(brain_dir, "korigo_hero_cinematic_bg_1792168996725.jpg")
bg_dst = r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\hero\korigo_cinematic_stage.jpg"
if os.path.exists(bg_src):
    Image.open(bg_src).save(bg_dst, "JPEG", quality=92)
    print(f"Saved cinematic background to {bg_dst}")
