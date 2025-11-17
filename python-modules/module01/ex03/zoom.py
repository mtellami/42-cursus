import numpy as np
import matplotlib.pyplot as plt
from load_image import ft_load


def main():
    """
    Loads the 'animal.jped' image zoom it by 400 and display it
    """
    try:
        image = ft_load("animal.jpeg")
        array = np.array(image)
        print(f"The shape of the image is: {array.shape}")
        print(array)

        image = image.crop((450, 100, 850, 500)).convert("L")
        array = np.array(image)

        print(f"New shape after slicing: {array.shape}")
        print(array)

        plt.imshow(array, cmap="gray")
        plt.show()
    except Exception as err:
        exit(f"Exception: {err}")


if __name__ == "__main__":
    main()
