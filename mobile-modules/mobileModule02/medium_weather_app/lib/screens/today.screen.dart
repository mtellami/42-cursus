import 'package:flutter/material.dart';
import 'package:medium_weather_app/constants/utils.dart';
import 'package:medium_weather_app/entities/geocoding.dart';
import 'package:medium_weather_app/entities/weather.dart';
import 'package:medium_weather_app/providers/provider.dart';
import 'package:medium_weather_app/widgets/screen_header.dart';
import 'package:provider/provider.dart';

class TodayScreen extends StatelessWidget {
  const TodayScreen({super.key});

  @override
  Widget build(BuildContext context) {
    AppProvider state = Provider.of<AppProvider>(context);

    Geocoding? location = state.location;
    HourlyWeather? weather = state.hourlyWeather;
    if (location == null || weather == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      children: [
        ScreenHeader(
          texts: [location.name, location.region, location.country],
        ),
        Expanded(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 30.0),
            child: ListView.builder(
              itemCount: weather.values.length,
              itemBuilder: (context, index) => _buildRow([
                AppUtils.formatTime(weather.values[index].timestamp),
                [
                  weather.values[index].temperature.$1.toStringAsFixed(1),
                  weather.units.temperature,
                ].join(' '),
                [
                  weather.values[index].windSpeed,
                  weather.units.windSpeed,
                ].join(' ')
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
          style: TextStyle(fontSize: 26),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
