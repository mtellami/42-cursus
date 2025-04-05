import 'package:ex02/constants/colors.dart';
import 'package:ex02/widgets/output.dart';
import 'package:flutter/material.dart';

class Screen extends StatelessWidget {
  const Screen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: AppColors.dark,
      ),
      child: Column(
        children: [
          Output(content: "0"),
          Output(content: "0"),
          SizedBox(height: 30),
        ],
      ),
    );
  }
}
