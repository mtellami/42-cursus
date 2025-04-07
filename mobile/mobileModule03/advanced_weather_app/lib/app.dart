import 'package:flutter/material.dart';
import 'package:advanced_weather_app/interceptors/interceptor.dart';
import 'package:advanced_weather_app/screens/currently.screen.dart';
import 'package:advanced_weather_app/screens/today.screen.dart';
import 'package:advanced_weather_app/screens/weekly.screen.dart';
import 'package:advanced_weather_app/widgets/bottom_bar.dart';
import 'package:advanced_weather_app/widgets/top_bar.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  AppState createState() => AppState();
}

class AppState extends State<App> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(() {
      if (!_tabController.indexIsChanging) {
        setState(() => _currentIndex = _tabController.index);
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> screens = [
      CurrentlyScreen(),
      TodayScreen(),
      WeeklyScreen(),
    ];

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/background.jpeg',
              fit: BoxFit.cover,
            ),
          ),
          Scaffold(
            backgroundColor: Colors.transparent,
            body: TabBarView(
              controller: _tabController,
              children: List.generate(
                screens.length,
                (index) => AppInterceptor(
                  child: screens[index],
                ),
              ),
            ),
            appBar: TopBar(),
            bottomNavigationBar: BottomBar(
              onItemSelected: (index) {
                _tabController.animateTo(index);
                setState(() => _currentIndex = index);
              },
              currentIndex: _currentIndex,
            ),
          )
        ],
      ),
    );
  }
}
