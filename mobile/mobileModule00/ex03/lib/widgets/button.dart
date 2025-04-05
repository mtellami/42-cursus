import 'package:ex03/constants/buttons.dart';
import 'package:ex03/constants/colors.dart';
import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  const Button({super.key, required this.button, required this.onPressed});

  final ButtonItem button;
  final Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: button.color,
        borderRadius: BorderRadius.zero,
      ),
      child: TextButton(
        onPressed: () => onPressed(button.label),
        style: TextButton.styleFrom(
          padding: EdgeInsets.zero,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
          backgroundColor: AppColors.light,
          foregroundColor: button.color,
        ),
        child: Text(
          button.label,
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
