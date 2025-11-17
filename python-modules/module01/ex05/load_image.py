from PIL import Image
import numpy as np


def ft_load(path: str) -> np.ndarray:
    """
    Loads an image and returns it as an array
    """
    try:
        with Image.open(path) as img:
            if img.format not in ["JPEG", "JPG"]:
                raise ValueError(
                    f"Unsupported image format: {img.format}. "
                    "Only JPG and JPEG are supported."
                )
            array = np.array(img)
            print(f"The shape of the image is: {array.shape}")
            print(array)
            return array
    except Exception as e:
        exit(f"Exception: {e}")
