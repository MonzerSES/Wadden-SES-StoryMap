# Counting Nature: Nature Points for the Wadden Sea (MapLibre StoryMap)

Monzer H. Sarker and Frans J. Sijtsma, Faculty of Spatial Sciences, University of Groningen, The Netherlands.
Wadden Sea SES Portal, draft of November 2026.

Scroll-driven story of the Nature Points calculation (NP = Area x Quality x Threat weight) in 8 chapters,
with a separate slider page (`compare.html`) that compares the habitat map and the Nature Points map.

## How it is built
This folder is a copy of the free MapLibre storytelling template by opengeos
(https://github.com/opengeos/maplibre-gl-storymaps, MIT licence; its original README is in TEMPLATE_README.md).
No Mapbox, no API keys. Basemap: CARTO Positron (free; © OpenStreetMap contributors © CARTO).

| File | What it does |
| --- | --- |
| `config.js` | Title, authors, basemap and the chapters (text, map view, which layers are on) |
| `layers.js` | Adds the project layers to the map, the legend per chapter, and keeps the map clear of the text panel |
| `index.html` | The template page. Three small edits: loads `layers.js`, calls `addWaddenLayers(map)` on load, adds a legend box; Scrollama pinned to 3.2.0 |
| `data/` | The project layers |
| `helper.html` | Template tool to find a map view: open it, move the map, copy the `location` into a chapter |

## Run it locally
In this folder run `python -m http.server 8000` and open http://localhost:8000
(double-clicking index.html does not work: the browser then blocks the map data).

## Publish on GitHub Pages
1. Create a public repository and upload all files and folders of this folder (keep `data/`).
2. Settings > Pages > Build and deployment: choose "GitHub Actions" (the template's workflow in `.github/workflows` deploys it),
   or "Deploy from a branch" with branch `main` and folder `/ (root)`.
3. After a minute the story is at https://<user>.github.io/<repository>/

## Change the story
- Text, views and layers per chapter: `config.js` (each chapter has `layers: [[layer id, opacity], ...]`).
- Colours and legends: `layers.js`.
- Small overview map: set `inset: true` in `config.js`.

## Data (`data/`)
habitat.png, quality.png, threat.png (100 m grid) and np.png (Nature Points per 1 km cell): the project rasters reprojected to
Web Mercator (EPSG:3857) and coloured as on the maps; transparent outside the region. They are placed on the map by the four
corners in `layers.js` (also in `corners.json`). wsr_boundary.geojson: the Wadden Sea Region boundary.
Source rasters: the Nature Points project of 17 November 2026 (ETRS89 / UTM zone 32N).

## Slider page
`compare.html` uses the free maplibre-gl-compare plugin (0.5.0): two synchronised maps with a swipe line; readers can zoom and pan.
