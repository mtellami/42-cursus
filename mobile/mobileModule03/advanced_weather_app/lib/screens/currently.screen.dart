import 'package:advanced_weather_app/widgets/header.dart';
import 'package:advanced_weather_app/widgets/weather_status.dart';
import 'package:flutter/material.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

class CurrentlyScreen extends StatelessWidget {
  const CurrentlyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppProvider>(context);
    final location = state.location;
    final weather = state.currentWeather;

    if (location == null || weather == null) {
      return const Center(child: CircularProgressIndicator());
    }
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ScreenHeader(location: location),
        const SizedBox(height: 60),
        Text(
          "${weather.values.temperature.$1}${weather.units.temperature}",
          style: TextStyle(
            fontSize: 50,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 40),
        WeatherStatus(weatherCode: weather.values.weatherCode),
        const SizedBox(height: 40),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.air, size: 40, color: Colors.white70),
            const SizedBox(width: 5),
            Text(
              "${weather.values.windSpeed} ${weather.units.windSpeed}",
              style: TextStyle(fontSize: 30, color: Colors.white),
            )
          ],
        )
      ],
    );
  }
}
