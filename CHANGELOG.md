# Changelog

## v1.1.0 — Two-language mode

- Removed the Chinese + Vietnamese parallel display option.
- Retained Traditional Chinese and Vietnamese as the only language modes.
- Changed the default language to Traditional Chinese.
- Added migration for users whose LocalStorage still contains `both`.
- Updated document language metadata when switching language.
- Confirmed the 12 core modules are present.
- Marked itinerary, LINE URL, room assignments and seat assignments as pending formal data import.

## v1.2.0 - Home Navigation
- Added a dedicated Home route (`#/home`).
- Added a persistent Home button in the top-left corner.
- Added Home to the fixed bottom navigation.
- Default route now opens Home when no hash is present.
- Added hash-change handling and invalid-route fallback to Home.
