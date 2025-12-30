def callLimit(limit: int):
    """A decorator to limit the number of times a function can be called."""
    count = 0

    def callLimiter(function):
        """Inner decorator function that wraps the target function."""
        def limit_function(*args: any, **kwds: any):
            """Wrapper function that enforces the call limit."""
            nonlocal count
            if count < limit:
                count += 1
                function(*args, **kwds)
            else:
                print(f"Error {function} called too many times")
            return function

        return limit_function

    return callLimiter
