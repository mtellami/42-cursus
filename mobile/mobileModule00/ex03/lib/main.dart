import 'package:ex03/calculator.dart';
import 'package:ex03/widgets/board.dart';
import 'package:ex03/widgets/screen.dart';
import 'package:ex03/widgets/topbar.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  AppState createState() => AppState();
}

class AppState extends State<App> {
  final Calculator _calculator = Calculator();
  void _onAction(String action) {
    setState(() {
      _calculator.addAction(action);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: const AppTopbar(),
        body: Column(
          children: [
            Expanded(
              flex: 6,
              child: Screen(
                input: _calculator.getInput(),
                result: _calculator.getResult(),
              ),
            ),
            Expanded(flex: 4, child: Board(onButtonPress: _onAction))
          ],
        ),
      ),
    );
  }
}
