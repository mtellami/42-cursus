import 'package:advanced_weather_app/constants/colors.dart';
import 'package:advanced_weather_app/entities/geocoding.dart';
import 'package:flutter/material.dart';

class ScreenHeader extends StatelessWidget {
  final Geocoding location;
  const ScreenHeader({super.key, required this.location});

  @override
  Widget build(BuildContext context) {
    if (location.name == null) {
      return const SizedBox();
    }
    return Padding(
      padding: const EdgeInsets.only(top: 80),
      child: Column(
        children: [
          Text(
            "${location.name}",
            style: const TextStyle(
              fontSize: 25,
              fontWeight: FontWeight.w900,
              color: AppColors.header,
            ),
          ),
          Text(
            "${location.region}, ${location.country}",
            style: const TextStyle(
              fontSize: 25,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
