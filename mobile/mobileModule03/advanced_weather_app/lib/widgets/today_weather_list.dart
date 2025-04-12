import 'package:advanced_weather_app/constants/weather_status.dart';
import 'package:advanced_weather_app/entities/weather.dart';
import 'package:advanced_weather_app/widgets/glass_container.dart';
import 'package:flutter/material.dart';

class TodayWeatherList extends StatelessWidget {
  final HourlyWeather weather;

  const TodayWeatherList({
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
    final hour = weather.values[index];
    final time = (
      hour.timestamp.hour.toString().padLeft(2, "0"),
      hour.timestamp.minute.toString().padLeft(2, "0"),
    );
    return Column(
      spacing: 5,
      children: [
        Text(
          '${time.$1}:${time.$2}',
          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
        ),
        Icon(weatherStatusMap[hour.weatherCode]?.icon, size: 40),
        Text(
          '${hour.temperature.$1}${weather.units.temperature}',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: Colors.orangeAccent,
          ),
        ),
        Row(
          children: [
            const Icon(Icons.air, size: 20, color: Colors.black87),
            Text(
              '${hour.windSpeed} ${weather.units.windSpeed}',
              style: TextStyle(
                color: Colors.black87,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        )
      ],
    );
  }
}
