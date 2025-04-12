import 'package:advanced_weather_app/widgets/weekly_weather_list.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:advanced_weather_app/entities/geocoding.dart';
import 'package:advanced_weather_app/entities/weather.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:advanced_weather_app/widgets/glass_container.dart';
import 'package:advanced_weather_app/widgets/header.dart';
import 'package:advanced_weather_app/widgets/temperature_chart.dart';

class WeeklyScreen extends StatelessWidget {
  const WeeklyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    AppProvider state = Provider.of<AppProvider>(context);

    Geocoding? location = state.location;
    DailyWeather? weather = state.dailyWeather;
    if (location == null || weather == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      children: [
        ScreenHeader(location: location),
        const SizedBox(height: 60),
        Container(
          margin: EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            children: [
              GlassContainer(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TemperatureChart(
                      title: 'Weekly temperatures',
                      timestamps:
                          weather.values.map((e) => e.timestamp).toList(),
                      temperatures:
                          weather.values.map((e) => e.temperature).toList(),
                      colors: (Colors.blueAccent, Colors.orangeAccent),
                      unit: weather.units.temperature,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _legendItem(Colors.blueAccent, 'Min temperature'),
                        const SizedBox(width: 16),
                        _legendItem(Colors.orangeAccent, 'Max temperature'),
                      ],
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 60),
        SizedBox(
          height: 150,
          child: WeeklyWeatherList(weather: weather),
        )
      ],
    );
  }

  Widget _legendItem(Color color, String text) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 6),
        Text(text),
      ],
    );
  }
}
