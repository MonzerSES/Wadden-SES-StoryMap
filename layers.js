// Wadden SES Portal – project layers for the MapLibre storytelling template.
// index.html calls addWaddenLayers(map) once the basemap has loaded.
// Every layer starts at opacity 0; the chapters in config.js fade them in and out.

var WADDEN_COLORS = {
    units: '#fce4ac', unitsEdge: '#bea064',
    wsr: '#4f86b0', z12: '#3d6f8e', z24: '#6f93aa',
    baptist: '#2f8f83', coast: '#b5651d',
    broad: '#7a5195', def: '#1b4965', narrow: '#c8553d'
};

// Legend entries: [label, swatch style]
var C = WADDEN_COLORS;
function fillSwatch(color, alpha, edge) { return 'background:' + rgba(color, alpha) + (edge ? ';box-shadow:inset 0 0 0 1.5px ' + edge : ''); }
function lineSwatch(color, dash, width) { return 'height:0;border-radius:0;border-top:' + (width || 3) + 'px ' + (dash || 'solid') + ' ' + color; }
function rgba(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }

var LEGEND_ITEMS = {
    wsr: ['WSR by height (−10 m to +5 m)', fillSwatch(C.wsr, .35, C.wsr)],
    unitsDef: ['Default units (NUTS 3 / LAU)', fillSwatch(C.units, .9, C.unitsEdge)],
    munis: ['Municipalities (LAU)', lineSwatch(C.unitsEdge, 'solid', 1)],
    nm12: ['12 nautical miles', lineSwatch(C.z12, 'dashed', 2)],
    nm24: ['24 nautical miles', lineSwatch(C.z24, 'dotted', 2.5)],
    units: ['SES land units', fillSwatch(C.units, .9, C.unitsEdge)],
    sea24: ['Sea: up to 24 NM', fillSwatch(C.z24, .3)],
    sea12: ['Sea: up to 12 NM', fillSwatch(C.z12, .28)],
    baptist: ['Sea: Wadden Sea (Baptist et al. 2019)', fillSwatch(C.baptist, .35, C.baptist)],
    coast: ['10 km from the coastline', fillSwatch(C.coast, .18, C.coast)],
    broad: ['Broad SES', lineSwatch(C.broad, 'dashed')],
    def: ['Default SES', lineSwatch(C.def, 'solid')],
    narrow: ['Narrow SES', lineSwatch(C.narrow, 'solid')]
};

// Which legend each chapter shows (chapter id -> legend keys).
// config.js names these as callbacks: callback: 'legend_<chapter id>'
var CHAPTER_LEGENDS = {
    why: ['wsr'],
    height: ['wsr'],
    units: ['unitsDef', 'munis', 'wsr'],
    sea: ['nm12', 'nm24'],
    broad: ['units', 'sea24', 'broad'],
    'default': ['units', 'sea12', 'def'],
    narrow: ['units', 'baptist', 'coast', 'narrow'],
    compare: ['broad', 'def', 'narrow', 'wsr']
};

function setLegend(keys) {
    var el = document.getElementById('legend');
    if (!el) return;
    el.innerHTML = (keys && keys.length) ? '<b>Legend</b>' + keys.map(function (k) {
        var e = LEGEND_ITEMS[k];
        return '<div class="row"><span class="sw" style="' + e[1] + '"></span><span>' + e[0] + '</span></div>';
    }).join('') : '';
}
Object.keys(CHAPTER_LEGENDS).forEach(function (id) {
    window['legend_' + id] = function () { setLegend(CHAPTER_LEGENDS[id]); };
});
window.legend_none = function () { setLegend([]); };

// Styles for the legend and the chapter panels (kept here so index.html stays as in the template).
(function addStyles() {
    var css = [
        '#legend{position:fixed;right:12px;bottom:34px;z-index:6;background:#fff;color:#333;border-radius:6px;padding:10px 12px;',
        'font:13px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.25);max-width:270px;max-height:45vh;overflow:auto}',
        '#legend:empty{display:none}',
        '#legend .row{display:flex;align-items:center;gap:8px;margin-top:5px}',
        '#legend .sw{flex:0 0 26px;height:13px;border-radius:2px}',
        '.step div{font-size:15px;line-height:1.55}',
        '.step h3{font-size:1.25rem;margin:0 0 .4em}',
        '.step .wad-stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:2px solid #333;border-bottom:1px solid #ddd;margin-top:10px;padding:0}',
        '.step .wad-stats > div{padding:6px 8px 6px 0;line-height:1.2;font-size:12px;color:#666}',
        '.step .wad-stats b{display:block;font-size:19px;color:#222}',
        '.step table{border-collapse:collapse;width:100%;font-size:13px;margin:8px 0}',
        '.step th,.step td{text-align:left;padding:4px 6px 4px 0;border-bottom:1px solid #ddd;vertical-align:top}',
        '.wad-tag{display:inline-block;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:#777}',
        '@media (max-width:750px){#legend{left:10px;right:auto;top:10px;bottom:auto;font-size:11px;max-width:60vw}#inset-map{display:none}}'
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

    // Draw project layers under the basemap's place labels, so city names stay readable.
    var labels = (map.getStyle().layers || []).find(function (l) { return l.type === 'symbol'; });
    var before = labels ? labels.id : undefined;

    function src(id) { map.addSource(id, { type: 'geojson', data: './data/' + id + '.geojson' }); }
    ['wsr_height', 'nm12', 'nm24', 'coast10km', 'baptist_wadden', 'units_broader', 'units_default', 'units_narrow',
        'ses_broader', 'ses_default', 'ses_narrow'].forEach(src);

    function fill(id, source, color) {
        map.addLayer({ id: id, type: 'fill', source: source, paint: { 'fill-color': color, 'fill-opacity': 0 } }, before);
    }
    function line(id, source, color, width, dash) {
        var paint = { 'line-color': color, 'line-width': width, 'line-opacity': 0 };
        if (dash) paint['line-dasharray'] = dash;
        map.addLayer({ id: id, type: 'line', source: source, paint: paint }, before);
    }

    fill('nm24-fill', 'nm24', C.z24);
    fill('nm12-fill', 'nm12', C.z12);
    fill('baptist-fill', 'baptist_wadden', C.baptist);
    fill('wsr-fill', 'wsr_height', C.wsr);
    fill('units-broader-fill', 'units_broader', C.units);
    fill('units-default-fill', 'units_default', C.units);
    fill('units-narrow-fill', 'units_narrow', C.units);
    fill('coast10-fill', 'coast10km', C.coast);
    line('units-narrow-line', 'units_narrow', C.unitsEdge, 0.5);
    line('units-default-line', 'units_default', C.unitsEdge, 1.4);
    line('units-broader-line', 'units_broader', C.unitsEdge, 1);
    line('nm24-line', 'nm24', C.z24, 1.2, [1, 2]);
    line('nm12-line', 'nm12', C.z12, 1.2, [4, 2]);
    line('baptist-line', 'baptist_wadden', C.baptist, 1);
    line('coast10-line', 'coast10km', C.coast, 1, [3, 2]);
    line('wsr-line', 'wsr_height', C.wsr, 1);
    line('ses-broader', 'ses_broader', C.broad, 2.4, [3, 1.5]);
    line('ses-default', 'ses_default', C.def, 2.4);
    line('ses-narrow', 'ses_narrow', C.narrow, 2.4);
}
