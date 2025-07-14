import os

# Path to the main directory that contains crop folders
base_dir = "./"  # <-- Replace this with your actual path /for all the images

# print(os)

# Loop through each crop folder
for crop_label in os.listdir(base_dir):
    crop_folder = os.path.join(base_dir, crop_label)


    # Skip if it's not a folder
    if not os.path.isdir(crop_folder):
        continue

    # List all image files in the folder
    image_files = [f for f in os.listdir(crop_folder) if f.endswith((".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"))]

    # Sort for consistent naming
    image_files.sort()

    # Rename each file
    for i, filename in enumerate(image_files, start=1):
        ext = os.path.splitext(filename)[1]  # File extension
        new_name = f"{crop_label.lower()}_{i:03d}{ext}"
        src = os.path.join(crop_folder, filename)
        dst = os.path.join(crop_folder, new_name)
        print(f"Checking folder: {crop_folder}, found {len(image_files)} image(s)")
        print(f"Renaming {filename} → {new_name}")

        os.rename(src, dst)

    print(f"Renamed {len(image_files)} files in '{crop_label}' folder.")
