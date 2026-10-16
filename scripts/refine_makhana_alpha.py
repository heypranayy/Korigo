import os
from PIL import Image
import numpy as np
from collections import deque

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
    w, h = img.size
    arr = np.array(img, dtype=np.float32)
    
    # Calculate distance from white (255, 255, 255)
    diff = np.sqrt(
        (arr[:, :, 0] - 255)**2 +
        (arr[:, :, 1] - 255)**2 +
        (arr[:, :, 2] - 255)**2
    )
    
    # Alpha mask:
    # diff < 20 -> alpha 0
    # diff between 20 and 55 -> smooth ramp
    # diff > 55 -> alpha 255
    alpha = np.clip((diff - 18) / 38.0 * 255.0, 0, 255)
    
    # Also remove any floating light grey shadow near bottom edge
    # For bottom 15% of image, if diff < 70, make transparent
    bottom_start = int(h * 0.84)
    for y in range(bottom_start, h):
        factor = (y - bottom_start) / (h - bottom_start)
        shadow_thresh = 18 + factor * 50
        alpha[y, :] = np.where(diff[y, :] < shadow_thresh, 0, alpha[y, :])
        
    arr[:, :, 3] = alpha
    
    result = Image.fromarray(arr.astype(np.uint8))
    result.save(dst_path, "PNG")
    print(f"Refined {dst_name}")

print("Done refining transparent makhanas.")
