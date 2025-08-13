from PIL import Image

# Load an image (make sure 'object.png' exists in the same folder)
image_path = "object.jpg.jpg"
img = Image.open(image_path)

angle = 0

while True:
    permission = input("Do you want to tilt the image? (yes/no): ").strip().lower()

    if permission == "yes":
        angle += 30  # rotate by 10 degrees each time
        tilted_img = img.rotate(angle, expand=True)  # expand to fit after rotation
        tilted_img.show()  # open in default image viewer
        print(f"Image tilted to {angle}°")
    elif permission == "no":
        print("Stopping tilt operation.")
        break
    else:
        print("Invalid input. Please type 'yes' or 'no'.")