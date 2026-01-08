class AppUtils {
  static String formatTime(DateTime dateTime) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    return "${twoDigits(dateTime.hour)}:${twoDigits(dateTime.minute)}";
  }

  static String formatDate(DateTime date) {
    return [
      date.year,
      date.month.toString().padLeft(2, '0'),
      date.day.toString().padLeft(2, '0')
    ].join('-');
  }
}
