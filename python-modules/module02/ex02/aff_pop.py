from load_csv import load
import matplotlib.pyplot as plt


def visualize(x, y):
    plt.plot(x, y)
    plt.xlabel("Year")
    plt.ylabel("Population")
    plt.title("Population Projections")
    plt.show()


def main():
    try:
        df = load("population_total.csv")
    except Exception as e:
        print("Error occured:", e)
        exit(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        exit(1)
