class WeatherUnits {
  final String temperature;
  final String windSpeed;

  WeatherUnits({
    required this.temperature,
    required this.windSpeed,
  });
}

class WeatherValues {
  final DateTime timestamp;
  final int weatherCode;
  final (double, double?) temperature;
  final double windSpeed;

  WeatherValues({
    required this.timestamp,
    required this.weatherCode,
    required this.temperature,
    required this.windSpeed,
  });
}

class CurrentWeather {
  final WeatherValues values;
  final WeatherUnits units;

  CurrentWeather({required this.values, required this.units});

  factory CurrentWeather.fromJson(Map<String, dynamic> json) {
    return CurrentWeather(
      values: WeatherValues(
        timestamp: DateTime.parse(json['current']['time']),
        temperature: (json['current']['temperature_2m'], null),
        windSpeed: json['current']['wind_speed_10m'],
        weatherCode: json['current']['weather_code'],
      ),
      units: WeatherUnits(
        temperature: json['current_units']['temperature_2m'],
        windSpeed: json['current_units']['wind_speed_10m'],
      ),
    );
  }
}

class HourlyWeather {
  final List<WeatherValues> values;
  final WeatherUnits units;

  HourlyWeather({required this.values, required this.units});

  factory HourlyWeather.fromJson(Map<String, dynamic> json) {
    return HourlyWeather(
      values: List<WeatherValues>.from(
        (json['hourly']['time'] as List).map((dateString) {
          int index = (json['hourly']['time'] as List).indexOf(dateString);
          return WeatherValues(
            timestamp: DateTime.parse(dateString),
            temperature: (json['hourly']['temperature_2m'][index], null),
            windSpeed: json['hourly']['wind_speed_10m'][index],
            weatherCode: json['hourly']['weather_code'][index],
          );
        }),
      ),
      units: WeatherUnits(
        temperature: json['hourly_units']['temperature_2m'],
        windSpeed: json['hourly_units']['wind_speed_10m'],
      ),
    );
  }
}

class DailyWeather {
  final List<WeatherValues> values;
  final WeatherUnits units;

  DailyWeather({
    required this.values,
    required this.units,
  });

  factory DailyWeather.fromJson(Map<String, dynamic> json) {
    return DailyWeather(
      values: List<WeatherValues>.from(
        (json['daily']['time'] as List).map((dateString) {
          int index = (json['daily']['time'] as List).indexOf(dateString);
          return WeatherValues(
            timestamp: DateTime.parse(dateString),
            temperature: (
              json['daily']['temperature_2m_min'][index],
              json['daily']['temperature_2m_max'][index],
            ),
            weatherCode: json['daily']['weather_code'][index],
            windSpeed: 0,
          );
        }),
      ),
      units: WeatherUnits(
        temperature: json['daily_units']['temperature_2m_min'],
        windSpeed: 'km/h',
      ),
    );
  }
}
