import 'package:flutter/material.dart';
import 'package:advanced_weather_app/constants/utils.dart';
import 'package:advanced_weather_app/entities/geocoding.dart';
import 'package:advanced_weather_app/entities/weather.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

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
        Expanded(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 20.0),
            child: ListView.builder(
              itemCount: weather.values.length,
              itemBuilder: (context, index) => _buildRow([
                AppUtils.formatDate(weather.values[index].timestamp),
                '${weather.values[index].temperature.$1} ${weather.units.temperature}',
                '${weather.values[index].temperature.$2} ${weather.units.temperature}',
              ]),
            ),
          ),
        )
      ],
    );
  }

  Widget _buildRow(List<String> columns) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List<Text>.generate(
        columns.length,
        (index) => Text(
          columns[index],
          style: TextStyle(fontSize: 22),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
