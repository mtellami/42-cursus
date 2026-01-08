import 'package:advanced_weather_app/constants/weather_status.dart';
import 'package:advanced_weather_app/entities/status.dart';
import 'package:flutter/material.dart';

class WeatherStatus extends StatelessWidget {
  final int weatherCode;
  const WeatherStatus({super.key, required this.weatherCode});

  @override
  Widget build(BuildContext context) {
    final status = weatherStatusMap[weatherCode] ??
        Status(
          description: 'Unknown weather condition',
          icon: Icons.help_outline,
        );

    return Column(
      children: [
        Text(
          status.description,
          style: TextStyle(fontSize: 25),
        ),
        Icon(status.icon, size: 100)
      ],
    );
  }
}
