def ft_statistics(*args, **kwargs) -> None:
    try:
        if len(args) == 0:
            print("ERROR")
            return

        numbers = [float(x) for x in args]
        n = len(numbers)
        numbers.sort()

        def mean():
            return sum(numbers) / n

        def median():
            mid = n // 2
            if n % 2 == 0:
                return (numbers[mid - 1] + numbers[mid]) / 2
            return numbers[mid]

        def quartile():
            return [numbers[int(n * 0.25)], numbers[int(n * 0.75)]]

        def variance():
            m = mean()
            return sum((x - m) ** 2 for x in numbers) / n

        def std():
            return variance() ** 0.5

        ops = {
            "mean": mean,
            "median": median,
            "quartile": quartile,
            "var": variance,
            "std": std,
        }

        printed = False

        for value in kwargs.values():
            if value in ops:
                print(f"{value} : {ops[value]()}")
                printed = True

        if not printed:
            print("ERROR")

    except Exception:
        print("ERROR")
