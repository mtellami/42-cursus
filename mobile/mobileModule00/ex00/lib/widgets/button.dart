import 'package:flutter/material.dart';

class SimpleButton extends StatefulWidget {
  const SimpleButton({super.key});

  @override
  State<SimpleButton> createState() => _SimpleButtonState();
}

class _SimpleButtonState extends State<SimpleButton> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.brown.shade50,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20)
        )
      ),
      onPressed: () => print("Button pressed"),
      child: const Text(
        "Click me",
        style: TextStyle(color: Color(0xff626200)),
      )
    );
  }
}
