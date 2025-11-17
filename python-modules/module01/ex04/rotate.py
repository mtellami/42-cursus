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

        transposed = np.zeros((array.shape[1], array.shape[0]))
        # iterate through rows
        for i in range(array.shape[0]):
            # iterate through columns
            for j in range(array.shape[1]):
                transposed[j][i] = array[i][j]

        print(f"New shape after Transpose: {transposed.shape}")
        print(array)

        plt.imshow(transposed, cmap="gray")
        plt.show()
    except Exception as err:
        exit(f"Exception: {err}")


if __name__ == "__main__":
    main()
