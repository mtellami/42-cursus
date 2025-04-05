import 'package:ex03/constants/colors.dart';
import 'package:ex03/widgets/output.dart';
import 'package:flutter/material.dart';

class Screen extends StatelessWidget {
  const Screen({super.key, required this.input, required this.result});

  final String input;
  final String result;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: AppColors.dark,
      ),
      child: Column(
        children: [
          Output(content: input),
          Output(content: result),
          SizedBox(height: 30),
        ],
      ),
    );
  }
}
