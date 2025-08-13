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
    # Lambda to check if a word is longer than n
    longer_than_n = lambda word: len(word) > n
    # Use ft_filter to filter words
    words = s.split()
    return ft_filter(longer_than_n, words)


def main():
    """
    Main function: handles argument parsing, type checking, and prints filtered words.
    """
    try:
        if len(sys.argv) != 3:
            raise AssertionError("the arguments are bad")

        s_arg = sys.argv[1]
        n_arg = sys.argv[2]

        if not isinstance(s_arg, str) or not n_arg.isdigit():
            raise AssertionError("the arguments are bad")

        n_arg = int(n_arg)

        result = filter_words_by_length(s_arg, n_arg)
        print(result)

    except AssertionError as e:
        print(f"AssertionError: {e}")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
