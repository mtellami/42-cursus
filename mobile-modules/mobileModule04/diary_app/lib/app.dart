import 'package:diary_app/screens/login.dart';
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Diary app',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: const Login(),
      ),
    );
  }
}
