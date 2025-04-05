import 'package:flutter/material.dart';
import 'package:weather_app/constants/colors.dart';

class BottomBar extends StatelessWidget {
  const BottomBar({
    super.key,
    required this.onItemSelected,
    required this.currentIndex,
  });

  final Function(int) onItemSelected;
  final int currentIndex;

  static const List<Map<String, dynamic>> items = [
    {'icon': Icons.access_time, 'label': 'Currently'},
    {'icon': Icons.calendar_today, 'label': 'Today'},
    {'icon': Icons.date_range, 'label': 'Weekly'},
  ];

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(items.length, (index) {
          return GestureDetector(
            onTap: () => onItemSelected(index),
            child: Column(
              spacing: 6,
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  items[index]['icon'],
                  color: currentIndex == index ? AppColors.active : Colors.grey,
                ),
                Text(
                  items[index]['label'],
                  style: TextStyle(
                    color:
                        currentIndex == index ? AppColors.active : Colors.grey,
                  ),
                ),
              ],
            ),
          );
        }),
      ),
    );
  }
}
