import 'package:geolocator/geolocator.dart';
import 'package:medium_weather_app/entities/response.dart';

class LocationService {
  static Future<ResponseModel<Position>> getGpsCoodinates() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return ResponseModel(error: ErrorStatus.permissionDenied);
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return ResponseModel(error: ErrorStatus.permissionDenied);
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return ResponseModel(error: ErrorStatus.permissionDenied);
    }
    try {
      Position position = await Geolocator.getCurrentPosition();
      return ResponseModel(data: position);
    } catch (e) {
      return ResponseModel(error: ErrorStatus.connectionFailed);
    }
  }
}
