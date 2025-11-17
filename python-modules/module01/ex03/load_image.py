from PIL import Image


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
