import random
import string
from dataclasses import dataclass, field


def generate_id() -> str:
    """generates a random 15 ascii lowercase student id"""
    return "".join(random.choices(string.ascii_lowercase, k=15))


@dataclass(repr=True)
class Student:
    """Dataclass representing information about a student."""

    name: str = field(init=True)
    surname: str = field(init=True)
    active: bool = field(default=True)
    login: str = field(init=False)
    id: str = field(init=False, default_factory=generate_id)

    def __post_init__(self):
        self.login = self.name[0].capitalize() + self.surname.lower()
