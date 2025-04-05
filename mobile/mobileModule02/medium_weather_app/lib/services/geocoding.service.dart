import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:medium_weather_app/constants/api.dart';
import 'package:medium_weather_app/entities/geocoding.dart';

class GeocodingService {
  static final String baseUrl = AppAPI.geoCoding;

  static Future<List<Geocoding>> getGeocodings(String cityName) async {
    final url = Uri.parse('$baseUrl?name=$cityName');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(response.body);
      if (!data.containsKey('results')) return List.empty();

      List<dynamic> results = data['results'];
      return results.map((g) => Geocoding.fromJson(g)).toList();
    } else {
      return Future.error('Failed to fetch coordinates');
    }
  }
}
