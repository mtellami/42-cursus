import 'package:flutter/material.dart';

class CurrentlyScreen extends StatelessWidget {
  const CurrentlyScreen({
    super.key,
    required this.location,
  });
  final String location;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        "Currently\n$location",
        style: TextStyle(
          fontSize: 40,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
