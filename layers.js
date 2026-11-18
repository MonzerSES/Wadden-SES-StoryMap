// Counting Nature – project layers for the MapLibre storytelling template.
// index.html calls addWaddenLayers(map) once the basemap has loaded.
// The four maps are PNG images in Web Mercator, placed by their four corners (data/corners.json).
// Every layer starts at opacity 0; the chapters in config.js switch them on.

var CORNERS = {
    habitat: [[4.275103, 55.664135], [9.90215, 55.664135], [9.90215, 52.685982], [4.275103, 52.685982]],
    quality: [[4.275103, 55.664135], [9.90215, 55.664135], [9.90215, 52.685982], [4.275103, 52.685982]],
    threat: [[4.275103, 55.664135], [9.90215, 55.664135], [9.90215, 52.685982], [4.275103, 52.685982]],
    np: [[4.275103, 55.664127], [9.894963, 55.664127], [9.894963, 52.679003], [4.275103, 52.679003]]
};

var HABITAT_CLASSES = [[1, 'Built-up and settlements', '#d7301f'], [2, 'Arable cropland', '#f6d55c'], [3, 'Managed grassland and pasture', '#a6d96a'],
    [4, 'Semi-natural grassland and heath', '#d9ef8b'], [5, 'Woodland and plantations', '#1a9641'], [6, 'Salt marsh', '#c51b7d'],
    [7, 'Dunes, beaches and sparse vegetation', '#f5deb3'], [8, 'Water', '#3fd0d4'], [9, 'Inland wetland', '#8c6bb1'],
    [11, 'Infralittoral coarse sediment', '#b3a17b'], [12, 'Infralittoral mixed sediment', '#9c8f6e'], [13, 'Infralittoral sand', '#c6dbef'],
    [14, 'Infralittoral mud', '#8c9fae'], [15, 'Infralittoral seabed', '#d9d9d9'], [16, 'Circalittoral coarse sediment', '#7f7356'],
    [17, 'Circalittoral mixed sediment', '#6b6550'], [18, 'Circalittoral sand', '#6baed6'], [19, 'Circalittoral mud', '#57708a'],
    [20, 'Circalittoral seabed', '#a6a6a6'], [21, 'Offshore circalittoral coarse sediment', '#4e4635'], [22, 'Offshore circalittoral mixed sediment', '#3d3a2e'],
    [23, 'Offshore circalittoral sand', '#2171b5'], [24, 'Offshore circalittoral mud', '#253f5c'], [25, 'Offshore circalittoral seabed', '#737373']];

var GREEN = ['#f7fcf5', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#00441b'];
var YELLOW_RED = ['#ffffcc', '#fed976', '#fd8d3c', '#e31a1c', '#800026'];

function rampLegend(title, colors, low, high) {
    return '<b>' + title + '</b><div class="ramp" style="background:linear-gradient(90deg,' + colors.join(',') + ')"></div>' +
        '<div class="ramp-ticks"><span>' + low + '</span><span>' + high + '</span></div>';
}
var LEGENDS = {
    boundary: '<b>Legend</b><div class="row"><span class="sw" style="height:0;border-top:2.5px solid #17252a;border-radius:0"></span>Wadden Sea Region (by height)</div>',
    habitat: '<b>Habitat classes</b><div class="hab">' + HABITAT_CLASSES.map(function (c) {
        return '<div class="row"><span class="sw" style="background:' + c[2] + '"></span>' + c[1] + '</div>';
    }).join('') + '</div>',
    quality: rampLegend('Ecological quality (Q)', GREEN, '0 degraded', '1 intact'),
    threat: rampLegend('Threat weight (TW)', YELLOW_RED, '0.1', '2.4'),
    np: rampLegend('Nature Points per 1 km cell', GREEN, '0', '2.0 or more')
};
function setLegend(key) { var el = document.getElementById('legend'); if (el) el.innerHTML = key ? LEGENDS[key] : ''; }
Object.keys(LEGENDS).forEach(function (k) { window['legend_' + k] = function () { setLegend(k); }; });
window.legend_none = function () { setLegend(null); };

(function addStyles() {
    var css = [
        '#legend{position:fixed;right:12px;bottom:34px;z-index:6;background:#fff;color:#333;border-radius:6px;padding:10px 12px;',
        'font:13px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.25);width:260px;max-height:55vh;overflow:auto}',
        '#legend:empty{display:none}',
        '#legend .row{display:flex;align-items:center;gap:8px;margin-top:4px}',
        '#legend .sw{flex:0 0 22px;height:12px;border-radius:2px}',
        '#legend .hab .row{font-size:11.5px;margin-top:2px}',
        '#legend .ramp{height:12px;margin-top:8px;border-radius:2px}',
        '#legend .ramp-ticks{display:flex;justify-content:space-between;font-size:11.5px;color:#555;margin-top:3px}',
        '.step div{font-size:15px;line-height:1.55}',
        '.wad-tag{display:inline-block;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:#777}',
        '.step .wad-formula{font-weight:700;font-size:17px;border-top:2px solid #333;border-bottom:1px solid #ddd;padding:8px 0;margin:6px 0}',
        '.step .wad-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid #333;border-bottom:1px solid #ddd;margin-top:10px;padding:0}',
        '.step .wad-stats > div{padding:6px 6px 6px 0;line-height:1.2;font-size:12px;color:#666}',
        '.step .wad-stats b{display:block;font-size:18px;color:#222}',
        '.wad-button{display:inline-block;margin-top:10px;padding:8px 14px;border-radius:4px;background:#2e7d4a;color:#fff !important;text-decoration:none;font-weight:600}',
        '@media (max-width:750px){#legend{left:10px;right:auto;top:10px;bottom:auto;font-size:11px;width:auto;max-width:62vw;max-height:35vh}#inset-map{display:none}}'
    ].join('\n');
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

// Keep the map content clear of the story panel: pad every chapter view on the side of the panel.
function padView(map) {
    var fly = map.flyTo.bind(map);
    function adjust(o) {
        var wide = window.innerWidth > 750;
        return Object.assign({}, o, {
            padding: wide ? { left: Math.round(window.innerWidth * 0.40), right: 30, top: 30, bottom: 30 }
                          : { left: 0, right: 0, top: 30, bottom: Math.round(window.innerHeight * 0.40) },
            zoom: (o.zoom || 6) - (wide ? 0 : 1.2)
        });
    }
    // The template moves the map with map.flyTo(chapter.location); only that call is padded.
    map.flyTo = function (o, e) { return fly(adjust(o), e); };
}

function addWaddenLayers(map) {
    padView(map);
    var labels = (map.getStyle().layers || []).find(function (l) { return l.type === 'symbol'; });
    var before = labels ? labels.id : undefined;   // keep place names on top of the maps

    ['habitat', 'quality', 'threat', 'np'].forEach(function (id) {
        map.addSource(id, { type: 'image', url: './data/' + id + '.png', coordinates: CORNERS[id] });
        map.addLayer({ id: id + '-layer', type: 'raster', source: id,
            paint: { 'raster-opacity': 0, 'raster-resampling': 'nearest', 'raster-fade-duration': 0 } }, before);
    });
    map.addSource('wsr', { type: 'geojson', data: './data/wsr_boundary.geojson' });
    map.addLayer({ id: 'wsr-line', type: 'line', source: 'wsr', paint: { 'line-color': '#17252a', 'line-width': 1.4, 'line-opacity': 0 } }, before);
}
