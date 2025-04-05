import 'package:flutter/material.dart';

class SimpleButton extends StatelessWidget {
  const SimpleButton({
    super.key,
    required this.label,
    required this.onPressed}
  );

  final VoidCallback onPressed;
  final String label;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.brown.shade50,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20)
        )
      ),
      onPressed: onPressed,
      child: Text(
        label,
        style: TextStyle(color: Color(0xff626200)),
      )
    );
  }
}
