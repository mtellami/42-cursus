from PIL import Image
import numpy as np


def ft_zoom(image: Image.Image) -> np.ndarray:
    img = image.crop((450, 100, 850, 500)).convert("L")
    return np.array(img)


def ft_load(path: str) -> Image.Image:
    """
    Loads an image and returns it
    """
    with Image.open(path) as img:
        if img.format not in ["JPEG", "JPG"]:
            raise ValueError(
                f"Unsupported image format: {img.format}. "
                "Only JPG and JPEG are supported."
            )
        return img.copy()
