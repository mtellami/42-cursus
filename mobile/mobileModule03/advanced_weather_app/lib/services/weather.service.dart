import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:advanced_weather_app/constants/api.dart';
import 'package:advanced_weather_app/entities/geocoding.dart';
import 'package:advanced_weather_app/entities/weather.dart';

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
}
