import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class TemperatureChart extends StatelessWidget {
  final List<DateTime> timestamps;
  final List<(double, double?)> temperatures;
  final (Color, Color?) colors;
  final String unit;
  final String title;

  const TemperatureChart(
      {super.key,
      required this.timestamps,
      required this.temperatures,
      required this.colors,
      required this.unit,
      required this.title});

  @override
  Widget build(BuildContext context) {
    final flat = temperatures
        .expand((pair) => pair.$2 != null ? [pair.$1, pair.$2!] : [pair.$1])
        .toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(title, style: TextStyle(fontSize: 18)),
        Container(
          height: 250,
          padding: const EdgeInsets.all(16.0),
          child: LineChart(
            LineChartData(
              minY:
                  ((flat.reduce((a, b) => a < b ? a : b) ~/ 5) * 5).toDouble(),
              maxY: (((flat.reduce((a, b) => a > b ? a : b) + 4) ~/ 5) * 5)
                  .toDouble(),
              titlesData: FlTitlesData(
                leftTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    interval: 5,
                    reservedSize: 40,
                    getTitlesWidget: (value, meta) {
                      return Text('${value.toStringAsFixed(0)}$unit');
                    },
                  ),
                ),
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    interval: timestamps.length / 7,
                    getTitlesWidget: (value, meta) {
                      return Text(axixString(value.toInt()));
                    },
                  ),
                ),
                rightTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
                topTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
              ),
              borderData: FlBorderData(show: false),
              gridData: FlGridData(
                show: true,
                drawVerticalLine: true,
                getDrawingVerticalLine: (value) => FlLine(
                  color: Colors.white.withAlpha(80),
                  strokeWidth: 0.5,
                ),
                drawHorizontalLine: true,
                getDrawingHorizontalLine: (value) => FlLine(
                  color: Colors.white.withAlpha(80),
                  strokeWidth: 0.5,
                ),
              ),
              lineBarsData: [
                LineChartBarData(
                  isCurved: true,
                  spots: List.generate(temperatures.length, (i) {
                    return FlSpot(i.toDouble(), temperatures[i].$1);
                  }),
                  color: colors.$1,
                  barWidth: 2,
                  dotData: FlDotData(show: false),
                  belowBarData: BarAreaData(show: false),
                ),
                if (temperatures.first.$2 != null)
                  LineChartBarData(
                    isCurved: true,
                    spots: List.generate(temperatures.length, (i) {
                      return FlSpot(i.toDouble(), temperatures[i].$2 ?? 0);
                    }),
                    color: colors.$2,
                    barWidth: 3,
                    dotData: FlDotData(show: false),
                    belowBarData: BarAreaData(
                      show: false,
                      // color: colors.$2?.withAlpha(80),
                    ),
                  )
              ],
            ),
          ),
        ),
      ],
    );
  }

  String to2Digits(int n) => n.toString().padLeft(2, "0");
  String axixString(int i) {
    final lineCount = temperatures[i].$2 == null ? 1 : 2;

    final specs = (
      lineCount == 1 ? timestamps[i].hour : timestamps[i].month,
      lineCount == 1 ? ':' : '/',
      lineCount == 1 ? timestamps[i].minute : timestamps[i].day,
    );
    return '${to2Digits(specs.$1)}${specs.$2}${to2Digits(specs.$3)}';
  }
}
