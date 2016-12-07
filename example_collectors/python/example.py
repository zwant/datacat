from boardling_collector import BoardlingCollector, Metric
import random

def collect():
    return [Metric(name="python-collector-{}".format(i),
                  value=random.uniform(0, 100)) for i in range(1,3)]

def main():
    BoardlingCollector("example").run(collect)


if __name__ == "__main__":
    main()
