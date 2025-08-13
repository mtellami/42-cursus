def ft_filter(func, iterable):
    """
    ft_filter(function or None, iterable) --> list
    Return a list containing those items of iterable for which function(item)
    is true. If function is None, return the items that are true.
    """
    if func is None:
        return [item for item in iterable if item]
    else:
        return [item for item in iterable if func(item)]
