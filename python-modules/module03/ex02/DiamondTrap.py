from S1E7 import Baratheon, Lannister


class King(Baratheon, Lannister):
    """Class representing king"""

    eyes: str
    hairs: str

    def __init__(self, first_name):
        super().__init__(first_name)

    def die(self):
        return super().die()

    def set_eyes(self, eyes: str):
        self.eyes = eyes

    def get_eyes(self) -> str:
        return self.eyes

    def set_hairs(self, hairs):
        self.hairs = hairs

    def get_hairs(self):
        return self.hairs
