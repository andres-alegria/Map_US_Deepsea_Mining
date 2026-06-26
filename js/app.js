/* ============================================================================
   US DEEP-SEA MINERAL APPLICATION AREAS  ×  ISA EXPLORATION AREAS
   ----------------------------------------------------------------------------
   Almost everything editorial lives in the CONFIG object below. You normally
   won't need to touch the ENGINE section further down.
   ========================================================================== */

const CONFIG = {

  /* ---- TEXT -------------------------------------------------------------- */
  title:    "US deep-sea mineral claims over the international seabed",
  subtitle: "US commercial application and licence areas in the central Pacific, " +
            "shown against the exploration areas already licensed by the " +
            "International Seabed Authority (ISA).",
  footnote: "US areas are reconstructed from coordinate vertices filed in NOAA " +
            "permit dockets and are approximate.<br>" +
            "Sources: NOAA permit dockets; ISA contract area boundaries; " +
            "Flanders Marine Institute (VLIZ) Marine Regions; " +
            "GEBCO / Esri Ocean Basemap.",

  /* ---- COLORS & FONTS ---------------------------------------------------- */
  headerBg:    "#123940",   // Mongabay Blue family dark (ocean)
  headerText:  "#FCFCFC",   // Mongabay White
  titleSize:    "30px",
  subtitleSize: "14px",
  bodySize:     "13px",

  /* ---- US APPLICATION AREAS (coloured by company) ------------------------ */
  // KEY must match the "company" property in data/us_areas.geojson exactly.
  // Order here sets the legend order.
  // Mongabay secondary-palette family colours, one per company — distinct hues,
  // all on-brand. Red is reserved for the US–ISA overlap (threat), so it is not
  // used here. Mid shades chosen for contrast over the neutral ISA fill.
  usColors: {
    "American Deep Sea Minerals": "#E8A643",  // Orange mid
    "The Metals Company USA":     "#C7859B",  // Purple mid
    "American Metal Resources":   "#74ADB3",  // Blue mid
    "SeaX":                       "#C9D04D",  // Green mid
    "Lockheed Martin":            "#F6E779"   // Yellow mid
  },
  usField:        "company",   // property that drives fill colour + legend
  usFillOpacity:  0.55,
  usWeight:       1.2,
  usStroke:       "#222222",

  /* ---- CLARION-CLIPPERTON ZONE (context outline beneath everything) ------ */
  cczFill:        "#092F29",   // Mongabay Pine Green (very light fill)
  cczFillOpacity: 0.06,
  cczOutline:     "#092F29",   // Mongabay Pine Green
  cczWeight:      1.3,
  cczDash:        "6,4",
  cczLabel:       "Clarion-Clipperton Zone",

  /* ---- ISA EXPLORATION AREAS (single neutral fill beneath US) ------------ */
  isaFill:        "#2B5F5A",   // Mongabay Teal Dark
  isaFillOpacity: 0.40,
  isaOutline:     "#092F29",   // Mongabay Pine Green
  isaWeight:      0.4,
  isaLabel:       "ISA exploration areas",

  /* ---- OVERLAP AREAS (US ∩ ISA — drawn above both) ----------------------- */
  ovFill:        "#E86D6D",    // Mongabay Red mid (threat/conflict)
  ovFillOpacity: 0.55,
  ovOutline:     "#530E0D",    // Mongabay Red dark
  ovWeight:      0.6,
  ovLabel:       "US–ISA overlap",

  /* ---- LAYER VISIBILITY ON LOAD ----------------------------------------- */
  cczVisibleOnLoad: true,
  isaVisibleOnLoad: true,
  usVisibleOnLoad:  true,
  eezVisibleOnLoad: true,
  ovVisibleOnLoad:  false,   // overlap-only layer starts off

  /* ---- BASEMAP (subtle GEBCO / ocean shaded relief) ---------------------- */
  // Esri Ocean Basemap = GEBCO-derived bathymetric shaded relief, free, no key.
  basemapUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
  basemapAttribution: "Esri, GEBCO, NOAA, National Geographic, and other contributors",
  basemapMaxZoom: 13,
  // Reference labels (place names + depth figures) layer. Set to null to hide —
  // hidden here so the GEBCO depth numbers don't clutter the map.
  labelsUrl: null,
  // CSS opacity applied to the relief base so it reads as subtle.
  basemapOpacity: 0.65,

  /* ---- EEZ BOUNDARIES (Marine Regions WMS tile layer) -------------------- */
  // Server-rendered WMS tiles: always complete at every zoom (no feature cap,
  // no per-view fetching). The server's default style colours each boundary
  // type differently; we override it with an inline SLD that draws every line
  // in one neutral grey (eezLineColor) so the colour diversity is hidden.
  eezLineColor: "#738B87",        // Mongabay teal-grey for ALL EEZ lines (SLD)
  eezLineWidth: 0.8,
  // The eezPane has a grayscale() filter (to neutralise the server's multicolour
  // default if the SLD is ignored), which renders the line neutral grey. The
  // legend swatch matches that neutral grey rather than the teal-grey source.
  eezColor:   "#828282",          // neutral grey (grayscale of #738B87)
  eezLabel:   "EEZ boundary",
  eezWmsUrl:    "https://geo.vliz.be/geoserver/MarineRegions/wms",
  eezWmsLayer:  "MarineRegions:eez_boundaries",
  eezWmsOpacity: 0.85,

  /* ---- STARTING VIEW & EXTENT -------------------------------------------- */
  // fitToData frames the US areas on load (the editorial focus).
  fitToData: true,
  fitPadding: 50,
  center: [-3, -140],
  zoom: 4,
  // Bound the canvas to the Pacific so it can't pan/zoom out to the whole world.
  // [[southLat, westLon], [northLat, eastLon]]
  maxBounds: [[-45, -185], [40, -95]],
  minZoom: 3,
  maxZoom: 12,

  /* ---- DATA -------------------------------------------------------------- */
  usPath:  "data/us_areas.geojson",
  isaPath: "data/isa_areas.geojson",
  ovPath:  "data/overlaps.geojson",
  cczPath: "data/ccz.geojson",

  // US popup fields (each must be a property in us_areas.geojson).
  // Heading is null — the coloured company label carries the identity instead.
  usPopupHeadingField: null,
  usPopupFields: [
    { field: "docket",        label: "Docket / licence" },
    { field: "area_label",    label: "Reported area" },
    { field: "overlaps_with", label: "Overlaps with" }
  ],
  // Text shown in the coloured label of every US popup.
  usLabelText: "US exploration area",
  // ISA popup fields.
  isaPopupHeadingField: "ContractID",
  isaPopupFields: [
    { field: "Resource", label: "Resource" },
    { field: "AreaType", label: "Area type" },
    { field: "Status",   label: "Status" },
    { field: "ActDate",  label: "Active since" }
  ],
  isaResourceLabels: {
    "PMN":  "Polymetallic nodules",
    "PMS":  "Polymetallic sulphides",
    "CRFC": "Cobalt-rich ferromanganese crusts"
  }
};

/* ============================================================================
   ENGINE — you usually don't need to edit below this line.
   ========================================================================== */

(function applyTheme() {
  const r = document.documentElement.style;
  r.setProperty("--header-bg", CONFIG.headerBg);
  r.setProperty("--header-text", CONFIG.headerText);
  r.setProperty("--title-size", CONFIG.titleSize);
  r.setProperty("--subtitle-size", CONFIG.subtitleSize);
  r.setProperty("--body-size", CONFIG.bodySize);
})();

document.getElementById("title").textContent = CONFIG.title;
document.getElementById("subtitle").textContent = CONFIG.subtitle;
document.getElementById("footnote").innerHTML = CONFIG.footnote;

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ---- MAP & BASEMAP ------------------------------------------------------ */
const map = L.map("map", {
  scrollWheelZoom: true,
  minZoom: CONFIG.minZoom,
  maxZoom: CONFIG.maxZoom,
  maxBounds: CONFIG.maxBounds,
  maxBoundsViscosity: 0.9
}).setView(CONFIG.center, CONFIG.zoom);

const baseLayer = L.tileLayer(CONFIG.basemapUrl, {
  maxZoom: CONFIG.basemapMaxZoom,
  attribution: CONFIG.basemapAttribution,
  opacity: CONFIG.basemapOpacity
}).addTo(map);

if (CONFIG.labelsUrl) {
  L.tileLayer(CONFIG.labelsUrl, {
    maxZoom: CONFIG.basemapMaxZoom,
    opacity: 0.6,
    pane: "shadowPane"   // above tiles, below vectors
  }).addTo(map);
}

/* ---- PANES (stacking: CCZ below, ISA, EEZ, US, overlap on top) ---------- */
map.createPane("cczPane");   map.getPane("cczPane").style.zIndex = 405;
map.createPane("isaPane");   map.getPane("isaPane").style.zIndex = 410;
map.createPane("eezPane");   map.getPane("eezPane").style.zIndex = 420;
map.getPane("eezPane").style.pointerEvents = "none";
// Belt-and-suspenders: desaturate the EEZ tiles in the browser so the lines
// always render greyscale, even if the server ignores the inline SLD override.
map.getPane("eezPane").style.filter = "grayscale(1) contrast(0.85)";
map.createPane("usPane");    map.getPane("usPane").style.zIndex = 430;
map.createPane("ovPane");    map.getPane("ovPane").style.zIndex = 440;

/* ---- CCZ LAYER (Clarion-Clipperton Zone context outline) --------------- */
// Drawn behind every other layer and non-interactive (no popup), so it frames
// the region without affecting the colours or clicks of the data layers.
const cczLayer = L.geoJSON(null, {
  pane: "cczPane",
  interactive: false,
  style: {
    fillColor:   CONFIG.cczFill,
    fillOpacity: CONFIG.cczFillOpacity,
    color:       CONFIG.cczOutline,
    weight:      CONFIG.cczWeight,
    dashArray:   CONFIG.cczDash,
    opacity:     0.9
  }
});

/* ---- ISA LAYER ---------------------------------------------------------- */
const isaLayer = L.geoJSON(null, {
  pane: "isaPane",
  style: {
    fillColor:   CONFIG.isaFill,
    fillOpacity: CONFIG.isaFillOpacity,
    color:       CONFIG.isaOutline,
    weight:      CONFIG.isaWeight,
    opacity:     0.9
  },
  onEachFeature: (f, layer) => {
    const p = f.properties || {};
    let rows = "";
    CONFIG.isaPopupFields.forEach(fld => {
      let val = p[fld.field];
      if (fld.field === "Resource") val = CONFIG.isaResourceLabels[val] || val;
      if (val == null || val === "") return;
      rows += `<tr><td class="k">${esc(fld.label)}</td><td>${esc(val)}</td></tr>`;
    });
    const contractId = esc(p[CONFIG.isaPopupHeadingField] || "");
    const labelHtml = contractId
      ? `<span class="st" style="background:${CONFIG.isaOutline}">${contractId}</span>`
      : "";
    layer.bindPopup(
      `<div class="popup"><h3>ISA exploration area</h3>` +
      labelHtml +
      `<table>${rows}</table></div>`, { maxWidth: 300 });
  }
});

/* ---- US LAYER ----------------------------------------------------------- */
const usColorFor = name => CONFIG.usColors[name] || "#888";

const usLayer = L.geoJSON(null, {
  pane: "usPane",
  style: f => ({
    fillColor:   usColorFor(f.properties[CONFIG.usField]),
    fillOpacity: CONFIG.usFillOpacity,
    color:       CONFIG.usStroke,
    weight:      CONFIG.usWeight,
    opacity:     1
  }),
  onEachFeature: (f, layer) => {
    const p = f.properties || {};
    const company = p[CONFIG.usField];
    const color = usColorFor(company);
    let rows = "";
    CONFIG.usPopupFields.forEach(fld => {
      const val = p[fld.field];
      if (val == null || val === "") return;
      rows += `<tr><td class="k">${esc(fld.label)}</td><td>${esc(val)}</td></tr>`;
    });
    layer.bindPopup(
      `<div class="popup"><h3>${esc(CONFIG.usLabelText)}</h3>` +
      `<span class="st" style="background:${color}">${esc(company)}</span>` +
      `<table>${rows}</table></div>`, { maxWidth: 320 });
  }
});

/* ---- OVERLAP LAYER (US ∩ ISA) ------------------------------------------ */
const ovLayer = L.geoJSON(null, {
  pane: "ovPane",
  style: {
    fillColor:   CONFIG.ovFill,
    fillOpacity: CONFIG.ovFillOpacity,
    color:       CONFIG.ovOutline,
    weight:      CONFIG.ovWeight,
    opacity:     1
  },
  onEachFeature: (f, layer) => {
    const p = f.properties || {};
    let rows = "";
    if (p.company) rows += `<tr><td class="k">US area</td><td>${esc(p.company)}</td></tr>`;
    if (p.overlaps_with) rows += `<tr><td class="k">ISA areas</td><td>${esc(p.overlaps_with)}</td></tr>`;
    layer.bindPopup(
      `<div class="popup"><h3>US–ISA overlap</h3>` +
      `<span class="st" style="background:${CONFIG.ovOutline}">${esc(CONFIG.ovLabel)}</span>` +
      `<table>${rows}</table></div>`, { maxWidth: 300 });
  }
});

/* ---- EEZ LAYER (Marine Regions WMS tiles) ------------------------------ */
// Server-rendered tiles, so all boundaries show at every zoom level — no
// feature cap and no per-view refetching. An inline SLD forces every EEZ line
// to one neutral grey, overriding the server's multi-colour default style.
const eezSld =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<StyledLayerDescriptor version="1.0.0"' +
  ' xmlns="http://www.opengis.net/sld"' +
  ' xmlns:ogc="http://www.opengis.net/ogc"' +
  ' xmlns:xlink="http://www.w3.org/1999/xlink"' +
  ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
  '<NamedLayer><Name>' + CONFIG.eezWmsLayer + '</Name>' +
  '<UserStyle><Name>eez-grey</Name><Title>EEZ grey</Title><FeatureTypeStyle><Rule>' +
  '<LineSymbolizer><Stroke>' +
  '<CssParameter name="stroke">' + CONFIG.eezLineColor + '</CssParameter>' +
  '<CssParameter name="stroke-width">' + CONFIG.eezLineWidth + '</CssParameter>' +
  '</Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer>' +
  '</StyledLayerDescriptor>';

const eezLayer = L.tileLayer.wms(CONFIG.eezWmsUrl, {
  layers:      CONFIG.eezWmsLayer,
  styles:      "",          // must be empty so SLD_BODY takes precedence
  format:      "image/png",
  transparent: true,
  version:     "1.3.0",
  opacity:     CONFIG.eezWmsOpacity,
  pane:        "eezPane",
  SLD_BODY:    eezSld,
  attribution: "EEZ boundaries © Flanders Marine Institute (VLIZ), Marine Regions"
});

/* ---- LOAD DATA ---------------------------------------------------------- */
Promise.all([
  fetch(CONFIG.isaPath).then(r => r.json()),
  fetch(CONFIG.usPath).then(r => r.json()),
  fetch(CONFIG.ovPath).then(r => r.json()).catch(() => null),
  fetch(CONFIG.cczPath).then(r => r.json()).catch(() => null)
]).then(([isaGeo, usGeo, ovGeo, cczGeo]) => {
  if (cczGeo) cczLayer.addData(cczGeo);
  isaLayer.addData(isaGeo);
  usLayer.addData(usGeo);
  if (ovGeo)  ovLayer.addData(ovGeo);

  if (CONFIG.cczVisibleOnLoad && cczGeo) cczLayer.addTo(map);
  if (CONFIG.isaVisibleOnLoad) isaLayer.addTo(map);
  if (CONFIG.usVisibleOnLoad)  usLayer.addTo(map);
  if (CONFIG.ovVisibleOnLoad)  ovLayer.addTo(map);
  if (CONFIG.eezVisibleOnLoad) eezLayer.addTo(map);

  // Frame the US areas (the editorial focus).
  if (CONFIG.fitToData) {
    try {
      map.fitBounds(usLayer.getBounds(), { padding: [CONFIG.fitPadding, CONFIG.fitPadding] });
    } catch (e) { /* keep default view */ }
  }
  buildLegends(usGeo);
}).catch(err => {
  document.getElementById("usLegend").innerHTML =
    '<span style="color:#a33">Could not load map data — serve the folder over ' +
    'http (see README), then reload.</span>';
  console.error(err);
});

/* ---- TOGGLES ------------------------------------------------------------ */
function buildToggles() {
  const el = document.getElementById("toggles");
  // EEZ boundaries are always on (no toggle) — see CONFIG.eezVisibleOnLoad.
  const defs = [
    { id: "tg-us",  label: "US application areas",  on: CONFIG.usVisibleOnLoad,
      onChange: v => v ? usLayer.addTo(map)  : map.removeLayer(usLayer) },
    { id: "tg-isa", label: "ISA exploration areas", on: CONFIG.isaVisibleOnLoad,
      onChange: v => v ? isaLayer.addTo(map) : map.removeLayer(isaLayer) },
    { id: "tg-ov",  label: "Overlapping areas only", on: CONFIG.ovVisibleOnLoad,
      onChange: v => v ? ovLayer.addTo(map)  : map.removeLayer(ovLayer) }
  ];
  el.innerHTML = "";
  defs.forEach(d => {
    const wrap = document.createElement("label");
    wrap.className = "toggle";
    wrap.innerHTML =
      `<input type="checkbox" id="${d.id}" ${d.on ? "checked" : ""}>` +
      `<span class="tlabel">${esc(d.label)}</span>`;
    el.appendChild(wrap);
    wrap.querySelector("input").addEventListener("change", e => d.onChange(e.target.checked));
  });
}
buildToggles();

/* ---- LEGENDS ------------------------------------------------------------ */
function buildLegends(usGeo) {
  // Which companies are actually present
  const present = new Set((usGeo.features || []).map(f => f.properties[CONFIG.usField]));
  const usEl = document.getElementById("usLegend");
  usEl.innerHTML = "";
  Object.keys(CONFIG.usColors).forEach(name => {
    if (!present.has(name)) return;
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML =
      `<span class="swatch" style="background:${CONFIG.usColors[name]};` +
      `opacity:${CONFIG.usFillOpacity + 0.25}"></span>${esc(name)}`;
    usEl.appendChild(item);
  });

  const otherEl = document.getElementById("otherLegend");
  otherEl.innerHTML = "";
  // CCZ outline swatch — inline SVG so it reproduces the layer's exact dashed
  // stroke (cczDash / cczWeight) and faint fill, which a CSS border cannot.
  const ccz = document.createElement("div");
  ccz.className = "legend-item";
  ccz.innerHTML =
    `<span class="swatch" style="padding:0;border:none;background:none">` +
    `<svg width="14" height="14" viewBox="0 0 14 14" style="display:block">` +
    `<rect x="1" y="1" width="12" height="12" ` +
    `fill="${CONFIG.cczFill}" fill-opacity="${CONFIG.cczFillOpacity}" ` +
    `stroke="${CONFIG.cczOutline}" stroke-width="${CONFIG.cczWeight}" ` +
    `stroke-dasharray="${CONFIG.cczDash}"/></svg></span>` +
    `${esc(CONFIG.cczLabel)}`;
  otherEl.appendChild(ccz);
  // ISA swatch
  const isa = document.createElement("div");
  isa.className = "legend-item";
  isa.innerHTML =
    `<span class="swatch" style="background:${CONFIG.isaFill};` +
    `opacity:${CONFIG.isaFillOpacity + 0.3};border-color:${CONFIG.isaOutline}"></span>` +
    `${esc(CONFIG.isaLabel)}`;
  otherEl.appendChild(isa);
  // Overlap swatch
  const ov = document.createElement("div");
  ov.className = "legend-item";
  ov.innerHTML =
    `<span class="swatch" style="background:${CONFIG.ovFill};` +
    `opacity:${CONFIG.ovFillOpacity + 0.25};border-color:${CONFIG.ovOutline}"></span>` +
    `${esc(CONFIG.ovLabel)}`;
  otherEl.appendChild(ov);
  // EEZ line
  const eez = document.createElement("div");
  eez.className = "legend-item";
  eez.innerHTML =
    `<span class="lineswatch" style="border-top:2px solid ${CONFIG.eezColor}"></span>` +
    `${esc(CONFIG.eezLabel)}`;
  otherEl.appendChild(eez);
}
