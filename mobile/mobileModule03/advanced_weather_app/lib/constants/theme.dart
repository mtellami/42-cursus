import 'package:flutter/material.dart';

class AppTheme {
  static final iconTheme = IconThemeData(color: Colors.white);
  static final themeData = ThemeData(
    primaryColor: Colors.white,
    textTheme: TextTheme(bodyMedium: TextStyle(color: Colors.white)),
    iconTheme: iconTheme,
  );
}
