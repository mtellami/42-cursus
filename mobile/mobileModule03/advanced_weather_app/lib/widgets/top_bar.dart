import 'package:advanced_weather_app/constants/theme.dart';
import 'package:flutter/material.dart';
import 'package:advanced_weather_app/widgets/geolocation.dart';
import 'package:advanced_weather_app/widgets/search_field.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  const TopBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      iconTheme: AppTheme.iconTheme,
      backgroundColor: Colors.transparent,
      elevation: 0,
      title: Row(
        children: [
          SearchField(),
          const SizedBox(
            height: 24,
            child: VerticalDivider(thickness: 2, width: 16),
          ),
          Geolocation(),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
