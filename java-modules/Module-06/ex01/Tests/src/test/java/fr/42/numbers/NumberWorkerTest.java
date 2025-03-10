package fr._42.numbers;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.ValueSource;

public class NumberWorkerTest {
  private NumberWorker numberWorker;

  @BeforeEach
  public void init() {
    numberWorker = new NumberWorker();
  }

  @ParameterizedTest
  @ValueSource(ints = {2, 3, 5})
  public void isPrimeForPrimes(int number) {
    assertTrue(numberWorker.isPrime(number));
  }

  @ParameterizedTest
  @ValueSource(ints = {4, 6, 9})
  public void isPrimeForNotPrimes(int number) {
    assertFalse(numberWorker.isPrime(number));
  }

  @ParameterizedTest
    @ValueSource(ints = {0, 1, -1})
    public void isPrimeForIncorrectNumbers(int number) {
      assertThrows(IllegalNumberException.class, () -> numberWorker.isPrime(number));
    }

  @ParameterizedTest
  @CsvFileSource(resources = "/data.csv", numLinesToSkip = 1)
    public void testDigitsSum(int number, int expectedSum) {
      assertEquals(expectedSum, numberWorker.digitsSum(number));
  }
}
