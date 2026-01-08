import 'package:ex02/constants/colors.dart';
import 'package:flutter/material.dart';

class ButtonItem {
  final String label;
  final Color color;

  ButtonItem(this.label, this.color);
}

final List<ButtonItem> buttons = [
  ButtonItem('7', AppColors.dark),
  ButtonItem('8', AppColors.dark),
  ButtonItem('9', AppColors.dark),
  ButtonItem('C', AppColors.red),
  ButtonItem('AC', AppColors.red),
  ButtonItem('4', AppColors.dark),
  ButtonItem('5', AppColors.dark),
  ButtonItem('6', AppColors.dark),
  ButtonItem('+', Colors.white),
  ButtonItem('-', Colors.white),
  ButtonItem('1', AppColors.dark),
  ButtonItem('2', AppColors.dark),
  ButtonItem('3', AppColors.dark),
  ButtonItem('*', Colors.white),
  ButtonItem('/', Colors.white),
  ButtonItem('.', Colors.white),
  ButtonItem('0', AppColors.dark),
  ButtonItem('00', AppColors.dark),
  ButtonItem('=', Colors.white),
  ButtonItem(' ', Colors.transparent),
];
