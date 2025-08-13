import sys


def main():
    if len(sys.argv) == 1:
        return
    elif len(sys.argv) > 2:
        raise AssertionError("more than one argument is provided")

    try:
        number = int(sys.argv[1])
    except ValueError:
        raise AssertionError("argument is not an integer")

    print(f"I'm {"Odd" if number % 2 else "Even"}.")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"AssertionError: {e}")
