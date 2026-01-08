import 'package:flutter/material.dart';
import 'package:medium_weather_app/constants/colors.dart';
import 'package:medium_weather_app/widgets/geolocation.dart';
import 'package:medium_weather_app/widgets/search_field.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  const TopBar({super.key});

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
            SearchField(),
            const SizedBox(
              height: 24,
              child: VerticalDivider(
                color: Colors.white70,
                thickness: 2,
                width: 16,
              ),
            ),
            Geolocation(),
          ],
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
