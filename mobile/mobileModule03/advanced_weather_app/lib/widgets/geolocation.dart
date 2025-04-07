import 'package:flutter/material.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

class Geolocation extends StatelessWidget {
  const Geolocation({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.near_me, color: Colors.white),
      onPressed: () async {
        await Provider.of<AppProvider>(context, listen: false).getLocation();
      },
    );
  }
}
