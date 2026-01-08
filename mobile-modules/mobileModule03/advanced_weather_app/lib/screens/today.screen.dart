import 'package:advanced_weather_app/widgets/glass_container.dart';
import 'package:advanced_weather_app/widgets/temperature_chart.dart';
import 'package:advanced_weather_app/widgets/header.dart';
import 'package:advanced_weather_app/widgets/today_weather_list.dart';
import 'package:flutter/material.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

class TodayScreen extends StatelessWidget {
  const TodayScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppProvider>(context);
    final location = state.location;
    final weather = state.hourlyWeather;

    if (location == null || weather == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      children: [
        ScreenHeader(location: location),
        const SizedBox(height: 60),
        Container(
          margin: EdgeInsets.symmetric(horizontal: 10),
          child: GlassContainer(
            child: TemperatureChart(
              title: "Today temperature",
              timestamps: weather.values.map((e) => e.timestamp).toList(),
              temperatures: weather.values.map((v) => v.temperature).toList(),
              colors: (Colors.orangeAccent, null),
              unit: weather.units.temperature,
            ),
          ),
        ),
        const SizedBox(height: 60),
        SizedBox(
          height: 150,
          child: TodayWeatherList(weather: weather),
        )
      ],
    );
  }
}
