def mean(numbers, n):
    """Compute the arithmetic mean of a list of numbers."""
    return sum(numbers) / n


def median(numbers, n):
    """Compute the median of a list of numbers."""
    mid = n // 2
    if n % 2 == 0:
        res = (numbers[mid - 1] + numbers[mid]) / 2
    else:
        res = numbers[mid]
    return int(res)


def quartile(numbers, n):
    """Compute the first and third quartiles of a list of numbers."""
    return [numbers[int(n * 0.25)], numbers[int(n * 0.75)]]


def variance(numbers, n):
    """Compute the population variance of a list of numbers."""
    m = mean(numbers, n)
    return sum((x - m) ** 2 for x in numbers) / n


def std(numbers, n):
    """Compute the population standard deviation of a list of numbers."""
    return variance(numbers, n) ** 0.5


def ft_statistics(*args, **kwargs) -> None:
    """Compute statistical measures for a list of numeric arguments."""
    try:
        numbers = sorted([float(x) for x in args])
        n = len(numbers)

        ops = {
            "mean": mean,
            "median": median,
            "quartile": quartile,
            "var": variance,
            "std": std,
        }

        for value in kwargs.values():
            if value in ops:
                if len(numbers):
                    print(f"{value} : {ops[value](numbers, n)}")
                else:
                    print("ERROR")

    except Exception:
        print("ERROR")
