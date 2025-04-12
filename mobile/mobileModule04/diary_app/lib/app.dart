import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Diary app',
      home: const Center(
        child: Text("Diary app"),
      ),
    );
  }
}
