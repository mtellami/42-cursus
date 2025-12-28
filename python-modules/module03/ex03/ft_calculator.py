class calculator:
    """Calculator class."""

    def __init__(self, vector: list):
        """Class Calculator contructor."""
        self.vector = vector

    def __add__(self, object) -> None:
        """Addition method"""
        self.vector = [x + object for x in self.vector]
        print(self.vector)

    def __mul__(self, object) -> None:
        """Multiplication method."""
        self.vector = [x * object for x in self.vector]
        print(self.vector)

    def __sub__(self, object) -> None:
        """Subtraction method."""
        self.vector = [x - object for x in self.vector]
        print(self.vector)

    def __truediv__(self, object) -> None:
        """Division method."""
        try:
            self.vector = [x / object for x in self.vector]
            print(self.vector)
        except ZeroDivisionError as e:
            print(f"Error: {e}. Cannot divide by 0.")