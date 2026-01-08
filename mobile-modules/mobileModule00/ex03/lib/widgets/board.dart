import 'package:ex03/constants/buttons.dart';
import 'package:ex03/constants/colors.dart';
import 'package:ex03/widgets/button.dart';
import 'package:flutter/material.dart';

class Board extends StatelessWidget {
  const Board({super.key, required this.onButtonPress});

  final Function(String) onButtonPress;

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
            itemBuilder: (context, index) => Button(
              button: buttons[index],
              onPressed: onButtonPress,
            ),
          );
        },
      ),
    );
  }
}
