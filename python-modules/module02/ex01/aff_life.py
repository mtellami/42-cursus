from load_csv import load
import matplotlib.pyplot as plt


def visualize(x, y):
    plt.plot(x, y)
    plt.xlabel("Year")
    plt.ylabel("Life Expectancy")
    plt.title("Morocco Life Expectancy Projections")
    plt.show()


def main():
    try:
        df = load("life_expectancy_years.csv")
        if df.empty:
            raise ValueError("Csv data file is empty")
        morocco_df = df[df["country"] == "Morocco"]
        if morocco_df.empty:
            raise ValueError("No data found for Morocco")

        row = morocco_df.iloc[0]
        data = row.drop("country")

        years = data.index.astype(int)
        values = data.values
        # TODO: Check if years and values are valid for plt to visualize

        visualize(years, values)
    except Exception as e:
        print("Error occured:", e)
        exit(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        exit(1)
