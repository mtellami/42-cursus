import numpy as np
from PIL import Image


def display(array: np.ndarray):
    """Display the array pixels as image."""
    Image.fromarray(array).show()


def ft_invert(array) -> np.ndarray:
    """Inverts the color of the image received."""
    return 255 - array.copy()


def ft_red(array) -> np.ndarray:
    """Convert the color of the image received into red scale."""
    result = array.copy()
    result[:, :, 1] = result[:, :, 2] = 0
    return result


def ft_green(array) -> np.ndarray:
    """Convert the color of the image received into green scale."""
    result = array.copy()
    result[:, :, 0] = result[:, :, 2] = 0
    return result


def ft_blue(array) -> np.ndarray:
    """Convert the color of the image received into blue scale."""
    result = array.copy()
    result[:, :, 0] = result[:, :, 1] = 0
    return result


def ft_grey(array) -> np.ndarray:
    """Convert the color of the image received into grey scale."""
    grey = array[:, :, 2].astype(array.dtype)
    result = np.stack([grey, grey, grey], axis=2)
    return result
