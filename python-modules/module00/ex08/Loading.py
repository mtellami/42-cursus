import os
import time


def percentage(part: int, whole: int) -> int:
    """ "returns a percentage."""
    Percentage = round(100 * float(part) / float(whole))
    return int(Percentage)


def timestamps(startTime: float, currentElem: int, totalElems: int) -> str:
    """returns a string containing timestamps and iterations per second"""
    elapsed_time = time.time() - startTime
    speed = currentElem / elapsed_time if elapsed_time > 0 else 0
    remaining_time = (totalElems - currentElem) / speed if speed > 0 else 0

    elapsed_minutes, elapsed_seconds = divmod(elapsed_time, 60)
    remaining_minutes, remaining_seconds = divmod(remaining_time, 60)

    result = f" [{elapsed_minutes:02.0f}:{elapsed_seconds:02.0f}<"
    result += f"{remaining_minutes:02.0f}:{remaining_seconds:02.0f}, "
    result += f"{speed:05.02f}it/s]"

    return result


def progressBar(barLength: int, currentElem: int, totalElems: int) -> str:
    """returns a string containing the progress bar"""
    progress = int(round(barLength) * (currentElem + 1) / float(totalElems))

    progress_bar = f"{percentage((currentElem + 1), totalElems):3d}%|"
    progress_bar += "█" * progress + " " * (barLength - progress)
    progress_bar += f"| {(currentElem + 1):3d}/{totalElems}"

    return progress_bar


def ft_tqdm(lst: range) -> None:
    """Decorate an iterable object, returning an iterator which acts exactly
    like the original iterable, but prints a dynamically updating
    progressbar every time a value is requested."""

    totalElems = len(lst) 
    size = os.get_terminal_size()

    requiredCharacters = 8 + (len(str(totalElems)) * 2) + 26
    barLength = size.columns - requiredCharacters

    startTime = time.time()

    for currentElem in lst:
        display = progressBar(barLength, currentElem, totalElems)
        display += timestamps(startTime, currentElem, totalElems)
        print(display, end="\r")
        yield

    return
