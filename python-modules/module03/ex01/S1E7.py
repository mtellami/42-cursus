from S1E9 import Character


class Baratheon(Character):
    """Class representing House Baratheon."""

    def __init__(self, first_name, is_alive=True):
        super().__init__(first_name, is_alive)

    def __str__(self):
        return f"Baratheon {self.first_name}: {'Alive' if self.is_alive else 'Dead'}"

    def __repr__(self):
        return self.__str__()


class Lannister(Character):
    """Class representing House Lannister."""

    def __init__(self, first_name, is_alive=True):
        super().__init__(first_name, is_alive)

    def __str__(self):
        return f"Lannister {self.first_name}: {'Alive' if self.is_alive else 'Dead'}"

    def __repr__(self):
        return self.__str__()

    @classmethod
    def create_lannister(cls, name):
        """Create a Lannister in a chain."""
        return cls(name)
