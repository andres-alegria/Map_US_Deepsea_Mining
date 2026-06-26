# US deep-sea mineral application areas × ISA exploration areas

An interactive Leaflet map showing the distribution of **US commercial deep-sea
mineral application / licence areas** in the central Pacific, overlaid on the
**exploration areas already licensed by the International Seabed Authority (ISA)**.
The two sets can be toggled on and off independently so the reader can see where
the US areas overlap the ISA contract areas.

## Layers

- **US application areas** — coloured by company (American Deep Sea Minerals,
  The Metals Company USA, American Metal Resources, SeaX, Lockheed Martin),
  drawn on top.
- **ISA exploration areas** — a single neutral fill beneath the US areas
  (polymetallic nodules, polymetallic sulphides and cobalt-rich crusts).
- **EEZ boundaries** — 200 nm Exclusive Economic Zone limits and related
  maritime boundaries, bundled locally in `data/eez_pacific.geojson` (clipped to
  the Pacific and simplified from the Marine Regions EEZ v12 boundary lines).
- **Basemap** — Esri / GEBCO ocean shaded relief (subtle), with faint reference labels.

## Run locally

The map loads GeoJSON via `fetch`, which browsers block when you open
`index.html` directly from disk. Serve the folder over HTTP instead:

```
cd us_isa_map
python3 -m http.server 8000
# then open http://localhost:8000
```

An internet connection is needed at runtime only for the basemap tiles. All
vector data — ISA areas, US areas, overlaps and EEZ boundaries — is bundled
locally in `data/`.

## Editing

Almost everything editorial lives in the `CONFIG` object at the top of
`js/app.js`:

- **title / subtitle / footnote** — header and caption text.
- **usColors** — fill colour per company. Keys must match the `company`
  property in `data/us_areas.geojson`; order sets the legend order.
- **isaFill / isaOutline** — the neutral ISA fill drawn beneath the US areas.
- **basemapUrl / basemapOpacity** — swap or fade the relief base.
- **eezWfsUrl** — the EEZ boundary source (Marine Regions WFS).
- **\*VisibleOnLoad** — which layers start switched on.
- **usPopupFields / isaPopupFields** — popup content for each layer.

## Data

- `data/us_areas.geojson` — 30 polygons reconstructed from the coordinate
  vertices in `us_dsm_areas_vertices.csv` (NOAA permit dockets + historic DSHMRA
  licences). Polygons are drawn by connecting the listed vertices and are approximate.
- `data/isa_areas.geojson` — 1,209 ISA exploration-area polygons across 31
  contracts (`Resource` = PMN / PMS / CRFC).

## Sources

NOAA permit dockets; ISA contract area boundaries; Flanders Marine Institute
(VLIZ) Marine Regions — EEZ boundaries; GEBCO / Esri Ocean Basemap.
