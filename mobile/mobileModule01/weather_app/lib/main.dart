import 'package:flutter/material.dart';
import 'package:weather_app/screens/currently_screen.dart';
import 'package:weather_app/screens/today_screen.dart';
import 'package:weather_app/screens/weekly_screen.dart';
import 'package:weather_app/widgets/bottom_bar.dart';
import 'package:weather_app/widgets/top_bar.dart';

void main() {
  runApp(App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  AppState createState() => AppState();
}

class AppState extends State<App> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _location = "";

  void _setLocation(String location) {
    _location = location;
    setState(() {});
  }

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
            CurrentlyScreen(location: _location),
            TodayScreen(location: _location),
            WeeklyScreen(location: _location),
          ],
        ),
        appBar: TopBar(
          search: _setLocation,
        ),
        bottomNavigationBar: BottomBar(
          onItemSelected: _tabController.animateTo,
          currentIndex: _tabController.index,
        ),
      ),
    );
  }
}
