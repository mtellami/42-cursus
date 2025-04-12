import 'package:flutter/material.dart';
import 'package:advanced_weather_app/entities/geocoding.dart';
import 'package:advanced_weather_app/providers/provider.dart';
import 'package:provider/provider.dart';

class SearchField extends StatelessWidget {
  const SearchField({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppProvider>(context, listen: false);

    return Expanded(
      child: Autocomplete<Geocoding>(
        optionsBuilder: (TextEditingValue textEditingValue) {
          if (textEditingValue.text.isEmpty) return [];
          return appState.getGeocodings(textEditingValue.text);
        },
        displayStringForOption: (Geocoding option) => option.name as String,
        onSelected: (Geocoding selection) {
          appState.getGeocodingWeather(selection);
        },
        fieldViewBuilder: (context, controller, focusNode, onFieldSubmitted) {
          return TextField(
            controller: controller,
            focusNode: focusNode,
            decoration: InputDecoration(
              prefixIcon: Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Icon(
                  Icons.search,
                  size: 20,
                  color: Colors.white,
                ),
              ),
              hintText: "Search location...",
              hintStyle: TextStyle(color: Colors.white60),
              border: InputBorder.none,
            ),
            style: TextStyle(color: Colors.white),
            onSubmitted: (location) {
              appState.getLocationWeather(location);
            },
          );
        },
        optionsViewBuilder: buildAutocompleteOptions,
      ),
    );
  }

  Widget buildAutocompleteOptions(
    BuildContext context,
    void Function(Geocoding) onSelected,
    Iterable<Geocoding> options,
  ) {
    return Align(
      alignment: Alignment.topLeft,
      child: Material(
        elevation: 2,
        borderRadius: BorderRadius.circular(8),
        child: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            shrinkWrap: true,
            itemCount: options.length,
            separatorBuilder: (context, index) => const Divider(
              height: 1,
              thickness: 0.5,
              color: Colors.grey,
            ),
            itemBuilder: (context, index) {
              return buildAutocompleteItem(
                options.elementAt(index),
                onSelected,
              );
            },
          ),
        ),
      ),
    );
  }

  Widget buildAutocompleteItem(
    Geocoding option,
    void Function(Geocoding) onSelected,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 26),
      child: GestureDetector(
        onTap: () => onSelected(option),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Icon(Icons.location_city, color: Colors.black,),
            const SizedBox(width: 10),
            Text(
              option.name as String,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
                color: Colors.black,
              ),
            ),
            const SizedBox(width: 4),
            Text(
              " ${option.region}, ${option.country}",
              style: const TextStyle(fontSize: 12, color: Colors.black54),
            ),
          ],
        ),
      ),
    );
  }
}
