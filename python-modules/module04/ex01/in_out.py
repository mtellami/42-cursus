def square(x: int | float) -> int | float:
    """compute the square value of a number."""
    return x**2


def pow(x: int | float) -> int | float:
    """compute the values x raised to the power of itself."""
    return x**x


def outer(x: int | float, function) -> object:
    """outer is an enclosure that returns a nested function"""
    result = x

    def inner() -> float:
        """nested function that counts the number of iterations and returns
        the result of the operation from pow or square. It takes no
        parameters"""
        try:
            nonlocal result
            result = function(result)
            return result
        except Exception as e:
            print(e)
            return float("nan")

    return inner
