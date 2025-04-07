class Geocoding {
  final String? name;
  final String? region;
  final String? country;
  final double latitude;
  final double longitude;

  Geocoding({
    this.name,
    this.region,
    this.country,
    required this.latitude,
    required this.longitude,
  });

  factory Geocoding.fromJson(Map<String, dynamic> json) {
    return Geocoding(
      name: json['name'],
      region: json['admin1'] ?? '',
      country: json['country'] ?? json['timezone'],
      latitude: json['latitude'],
      longitude: json['longitude'],
    );
  }
}
