from load_csv import load
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick


def human_format(val):
    """
    Convert a number into a human-readable format (k, m, b)
    """
    if val >= 1_000_000_000:
        return f"{val/1_000_000_000:.0f}b"
    if val >= 1_000_000:
        return f"{val/1_000_000:.0f}m"
    if val >= 1_000:
        return f"{val/1_000:.0f}k"
    return str(int(val))


def to_number(v):
    """
    Convert a value into float
    """
    v = str(v).strip().lower()
    if v.endswith("m"):
        return float(v[:-1]) * 1_000_000
    if v.endswith("k"):
        return float(v[:-1]) * 1_000
    return float(v)


def visualize(x: list[float], *series: tuple[str, list[float]]):
    """
    Visualze the csv file data using matplot
    """
    for label, values in series:
        plt.plot(x, values, label=label)

    plt.title("Population Projections")
    plt.xlabel("Year")
    plt.ylabel("Population")
    plt.gca().yaxis.set_major_formatter(
        mtick.FuncFormatter(lambda val, _: human_format(val))
    )
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.show()


def extract_country(df, name: str) -> tuple[str, list[float]]:
    """
    Extract a country's row and convert its values into numeric population.
    """
    country = df[df["country"] == name]
    if country.empty:
        raise ValueError(f"Country '{name}' not found in CSV.")
    row = country.iloc[0].drop("country")
    values = [to_number(v) for v in row.values]
    return name, values


def main():
    """
    Load a csv file dataset and visualize countries population
    """
    df = load("population_total.csv")
    if df.empty:
        raise ValueError("Csv data file is empty")

    years = df.columns.drop("country").astype(int).tolist()

    morocco_axis = extract_country(df, "Morocco")
    france_axis = extract_country(df, "France")

    visualize(years, morocco_axis, france_axis)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        exit(1)
    except Exception as e:
        print("Error occured:", e)
        exit(1)
