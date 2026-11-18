// Where does the Wadden Sea end? – Wadden Sea SES Portal
// Story configuration for the MapLibre storytelling template (opengeos/maplibre-gl-storymaps).
// Layers are defined in layers.js; each chapter lists the layers it shows (layers: [[id, opacity], ...]).

// Every project layer from layers.js. Each chapter sets all of them on entry (its own layers on, the rest off),
// so a layer shared by two chapters in a row never blinks out when the previous chapter exits.
var ALL_LAYERS = ['nm24-fill', 'nm12-fill', 'baptist-fill', 'wsr-fill', 'units-broader-fill', 'units-default-fill', 'units-narrow-fill',
    'coast10-fill', 'units-narrow-line', 'units-default-line', 'units-broader-line', 'nm24-line', 'nm12-line', 'baptist-line',
    'coast10-line', 'wsr-line', 'ses-broader', 'ses-default', 'ses-narrow'];
function chapter(o) {
    var on = {}; o.layers.forEach(function (l) { on[l[0]] = l[1]; });
    return {
        id: o.id, alignment: 'left', hidden: false, title: o.title, image: '', description: o.html,
        location: o.location, mapAnimation: 'flyTo', rotateAnimation: false,
        callback: 'legend_' + o.legend,
        onChapterEnter: ALL_LAYERS.map(function (id) { return { layer: id, opacity: on[id] || 0, duration: 800 }; }),
        onChapterExit: []
    };
}
var OVERVIEW = { center: [7.1, 53.95], zoom: 6.2, pitch: 0, bearing: 0 };

var config = {
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    showMarkers: false,
    markerColor: '#1b4965',
    inset: false,   // set to true for a small overview map (top-right); it covers part of the title
    insetStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    insetPosition: 'top-right',
    insetZoom: 3,
    insetOptions: { markerColor: '#c8553d' },
    theme: 'light',
    use3dTerrain: false,
    auto: false,
    title: 'Where does the Wadden Sea end?',
    subtitle: 'Three ways to draw the boundary of the Wadden Sea as a social-ecological system',
    byline: 'Monzer H. Sarker and Frans J. Sijtsma\nFaculty of Spatial Sciences, University of Groningen, The Netherlands\nWadden Sea SES Portal · November 2026 · Draft',
    footer: 'Sources: administrative units from GISCO / Eurostat (LAU 2024, NUTS) and Statistics Netherlands (CBS); coastal municipalities after the ' +
        '<a href="https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Territorial_typologies_manual_-_coastal_areas" target="_blank">Eurostat coastal typology</a>; ' +
        'maritime zones from Marine Regions; Wadden Sea area from Baptist et al. (2019), Mendeley Data; WSR by height from the project data. Areas measured in ETRS89 / UTM zone 32N.<br>' +
        'Basemap © OpenStreetMap contributors © CARTO. Built with the <a href="https://github.com/opengeos/maplibre-gl-storymaps" target="_blank">MapLibre storytelling template</a>.',
    chapters: [
        chapter({
            id: 'why', legend: 'why', location: OVERVIEW,
            layers: [['wsr-fill', 0.3], ['wsr-line', 0.8]],
            title: 'A sea shaped by people',
            html: '<span class="wad-tag">1 · The question</span><br>' +
                'The Wadden Sea is more than tidal flats and salt marshes. Farmers, fishers, ports, tourism and nature management on the islands and the mainland all depend on it and change it. Together they form a social-ecological system (SES): nature and people that shape each other.<br><br>' +
                'To study that system, we need a line on the map. Nature does not stop at a municipal border, but statistics on people, jobs and land use are collected for administrative areas. The SES portal therefore uses three definitions, from broad to narrow, each built from official administrative units.'
        }),
        chapter({
            id: 'height', legend: 'height', location: { center: [7.2, 53.95], zoom: 6.5, pitch: 0, bearing: 0 },
            layers: [['wsr-fill', 0.4], ['wsr-line', 1]],
            title: 'The ecological core',
            html: '<span class="wad-tag">2 · The reference</span><br>' +
                'Our starting point is the Wadden Sea Region defined by height: all land and sea between 10 metres below and 5 metres above sea level along the coast. It covers <b>36,753 km²</b>, with the tidal flats, the islands, the salt marshes, the low-lying coastal polders and the shallow sea in front of the islands.<br><br>' +
                'This line follows the landscape, not administration. It is the reference that the three SES definitions are compared with.'
        }),
        chapter({
            id: 'units', legend: 'units', location: { center: [6.4, 53.25], zoom: 7.8, pitch: 0, bearing: 0 },
            layers: [['units-default-fill', 0.55], ['units-default-line', 1], ['units-narrow-line', 0.8], ['wsr-line', 0.6]],
            title: 'Administrative units on land',
            html: '<span class="wad-tag">3 · Building blocks</span><br>' +
                'To link the boundary to statistics, the land part is built from the units of the European statistical system (Eurostat). Each country uses its own names:' +
                '<table><tr><th>Level</th><th>Netherlands</th><th>Germany</th><th>Denmark</th></tr>' +
                '<tr><td>LAU</td><td>Municipalities (Gemeenten)</td><td>Municipalities (Gemeinden)</td><td>Municipalities (Kommuner)</td></tr>' +
                '<tr><td>NUTS 3</td><td>COROP regions</td><td>Kreise</td><td>Landsdele</td></tr>' +
                '<tr><td>NUTS 2</td><td>Provinces</td><td>Regierungsbezirke</td><td>Regioner</td></tr></table>' +
                'The map shows the larger units of the default definition (thick lines) and the municipalities inside them (thin lines). In all three definitions, Denmark is represented by the same four municipalities: Tønder, Esbjerg, Fanø and Varde.'
        }),
        chapter({
            id: 'sea', legend: 'sea', location: { center: [7.0, 54.1], zoom: 6.3, pitch: 0, bearing: 0 },
            layers: [['nm24-fill', 0.18], ['nm12-fill', 0.2], ['nm24-line', 1], ['nm12-line', 1]],
            title: 'Maritime zones at sea',
            html: '<span class="wad-tag">4 · Building blocks</span><br>' +
                'At sea there are no municipalities, so the definitions use maritime zones from Marine Regions instead: the territorial sea up to <b>12 nautical miles</b> (22 km) from the coast, and the contiguous zone up to <b>24 nautical miles</b> (44 km).<br><br>' +
                'The narrow definition uses a third, ecological line at sea: the Wadden Sea itself, which comes later in the story.'
        }),
        chapter({
            id: 'broad', legend: 'broad', location: { center: [7.1, 53.85], zoom: 6.1, pitch: 0, bearing: 0 },
            layers: [['units-broader-fill', 0.85], ['units-broader-line', 1], ['nm24-fill', 0.3], ['nm12-fill', 0.15], ['ses-broader', 1]],
            title: 'Broad: the regional scale',
            html: '<span class="wad-tag" style="color:#7a5195">Definition 1 of 3</span><br>' +
                '<b>Land:</b> 4 Dutch provinces (Groningen, Fryslân, Noord-Holland, Flevoland), 18 German Kreise and 4 Danish municipalities. <b>Sea:</b> up to 24 nautical miles.<br><br>' +
                'The broad definition takes in the regional economies around the Wadden Sea, including Groningen, Bremen, Hamburg and, through the province of Noord-Holland, Amsterdam.' +
                '<div class="wad-stats"><div><b>65,304</b>km² in total</div><div><b>29,010</b>km² land</div><div><b>36,294</b>km² sea</div></div>'
        }),
        chapter({
            id: 'default', legend: 'default', location: { center: [7.1, 53.95], zoom: 6.3, pitch: 0, bearing: 0 },
            layers: [['units-default-fill', 0.85], ['units-default-line', 1], ['nm12-fill', 0.28], ['ses-default', 1]],
            title: 'Default: one statistical level',
            html: '<span class="wad-tag" style="color:#1b4965">Definition 2 of 3</span><br>' +
                '<b>Land:</b> 6 Dutch COROP regions (Kop van Noord-Holland, Noord-Friesland, Zuidwest-Friesland, Oost-Groningen, Delfzijl en omgeving, Overig Groningen), the same 18 German Kreise and 4 Danish municipalities. <b>Sea:</b> up to 12 nautical miles.<br><br>' +
                'COROP regions and Kreise are both NUTS 3 regions, so the Dutch and German parts are built at the same statistical level.' +
                '<div class="wad-stats"><div><b>47,667</b>km² in total</div><div><b>24,875</b>km² land</div><div><b>22,792</b>km² sea</div></div>'
        }),
        chapter({
            id: 'narrow', legend: 'narrow', location: { center: [7.4, 54.05], zoom: 6.6, pitch: 0, bearing: 0 },
            layers: [['units-narrow-fill', 0.85], ['units-narrow-line', 0.9], ['baptist-fill', 0.35], ['baptist-line', 0.9], ['coast10-fill', 0.18], ['coast10-line', 0.8], ['ses-narrow', 1]],
            title: 'Narrow: the coastal communities',
            html: '<span class="wad-tag" style="color:#c8553d">Definition 3 of 3</span><br>' +
                '<b>Land:</b> only coastal municipalities, following the Eurostat coastal typology: a municipality is coastal if it borders the coastline or has at least half of its area within 10 km of it. That gives 15 Dutch, 310 German and 4 Danish municipalities; German municipalities are much smaller than Dutch ones. <b>Sea:</b> the Wadden Sea itself, as mapped by Baptist et al. (2019).<br><br>' +
                'The narrow definition covers the communities in direct contact with the Wadden Sea.' +
                '<div class="wad-stats"><div><b>23,614</b>km² in total</div><div><b>15,712</b>km² land</div><div><b>7,902</b>km² sea</div></div>'
        }),
        chapter({
            id: 'compare', legend: 'compare', location: { center: [7.1, 53.85], zoom: 6.1, pitch: 0, bearing: 0 },
            layers: [['ses-broader', 1], ['ses-default', 1], ['ses-narrow', 1], ['wsr-fill', 0.15]],
            title: 'From broad to narrow',
            html: '<span class="wad-tag">5 · Side by side</span><br>' +
                'From broad to narrow, the SES shrinks from 65,304 to 23,614 km². Most of the difference lies at sea, from 24 nautical miles to the Wadden Sea itself, and in the Dutch hinterland, from provinces to coastal municipalities.' +
                '<table><tr><th>Definition</th><th>Land units (NL / DE / DK)</th><th>Sea</th><th>km²</th></tr>' +
                '<tr><td style="color:#7a5195"><b>Broad</b></td><td>Provinces / Kreise / Municipalities</td><td>24 NM</td><td>65,304</td></tr>' +
                '<tr><td style="color:#1b4965"><b>Default</b></td><td>COROP regions / Kreise / Municipalities</td><td>12 NM</td><td>47,667</td></tr>' +
                '<tr><td style="color:#c8553d"><b>Narrow</b></td><td>Coastal municipalities in all three</td><td>Wadden Sea</td><td>23,614</td></tr></table>' +
                'Which line to use depends on the question: the broad one for the regional economy and governance, the default one for most comparisons, the narrow one for communities that live directly on the Wadden Sea.'
        })
    ]
};
