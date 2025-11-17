import numpy as np


def slice_me(family: list, start: int, end: int) -> list:
    """
    Slices a 2D list of float pairs from start index to end index.
    """
    try:
        if not isinstance(start, int) or not isinstance(end, int):
            raise TypeError("start and end must be integers")
        arr = np.array(family, dtype=object)
        if arr.ndim != 2:
            raise ValueError("family must be a rectangular 2D list")
        print(f"My shape is : {arr.shape}")
        new_arr = arr[start:end]
        print(f"My new shape is : {new_arr.shape}")
        return new_arr.tolist()
    except Exception as err:
        print("An Error Occured:", err)
        return []
