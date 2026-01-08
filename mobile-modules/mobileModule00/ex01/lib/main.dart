import 'package:ex01/widgets/button.dart';
import 'package:ex01/widgets/text.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  static const _texts = {
    'A simple text': 'Hello World!',
    'Hello World!': 'A simple text'
  };
  String _text = 'A simple text';

  void toggleText() {
    debugPrint("Button pressed");
    setState(() => _text = _texts[_text]!);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SimpleText(text: _text),
              SizedBox(height: 20),
              SimpleButton(label: "Click me", onPressed: toggleText)
            ],
          ),
        )
      ),
    );
  }
}
