# How to Add a News Item

News cards are rendered from structured data and localized resource files. Do not hardcode news cards in `src/partials/news.html`.

## 1. Add the News Record

Add a new object to `src/public/data/news.json`:

```json
{
  "id": "5",
  "instagramUrl": "https://www.instagram.com/...",
  "image": "sunday-service",
  "date": "2026-06-01",
  "type": "service"
}
```

- `id` must be unique and must match locale keys.
- `instagramUrl` opens from the card actions.
- `image` is either an existing image key or a direct image path.
- `date` uses `YYYY-MM-DD`.
- `type` maps to `news.types.*` in locale files.

## 2. Add Localized Text

Add matching title and description entries to all three files:

- `src/locales/ua.json`
- `src/locales/en.json`
- `src/locales/sk.json`

Use the same `id`:

```json
"news": {
  "items": {
    "5": {
      "title": "News title",
      "description": "Short news description."
    }
  }
}
```

## 3. Add a New Image Key When Needed

If the news item uses a new local image, place the image in the project assets and add it to `NEWS_IMAGES` in `src/js/newsData.js`:

```js
"women-meeting": new URL(
  "../assets/contacts/women-meeting.jpg",
  import.meta.url
).href,
```

Then use `"image": "women-meeting"` in `news.json`.

## 4. Verify

Run:

```bash
npm run build
```

For visual review, run:

```bash
npm run preview
```

Check the news carousel, language switching, dates, images, and Instagram links.
