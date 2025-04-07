import 'package:flutter/material.dart';
import 'package:advanced_weather_app/app.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppProvider(),
      child: App(),
    ),
  );
}

