import sys

NESTED_MORSE = {
    "A": ".- ",
    "B": "-... ",
    "C": "-.-. ",
    "D": "-.. ",
    "E": ". ",
    "F": "..-. ",
    "G": "--. ",
    "H": ".... ",
    "I": ".. ",
    "J": ".--- ",
    "K": "-.- ",
    "L": ".-.. ",
    "M": "-- ",
    "N": "-. ",
    "O": "--- ",
    "P": ".--. ",
    "Q": "--.- ",
    "R": ".-. ",
    "S": "... ",
    "T": "- ",
    "U": "..- ",
    "V": "...- ",
    "W": ".-- ",
    "X": "-..- ",
    "Y": "-.-- ",
    "Z": "--.. ",
    "0": "----- ",
    "1": ".---- ",
    "2": "..--- ",
    "3": "...-- ",
    "4": "....- ",
    "5": "..... ",
    "6": "-.... ",
    "7": "--... ",
    "8": "---.. ",
    "9": "----. ",
    " ": "/ ",
}


def main():
    """
    Main function: handles argument parsing, type checking, and prints Morse code.
    """
    if len(sys.argv) != 2:
        raise AssertionError("the arguments are bad")
    text = sys.argv[1]

    morse_list = []
    for char in text:
        upper_char = char.upper()
        if upper_char not in NESTED_MORSE:
            raise AssertionError("the arguments are bad")
        morse_list.append(NESTED_MORSE[upper_char])
    print("".join(morse_list).rstrip())


if __name__ == "__main__":
    try:
        main()
    except AssertionError as e:
        print(f"AssertionError: {e}")
    except Exception as e:
        print(f"Error: {e}")
