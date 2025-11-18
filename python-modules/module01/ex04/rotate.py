from load_image import ft_load, ft_zoom
import matplotlib.pyplot as plt
import numpy as np


def main():
    """
    Loads the image zoom it, rotate it and display it
    """
    try:
        image = ft_load("animal.jpeg")
        array = ft_zoom(image)
        print(f"The shape of image is: {array.shape}")
        print(array)

        rotated = np.stack(array, axis=1)
        print(f"New shape after Transpose: {rotated.shape}")
        print(rotated)

        plt.imshow(rotated, cmap="gray")
        plt.show()
    except Exception as err:
        exit(f"Exception: {err}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        exit(1)
