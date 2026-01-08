import 'package:flutter/material.dart';
import 'package:medium_weather_app/interceptors/interceptor.dart';
import 'package:medium_weather_app/screens/currently.screen.dart';
import 'package:medium_weather_app/screens/today.screen.dart';
import 'package:medium_weather_app/screens/weekly.screen.dart';
import 'package:medium_weather_app/widgets/bottom_bar.dart';
import 'package:medium_weather_app/widgets/top_bar.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  AppState createState() => AppState();
}

class AppState extends State<App> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(() {
      if (_tabController.indexIsChanging) setState(() {});
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: TabBarView(
          controller: _tabController,
          children: [
            CurrentlyScreen(),
            TodayScreen(),
            WeeklyScreen(),
          ].map((screen) => AppInterceptor(child: screen)).toList(),
        ),
        appBar: TopBar(),
        bottomNavigationBar: BottomBar(
          onItemSelected: _tabController.animateTo,
          currentIndex: _tabController.index,
        ),
      ),
    );
  }
}
