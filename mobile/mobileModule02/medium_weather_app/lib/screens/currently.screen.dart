import 'package:flutter/material.dart';
import 'package:medium_weather_app/entities/geocoding.dart';
import 'package:medium_weather_app/entities/weather.dart';
import 'package:medium_weather_app/providers/provider.dart';
import 'package:medium_weather_app/services/weather.service.dart';
import 'package:medium_weather_app/widgets/screen_header.dart';
import 'package:provider/provider.dart';

class CurrentlyScreen extends StatelessWidget {
  const CurrentlyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    AppProvider state = Provider.of<AppProvider>(context);

    Geocoding? location = state.location;
    CurrentWeather? weather = state.currentWeather;

    if (location == null || weather == null) {
      return const Center(child: CircularProgressIndicator());
    }
    return ScreenHeader(
      texts: [
        location.name,
        location.region,
        location.country,
        "${weather.values.temperature.$1} ${weather.units.temperature}",
        WeatherService.getWeatherDescription(
          weather.values.weatherCode,
        ),
        "${weather.values.windSpeed} ${weather.units.windSpeed}"
      ],
    );
  }
}
