import numpy as np
import matplotlib.pyplot as plt


def display(array: np.ndarray):
    """Display the array pixels as image."""
    try:
        plt.imshow(array)
        plt.axis("off")
        plt.show()
    except Exception as e:
        print("Failed to display the image: ", e)


def ft_invert(array) -> np.ndarray:
    """Inverts the color of the image received."""
    try:
        if not isinstance(array, np.ndarray):
            raise TypeError("Input must be a NumPy array.")
        result = 255 - array.copy()
        display(result)
        return result
    except Exception as e:
        print("Failed to invert the array: ", e)
        return array


def ft_red(array) -> np.ndarray:
    """Convert the color of the image received into red scale."""
    try:
        if not isinstance(array, np.ndarray):
            raise TypeError("Input must be a NumPy array.")
        result = array.copy()
        result[:, :, 1] = result[:, :, 2] = 0
        display(result)
        return result
    except Exception as e:
        print("Failed to convert into red scale: ", e)
        return array


def ft_green(array) -> np.ndarray:
    """Convert the color of the image received into green scale."""
    try:
        if not isinstance(array, np.ndarray):
            raise TypeError("Input must be a NumPy array.")
        result = array.copy()
        result[:, :, 0] = result[:, :, 2] = 0
        display(result)
        return result
    except Exception as e:
        print("Failed to convert into green scale: ", e)
        return array


def ft_blue(array) -> np.ndarray:
    """Convert the color of the image received into blue scale."""
    try:
        if not isinstance(array, np.ndarray):
            raise TypeError("Input must be a NumPy array.")
        result = array.copy()
        result[:, :, 0] = result[:, :, 1] = 0
        display(result)
        return result
    except Exception as e:
        print("Failed to convert into blue scale: ", e)
        return array


def ft_grey(array) -> np.ndarray:
    """Convert the color of the image received into grey scale."""
    try:
        if not isinstance(array, np.ndarray):
            raise TypeError("Input must be a NumPy array.")
        grey = (0.299 * array[:, :, 0] +
                0.587 * array[:, :, 1] +
                0.114 * array[:, :, 2]).astype(array.dtype)
        result = np.stack([grey, grey, grey], axis=2)
        display(result)
        return result
    except Exception as e:
        print("Failed to convert into grey scale: ", e)
        return array
