import 'package:flutter/material.dart';

class ScreenHeader extends StatelessWidget {
  final List<String?> texts;
  const ScreenHeader({super.key, required this.texts});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 30, bottom: 10),
      child: Text(
        texts.where((text) => text != null).join('\n'),
        style: TextStyle(
          fontSize: 26,
          fontWeight: FontWeight.w600,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
