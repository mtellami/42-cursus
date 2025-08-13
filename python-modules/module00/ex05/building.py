import sys


def count_text(text: str):
    """
    Count and print the number of uppercase letters, lowercase letters,
    punctuation marks, digits, and spaces in the given text.

    Args:
        text (str): The input string to analyze.

    Returns:
        None
    """
    total = len(text)
    upper = sum(1 for c in text if c.isupper())
    lower = sum(1 for c in text if c.islower())
    digits = sum(1 for c in text if c.isdigit())
    spaces = sum(1 for c in text if c.isspace())
    punctuation = total - (upper + lower + digits + spaces)

    print(f"The text contains {total} characters:")
    print(f"{upper} upper letters")
    print(f"{lower} lower letters")
    print(f"{punctuation} punctuation marks")
    print(f"{spaces} spaces")
    print(f"{digits} digits")


def main():
    """
    Main function: retrieves input text, handles command-line arguments,
    and prints the character counts.
    """
    if len(sys.argv) == 1:
        text = input("What is the text to count?\n") + "\n"
    elif len(sys.argv) == 2:
        text = sys.argv[1]
    else:
        raise AssertionError("More than one argument is provided")
    count_text(text)


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"AssertionError: {e}")
    except Exception as e:
        print(f"Error: {e}")
