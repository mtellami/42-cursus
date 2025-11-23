from load_csv import load
import matplotlib.pyplot as plt


def visualize(x: list[float], y: list[float]):
    """
    Visualze the csv file data using matplot
    """
    plt.scatter(x, y, s=100)
    plt.xscale("log")

    plt.title("1900", pad=10, fontsize=15)
    plt.xlabel("Gross domestic product", fontsize=14, labelpad=10)
    plt.ylabel("Life Expectancy", fontsize=14, labelpad=10)

    plt.xticks([300, 1000, 10000], ["300", "1k", "10k"])

    plt.tight_layout()
    plt.show()


def main():
    """
    Does something
    """
    income_df = load("income_per_person_gdppercapita_ppp_inflation_adjusted.csv")
    life_df = load("life_expectancy_years.csv")

    gdp_1900 = income_df["1900"].tolist()
    life_1900 = life_df["1900"].tolist()

    visualize(gdp_1900, life_1900)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        exit(1)
    except Exception as e:
        print("Error occured:", e)
        exit(1)
