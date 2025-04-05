import 'package:ex00/widgets/text.dart';
import 'package:ex00/widgets/button.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SimpleText(),
              SizedBox(height: 20),
              SimpleButton()
            ],
          ),
        )
      ),
    );
  }
}

