import 'package:ex02/constants/colors.dart';
import 'package:flutter/material.dart';

class AppTopbar extends StatelessWidget implements PreferredSizeWidget {
  const AppTopbar({super.key});
  final String title = "Calculator";

  @override
  Widget build(BuildContext context) {
    return AppBar(
        title: Center(
            child: Text(
          title,
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
        )),
        backgroundColor: AppColors.light,
        foregroundColor: Colors.white);
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
