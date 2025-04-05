import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:medium_weather_app/entities/geocoding.dart';
import 'package:medium_weather_app/entities/response.dart';
import 'package:medium_weather_app/entities/weather.dart';
import 'package:medium_weather_app/services/geocoding.service.dart';
import 'package:medium_weather_app/services/location.service.dart';
import 'package:medium_weather_app/services/weather.service.dart';

class AppProvider with ChangeNotifier {
  AppProvider() {
    getLocation();
  }

  ErrorStatus? error;

  Geocoding? location;
  CurrentWeather? currentWeather;
  HourlyWeather? hourlyWeather;
  DailyWeather? dailyWeather;

  /*
  * Get the current location weather.
  */
  Future<void> getLocation() async {
    ResponseModel<Position> res = await LocationService.getGpsCoodinates();
    if (res.data == null) {
      error = res.error;
      notifyListeners();
      return;
    }

    getGeocodingWeather(Geocoding(
      latitude: res.data!.latitude,
      longitude: res.data!.longitude,
    ));
  }

  void resetState() {
    location = currentWeather = hourlyWeather = dailyWeather = error = null;
    notifyListeners();
  }

  Future<void> getLocationWeather(String location) async {
    resetState();
    try {
      List<Geocoding> geocodings =
          await GeocodingService.getGeocodings(location);
      getGeocodingWeather(
        geocodings.isNotEmpty ? geocodings.first : null,
      );
    } catch (e) {
      error = ErrorStatus.connectionFailed;
    } finally {
      notifyListeners();
    }
  }

  Future<void> getGeocodingWeather(Geocoding? geocoding) async {
    resetState();
    if (geocoding == null) {
      error = ErrorStatus.cityNotFound;
      return;
    }
    location = geocoding;

    try {
      currentWeather = await WeatherService.getCurrentWeather(geocoding);
      hourlyWeather = await WeatherService.getTodayWeather(geocoding);
      dailyWeather = await WeatherService.getWeeklyWeather(geocoding);
    } catch (e) {
      error = ErrorStatus.connectionFailed;
    } finally {
      notifyListeners();
    }
  }

  Future<List<Geocoding>> getGeocodings(String cityName) async {
    try {
      List<Geocoding> geocodings =
          await GeocodingService.getGeocodings(cityName);
      return geocodings;
    } catch (e) {
      error = ErrorStatus.connectionFailed;
      return List.empty();
    } finally {
      notifyListeners();
    }
  }
}
