#!/usr/bin/env python3
"""
Image optimization script for portfolio website.
Converts images to WebP format and creates multiple sizes for responsive loading.
"""

import os
import sys
from PIL import Image
import argparse

# Configuration
CONFIG = {
    'quality': 80,
    'sizes': {
        'small': 486,   # Display size
        'medium': 972,  # 2x display size  
        'large': 1458   # 3x display size
    },
    'input_dir': 'Images',
    'output_dir': 'Images/optimized'
}

def ensure_output_dir():
    """Create output directory if it doesn't exist."""
    if not os.path.exists(CONFIG['output_dir']):
        os.makedirs(CONFIG['output_dir'])
        print(f"Created directory: {CONFIG['output_dir']}")

def get_image_size_mb(filepath):
    """Get file size in MB."""
    return os.path.getsize(filepath) / (1024 * 1024)

def optimize_image(image_name):
    """Optimize a single image and create multiple sizes."""
    input_path = os.path.join(CONFIG['input_dir'], image_name)
    
    if not os.path.exists(input_path):
        print(f"❌ Image not found: {input_path}")
        return False
    
    base_name = os.path.splitext(image_name)[0]
    print(f"Optimizing {image_name}...")
    
    try:
        # Open and get image info
        with Image.open(input_path) as img:
            original_size_mb = get_image_size_mb(input_path)
            print(f"  Original: {img.size[0]}x{img.size[1]}, {original_size_mb:.2f}MB")
            
            # Convert to RGB if necessary (for JPEG compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background for transparent images
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Generate different sizes
            for size_name, width in CONFIG['sizes'].items():
                # Calculate new dimensions maintaining aspect ratio
                aspect_ratio = img.size[1] / img.size[0]
                new_height = int(width * aspect_ratio)
                
                # Don't upscale images
                if width >= img.size[0]:
                    resized_img = img.copy()
                else:
                    resized_img = img.resize((width, new_height), Image.Resampling.LANCZOS)
                
                # Generate WebP version
                webp_path = os.path.join(CONFIG['output_dir'], f"{base_name}-{size_name}.webp")
                resized_img.save(
                    webp_path,
                    'WEBP',
                    quality=CONFIG['quality'],
                    optimize=True
                )
                
                webp_size_mb = get_image_size_mb(webp_path)
                print(f"  Generated {size_name}: {webp_path} ({webp_size_mb:.2f}MB)")
                
                # Generate fallback JPEG version (only for small size)
                if size_name == 'small':
                    jpg_path = os.path.join(CONFIG['output_dir'], f"{base_name}-fallback.jpg")
                    resized_img.save(
                        jpg_path,
                        'JPEG',
                        quality=CONFIG['quality'],
                        optimize=True
                    )
                    jpg_size_mb = get_image_size_mb(jpg_path)
                    print(f"  Generated fallback: {jpg_path} ({jpg_size_mb:.2f}MB)")
            
            print(f"✅ Successfully optimized {image_name}")
            return True
            
    except Exception as e:
        print(f"❌ Error optimizing {image_name}: {str(e)}")
        return False

def main():
    """Main function to handle image optimization."""
    parser = argparse.ArgumentParser(description='Optimize images for portfolio website')
    parser.add_argument('image', nargs='?', help='Specific image name to optimize (without extension)')
    args = parser.parse_args()
    
    ensure_output_dir()
    
    if args.image:
        # Optimize specific image
        image_name = args.image
        if not image_name.lower().endswith(('.jpg', '.jpeg', '.png')):
            image_name += '.jpg'
        
        optimize_image(image_name)
    else:
        # Optimize all images in the Images directory
        image_extensions = ('.jpg', '.jpeg', '.png')
        image_files = [
            f for f in os.listdir(CONFIG['input_dir'])
            if f.lower().endswith(image_extensions)
        ]
        
        if not image_files:
            print(f"No images found in {CONFIG['input_dir']}")
            return
        
        print(f"Found {len(image_files)} images to optimize...")
        
        success_count = 0
        for image_file in image_files:
            if optimize_image(image_file):
                success_count += 1
            print()  # Add spacing between images
        
        print(f"🎉 Optimization complete! {success_count}/{len(image_files)} images processed successfully.")

if __name__ == '__main__':
    main()
