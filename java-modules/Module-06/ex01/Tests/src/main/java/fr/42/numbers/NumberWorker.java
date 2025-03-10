package fr._42.numbers;

public class NumberWorker {

  public boolean isPrime(int number) {
    if (number < 2) {
      throw new IllegalNumberException();
    }
    for (int i = 2; i <= Math.sqrt(number); i++) {
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  }

  public int digitsSum(int number) {
    int sum = 0;
    for (; number > 0; number /= 10) {
      sum += number % 10;
    }
    return sum;
  }
}
