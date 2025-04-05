import 'package:flutter/material.dart';

class WeeklyScreen extends StatelessWidget {
  const WeeklyScreen({
    super.key,
    required this.location,
  });
  final String location;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        "Weekly\n$location",
        style: TextStyle(
          fontSize: 40,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
