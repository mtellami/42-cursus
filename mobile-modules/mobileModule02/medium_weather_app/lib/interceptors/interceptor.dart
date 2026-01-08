import 'package:flutter/material.dart';
import 'package:medium_weather_app/providers/provider.dart';
import 'package:medium_weather_app/widgets/error_view.dart';
import 'package:provider/provider.dart';
import 'package:medium_weather_app/entities/response.dart';

class AppInterceptor extends StatelessWidget {
  const AppInterceptor({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    switch (Provider.of<AppProvider>(context).error) {
      case ErrorStatus.permissionDenied:
        return const ErrorView(
          message:
              "Geolocation is not available, please enable it in your App settings",
        );
      case ErrorStatus.cityNotFound:
        return ErrorView(
          message:
              "Could not find any result for the supplied address or coordinates.",
        );
      case ErrorStatus.connectionFailed:
        return ErrorView(
          message:
              "The service connection is lost, please check your internet connection or try again later",
        );
      default:
        return child;
    }
  }
}
