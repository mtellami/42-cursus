from abc import ABC, abstractmethod


class Character(ABC):
    """Abstract class representing a generic character with a name and alive status."""

    @abstractmethod
    def __init__(self, first_name, is_alive = True):
        """Character class constructor."""
        self.first_name = first_name
        self.is_alive = is_alive
        self.family_name = None
        self.eyes = None
        self.hairs = None

    def die(self):
        """Change the character's health state."""
        self.is_alive = False
    
    def __str__(self):
        """Returns a string representation for debugging"""
        return f"Vector :('{self.family_name}', '{self.eyes}', '{self.hairs}')"

    def __repr__(self):
        """Returns a string representation of the Lannister character."""
        return self.__str__()


class Stark(Character):
    """Represents a member of House Stark who can change their health state."""

    def __init__(self, first_name, is_alive = True):
        """Stark Class contructor."""
        super().__init__(first_name, is_alive)
        self.family_name = 'Stark'
        self.eyes = 'blue'
        self.hairs = 'red'
