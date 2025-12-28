from abc import ABC, abstractmethod


class Character(ABC):
    """Abstract class representing a generic character with a name and alive status."""

    def __init__(self, first_name: str, is_alive: bool = True):
        """Character class constructor."""
        self.first_name = first_name
        self.is_alive = is_alive

    @abstractmethod
    def die(self):
        """Abstract method to change the character's health state."""


class Stark(Character):
    """Represents a member of House Stark who can change their health state."""

    def die(self):
        """Change the character's health state to dead."""
        self.is_alive = False
