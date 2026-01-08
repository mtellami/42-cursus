import 'package:flutter/material.dart';
import 'package:weather_app/constants/colors.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  const TopBar({
    super.key,
    required this.search,
  });
  final Function(String) search;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: AppColors.background,
      elevation: 0,
      title: Container(
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.zero,
        ),
        child: Row(
          children: [
            const Icon(Icons.search, color: Colors.white54),
            const SizedBox(width: 8),
            Expanded(
              child: TextField(
                decoration: InputDecoration(
                  hintText: "Search location...",
                  hintStyle: TextStyle(color: Colors.white54),
                  border: InputBorder.none,
                ),
                style: TextStyle(color: Colors.white),
                onSubmitted: search,
              ),
            ),
            const SizedBox(
              height: 24,
              child: VerticalDivider(
                color: Colors.white70,
                thickness: 2,
                width: 16,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.near_me, color: Colors.white70),
              onPressed: () {
                search("");
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
