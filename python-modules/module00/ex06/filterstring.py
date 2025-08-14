import sys

from ft_filter import ft_filter


def filter_words_by_length(s: str, n: int):
    """
    Return a list of words from string s whose length is greater than n,
    using ft_filter.

    Args:
        s (str): Input string containing words separated by spaces.
        n (int): Minimum length threshold.

    Returns:
        list: List of words longer than n characters.
    """
    return ft_filter(lambda word: len(word) > n, s.split())


def main():
    """
    Main function: handles argument parsing, type checking, and prints filtered words.
    """
    if len(sys.argv) != 3:
        raise AssertionError("the arguments are bad")

    s_arg = sys.argv[1]
    n_arg = sys.argv[2]

    if not isinstance(s_arg, str) or not n_arg.isdigit():
        raise AssertionError("the arguments are bad")

    result = filter_words_by_length(s_arg, int(n_arg))
    print(result)


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"AssertionError: {e}")
    except Exception as e:
        print(f"Error: {e}")
