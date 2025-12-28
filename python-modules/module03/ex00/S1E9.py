from abc import ABC, abstractmethod


class Character(ABC):
    """Abstract class representing a generic character with a name and alive status."""

    @abstractmethod
    def __init__(self, first_name, is_alive = True):
        """Character class constructor."""
        self.first_name = first_name
        self.is_alive = is_alive

    def die(self):
        """Change the character's health state."""
        self.is_alive = False


class Stark(Character):
    """Represents a member of House Stark who can change their health state."""

    def __init__(self, first_name, is_alive = True):
        """Stark Class contructor."""
        super().__init__(first_name, is_alive)
