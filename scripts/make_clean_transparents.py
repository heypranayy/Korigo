import os
import numpy as np
from PIL import Image, ImageFilter
from collections import deque

def cut_out_background(src_path, dst_path, white_thresh=235, edge_thresh=205):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    h, w = arr.shape[:2]
    
    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]
    min_rgb = np.minimum(np.minimum(r, g), b)
    
    # 4-way BFS from border for background detection
    visited = np.zeros((h, w), dtype=bool)
    bg_mask = np.zeros((h, w), dtype=bool)
    q = deque()
    
    for x in range(w):
        for y in [0, h - 1]:
            if min_rgb[y, x] >= edge_thresh:
                q.append((y, x))
                visited[y, x] = True
                bg_mask[y, x] = True
    for y in range(h):
        for x in [0, w - 1]:
            if not visited[y, x] and min_rgb[y, x] >= edge_thresh:
                q.append((y, x))
                visited[y, x] = True
                bg_mask[y, x] = True
                
    while q:
        cy, cx = q.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                if min_rgb[ny, nx] >= edge_thresh:
                    bg_mask[ny, nx] = True
                    q.append((ny, nx))
                    
    # Generate alpha channel
    alpha = np.full((h, w), 255.0, dtype=np.float32)
    alpha[bg_mask] = 0.0
    
    # Smooth edges for any pixels adjacent to bg_mask that have min_rgb >= 200
    # To prevent white fringe/halo:
    # Blend semi-transparent transition
    bg_dilated = Image.fromarray(bg_mask.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(5))
    dilated_arr = np.array(bg_dilated) > 0
    edge_zone = dilated_arr & (~bg_mask) & (min_rgb > 195)
    
    # For edge zone, ramp alpha based on distance from white
    edge_factor = np.clip((245.0 - min_rgb[edge_zone]) / 50.0, 0.0, 1.0)
    alpha[edge_zone] = np.minimum(alpha[edge_zone], edge_factor * 255.0)
    
    arr[:, :, 3] = alpha
    
    result = Image.fromarray(arr.astype(np.uint8))
    result.save(dst_path, "PNG")
    print(f"Processed: {os.path.basename(dst_path)} -> Size: {result.size}, Alpha min: {np.min(arr[:,:,3])}, Alpha max: {np.max(arr[:,:,3])}")

# 1. Singles
singles = [
    ("public/assets/korigo/products/whitefrontssasysiracha.png", "public/assets/korigo/products/transparent_sassy_sriracha.png"),
    ("public/assets/korigo/products/white_front_garlicked_cheese.png", "public/assets/korigo/products/transparent_garlicked_cheese.png"),
    ("public/assets/korigo/products/white_front_citrus_cirtel.png", "public/assets/korigo/products/transparent_citrus_cartel.png"),
    ("public/assets/korigo/products/white_front.png", "public/assets/korigo/products/transparent_creme_onion.png"),
    ("public/assets/korigo/products/white_front_cinemon_drip.png", "public/assets/korigo/products/transparent_cinnamon_drip.png"),
    ("public/assets/korigo/products/white_front_coco_island.png", "public/assets/korigo/products/transparent_coco_island.png"),
]

print("=== Processing Singles ===")
for src, dst in singles:
    if os.path.exists(src):
        cut_out_background(src, dst)
    else:
        print(f"Warning: source {src} not found!")

# 2. Combos
combos = [
    ("public/assets/korigo/combos/citrus_sassy.png", "public/assets/korigo/combos/transparent_citrus_sassy.png"),
    ("public/assets/korigo/combos/creamonion_sassy.png", "public/assets/korigo/combos/transparent_creamonion_sassy.png"),
    ("public/assets/korigo/combos/creme_cinemo.png", "public/assets/korigo/combos/transparent_creme_cinemo.png"),
    ("public/assets/korigo/combos/garlc_citrus.png", "public/assets/korigo/combos/transparent_garlc_citrus.png"),
    ("public/assets/korigo/combos/garlic_cinemon.png", "public/assets/korigo/combos/transparent_garlic_cinemon.png"),
    ("public/assets/korigo/combos/garlic_sasy.png", "public/assets/korigo/combos/transparent_garlic_sasy.png"),
]

print("\n=== Processing Combos ===")
for src, dst in combos:
    if os.path.exists(src):
        cut_out_background(src, dst, white_thresh=230, edge_thresh=200)
    else:
        print(f"Warning: source {src} not found!")

print("\nAll transparent packet cutouts generated successfully!")
