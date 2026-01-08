import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:medium_weather_app/constants/api.dart';
import 'package:medium_weather_app/entities/geocoding.dart';
import 'package:medium_weather_app/entities/weather.dart';

class WeatherService {
  static final String _baseUrl = AppAPI.openMeteo;

  static Future<CurrentWeather> getCurrentWeather(Geocoding geocoding) async {
    return _getWeather(
      geocoding: geocoding,
      range: 'current',
      properties: ['temperature_2m', 'wind_speed_10m', 'weather_code'],
      fromJson: CurrentWeather.fromJson,
    );
  }

  static Future<HourlyWeather> getTodayWeather(Geocoding geocoding) async {
    return _getWeather(
      geocoding: geocoding,
      range: 'hourly',
      properties: ['temperature_2m', 'wind_speed_10m', 'weather_code'],
      fromJson: HourlyWeather.fromJson,
    );
  }

  static Future<DailyWeather> getWeeklyWeather(Geocoding geocoding) async {
    return _getWeather(
      geocoding: geocoding,
      range: 'daily',
      properties: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
      fromJson: DailyWeather.fromJson,
    );
  }

  static Future<T> _getWeather<T>(
      {required Geocoding geocoding,
      required String range,
      required List<String> properties,
      required T Function(Map<String, dynamic>) fromJson}) async {
    final url = Uri.parse([
      _baseUrl,
      '?latitude=${geocoding.latitude}',
      '&longitude=${geocoding.longitude}',
      '&$range=${properties.join(",")}',
    ].join());

    final response = await http.get(url);
    if (response.statusCode == 200) {
      return fromJson(json.decode(response.body));
    } else {
      return Future.error('Failed to load weather data');
    }
  }

  // TODO: update this function according to the api doc.
  static String getWeatherDescription(int code) {
    if (code >= 0 && code <= 4) return 'Sunny';
    if (code >= 5 && code <= 9) return 'cloudy';
    if (code >= 10 && code <= 12) return 'Foggy';
    if (code >= 14 && code <= 16) return 'Drizzle';
    if (code >= 17 && code <= 19) return 'Thunderstorm';
    if (code >= 20 && code <= 29) return 'Rainy';
    if (code >= 30 && code <= 39) return 'Snowy';
    if (code >= 36 && code <= 39) return 'Snowing';
    if (code >= 40 && code <= 49) return 'Icy';
    if (code >= 50 && code <= 59) return 'Drizzle';
    if (code >= 60 && code <= 69) return 'Heavy Rain';
    if (code >= 70 && code <= 79) return 'Snowstorm';
    if (code >= 80 && code <= 99) return 'Showers';
    return 'Unknown';
  }
}
