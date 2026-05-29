# Repository Guidelines

## Project Structure & Module Organization

This is a Vite-based static frontend for Emmanuel Church. The Vite root is `src/`, with `src/index.html` as the main page. Reusable HTML sections live in `src/partials/` and are injected during development/build. JavaScript entry wiring is in `src/main.js`; feature scripts live in `src/js/` (`slider.js`, `menu.js`, `newsData.js`). Styles are split by section in `src/css/`, with global imports and shared rules in `styles.css` and `common.css`. Static content is under `src/public/`, including `data/news.json` and news images. Fonts and SVG icons are in `src/assets/`.

## Build, Test, and Development Commands

Run all commands from the repository root.

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server with HTML full reload.
- `npm run build`: create a production build in `dist/` with source maps.
- `npm run preview`: serve the built `dist/` output locally for review.

There is currently no configured automated test command.

## Coding Style & Naming Conventions

Use ES modules for JavaScript and keep feature behavior in focused files under `src/js/`. Follow the existing two-space indentation in JS and CSS-like configuration files. Prefer descriptive section-based filenames such as `contacts.css`, `churchVision.css`, and `donationText.html`. Keep CSS modular by section, and place shared utilities only in common/global stylesheets. Use relative imports from `src/main.js` for frontend scripts.

## Content & Asset Guidelines

Keep Ukrainian-facing copy consistent with the current site voice. Store editable news data in `src/public/data/news.json`; keep related media under `src/public/images/news/`. Put reusable icons in `src/assets/icons/sprite.svg` and fonts under `src/assets/fonts/`. Avoid hardcoded external asset URLs when a local project asset is available.
The site uses three language resource files: `en.json`, `sk.json`, and `ua.json` in `src/locales/`. When updating text in one language, translate and update the other two.


## Testing Guidelines

Before opening a pull request, run `npm run build` to catch bundling, import, and HTML injection issues. For visual changes, also run `npm run dev` or `npm run preview` and check desktop and mobile widths. Manually verify interactive features affected by the change, especially the menu, news rendering, and slider behavior.

## Commit & Pull Request Guidelines

Recent history uses short imperative messages and lightweight Conventional Commit prefixes, for example `fix: section structure`, `refactor(news): ...`, and `Update contacts.css`. Prefer `fix:`, `refactor:`, `feat:`, or `chore:` when the scope is clear. Pull requests should include a concise description, list of changed sections, screenshots for visual updates, manual verification notes, and any linked issue or task. Keep unrelated formatting or asset churn out of feature PRs.
