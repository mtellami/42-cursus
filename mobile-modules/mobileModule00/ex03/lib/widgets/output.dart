import 'package:ex03/constants/colors.dart';
import 'package:flutter/material.dart';

class Output extends StatelessWidget {
  const Output({super.key, required this.content});
  final String content;

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(border: InputBorder.none),
      readOnly: true,
      style: TextStyle(fontSize: 30, color: AppColors.light),
      controller: TextEditingController(text: content),
      textAlign: TextAlign.right,
    );
  }
}
