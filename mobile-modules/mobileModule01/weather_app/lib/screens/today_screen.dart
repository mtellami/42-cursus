import 'package:flutter/material.dart';

class TodayScreen extends StatelessWidget {
  const TodayScreen({
    super.key,
    required this.location,
  });
  final String location;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        "Today\n$location",
        style: TextStyle(
          fontSize: 40,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center
      ),
    );
  }
}
