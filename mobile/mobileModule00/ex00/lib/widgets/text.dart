import 'package:flutter/material.dart';

class SimpleText extends StatelessWidget {
  const SimpleText({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 3, vertical: 3),
      decoration: BoxDecoration(
        color: Color(0xff626200),
        borderRadius: BorderRadius.circular(8)
      ),
      child: const Text(
        "A simple text",
        style: TextStyle(color: Colors.white, fontSize: 30),
      ),
    );
  }
}
