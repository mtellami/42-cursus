import numpy as np


def is_numbers_list(array):
    """Check if the param is a list of numbers (int or float)"""
    if not isinstance(array, list):
        return False
    if not all(isinstance(n, (int, float)) for n in array):
        return False
    return True


def apply_limit(bmi: list[int | float], limit: int) -> list[bool]:
    """Apply limit to a BMI list"""
    try:
        if not is_numbers_list(bmi):
            raise TypeError("BMI must be a list of int or float")
        if not isinstance(limit, int):
            raise TypeError("Limit must be an integer")
        return (np.array(bmi, dtype=float) > limit).tolist()
    except Exception as err:
        print("Error occured: ", err)
        return []


def give_bmi(height: list[int | float], weight: list[int | float]) -> list[int | float]:
    """Compute BMI from weight and height lists"""
    try:
        if not is_numbers_list(height) or not is_numbers_list(weight):
            raise TypeError("Height and weight must be lists of ints or floats")
        h = np.array(height, dtype=float)
        w = np.array(weight, dtype=float)
        if h.size != w.size:
            raise ValueError("Height and weight must have the same length")
        if not np.all(h > 0):
            raise ValueError("All heights must be greater than 0")
        return (w / (h * h)).tolist()
    except Exception as err:
        print("An Error Occured:", err)
        return []
