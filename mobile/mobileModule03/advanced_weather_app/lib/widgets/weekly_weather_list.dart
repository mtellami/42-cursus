import 'package:advanced_weather_app/constants/weather_status.dart';
import 'package:advanced_weather_app/entities/weather.dart';
import 'package:advanced_weather_app/widgets/glass_container.dart';
import 'package:flutter/material.dart';

class WeeklyWeatherList extends StatelessWidget {
  final DailyWeather weather;

  const WeeklyWeatherList({
    super.key,
    required this.weather,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: weather.values.length,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 3),
          child: GlassContainer(child: weatherCard(index)),
        );
      },
    );
  }

  Widget weatherCard(int index) {
    final day = weather.values[index];
    final time = (
      day.timestamp.day.toString().padLeft(2, "0"),
      day.timestamp.month.toString().padLeft(2, "0"),
    );

    return Column(
      spacing: 5,
      children: [
        Text(
          '${time.$1}/${time.$2}',
          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
        ),
        Icon(weatherStatusMap[day.weatherCode]?.icon, size: 40),
        Text(
          '${day.temperature.$1}${weather.units.temperature} min',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: Colors.blueAccent,
          ),
        ),
        Text(
          '${day.temperature.$2}${weather.units.temperature} max',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: Colors.orangeAccent,
          ),
        ),
      ],
    );
  }
}
