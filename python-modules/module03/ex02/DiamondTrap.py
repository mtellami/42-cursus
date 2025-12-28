from S1E7 import Baratheon, Lannister


class King(Baratheon, Lannister):
    """Class representing king"""

    def __init__(self, first_name, is_alive=True):
        """Class King Constructor."""
        super().__init__(first_name, is_alive)

    def set_eyes(self, eyes):
        """eyes setter method"""
        self.eyes = eyes

    def get_eyes(self):
        """eyes getter method"""
        return self.eyes

    def set_hairs(self, hairs):
        """hairs setter method"""
        self.hairs = hairs

    def get_hairs(self):
        """hairs getter method"""
        return self.hairs
