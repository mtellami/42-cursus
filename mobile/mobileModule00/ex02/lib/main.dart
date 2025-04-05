import 'package:ex02/widgets/board.dart';
import 'package:ex02/widgets/screen.dart';
import 'package:ex02/widgets/topbar.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: const AppTopbar(),
        body: Column(
          children: [
            Expanded(flex: 6, child: Screen()),
            Expanded(flex: 4, child: Board())
          ],
        ),
      ),
    );
  }
}
