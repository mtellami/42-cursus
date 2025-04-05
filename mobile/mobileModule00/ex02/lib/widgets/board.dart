import 'package:ex02/constants/buttons.dart';
import 'package:ex02/constants/colors.dart';
import 'package:ex02/widgets/button.dart';
import 'package:flutter/material.dart';

class Board extends StatelessWidget {
  const Board({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        color: AppColors.light,
        child: LayoutBuilder(
          builder: (context, constraints) {
            return GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 5,
                  childAspectRatio:
                      (constraints.maxWidth / 5) / (constraints.maxHeight / 4),
                ),
                itemCount: buttons.length,
                itemBuilder: (context, index) =>
                    Button(button: buttons[index]));
          },
        ));
  }
}
