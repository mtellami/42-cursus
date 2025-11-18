import pandas as pd


def load(path: str) -> pd.DataFrame:
    """
    Load takes a csv file path and returns a data frame.
    """
    try:
        df = pd.read_csv(path)
        print("Loading dataset of dimensions", df.shape)
        return df
    except Exception as e:
        print("Error occured: ", e)
        return pd.DataFrame()
