// Counting Nature: Nature Points for the Wadden Sea – Wadden Sea SES Portal
// Story configuration for the MapLibre storytelling template (opengeos/maplibre-gl-storymaps).
// Layers and legends are defined in layers.js; each chapter lists the layers it shows (layers: [[id, opacity], ...]).

// Each chapter sets every layer on entry (its own on, the rest off), so shared layers never blink out between chapters.
var ALL_LAYERS = ['habitat-layer', 'quality-layer', 'threat-layer', 'np-layer', 'wsr-line'];
function chapter(o) {
    var on = {}; o.layers.forEach(function (l) { on[l[0]] = l[1]; });
    return {
        id: o.id, alignment: 'left', hidden: false, title: o.title, image: '', description: o.html,
        location: o.location, mapAnimation: 'flyTo', rotateAnimation: false,
        callback: 'legend_' + o.legend,
        onChapterEnter: ALL_LAYERS.map(function (id) { return { layer: id, opacity: on[id] || 0, duration: 900 }; }),
        onChapterExit: []
    };
}
var OVERVIEW = { center: [7.1, 54.0], zoom: 6.4, pitch: 0, bearing: 0 };

var config = {
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    showMarkers: false,
    markerColor: '#2e7d4a',
    inset: false,   // set to true for a small overview map (top-right); it covers part of the title
    insetStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    insetPosition: 'top-right',
    insetZoom: 3,
    insetOptions: { markerColor: '#2e7d4a' },
    theme: 'light',
    use3dTerrain: false,
    auto: false,
    title: 'Counting Nature',
    subtitle: 'How habitats, ecological quality and threatened species add up to one number for the Wadden Sea',
    byline: 'Monzer H. Sarker and Frans J. Sijtsma\nFaculty of Spatial Sciences, University of Groningen, The Netherlands\nWadden Sea SES Portal · November 2026 · Draft',
    footer: 'Method: Sijtsma et al. (2009) and Van Gaalen et al. (2014), PBL Netherlands Environmental Assessment Agency; Bos &amp; Ruijs (2021), Journal of Benefit-Cost Analysis.<br>' +
        'Data: GLOBIO land use 2015 and mean species abundance; EUSeaMap 2023 (EMODnet); EU Water Framework Directive ecological status (EEA WISE); OSPAR Quality Status Report 2023; IUCN Red List of Threatened Species (2026). ' +
        'Nature Points calculation of 17 November 2026; 100 m grid in ETRS89 / UTM zone 32N.<br>' +
        'Basemap © OpenStreetMap contributors © CARTO. Built with the <a href="https://github.com/opengeos/maplibre-gl-storymaps" target="_blank">MapLibre storytelling template</a>.',
    chapters: [
        chapter({
            id: 'why', legend: 'np', location: OVERVIEW, layers: [['np-layer', 0.55], ['wsr-line', 0.8]],
            title: 'Why count nature?',
            html: '<span class="wad-tag">Introduction</span><br>' +
                'The Wadden Sea is the largest unbroken system of intertidal sand and mud flats in the world, and a UNESCO World Heritage Site since 2009. It is also a place where people live and work, from farming and shipping to tourism and energy. In decisions about this space, nature is easily left out because it is hard to measure.<br><br>' +
                '<b>Nature Points</b> combine how much habitat there is, how intact it is and how much threatened species depend on it into one number. The method was developed by the Netherlands Environmental Assessment Agency (PBL); we applied it, with European and global data, to the whole trilateral Wadden Sea Region.'
        }),
        chapter({
            id: 'formula', legend: 'boundary', location: OVERVIEW, layers: [['wsr-line', 1]],
            title: 'One formula, three ingredients',
            html: '<span class="wad-tag">The method</span>' +
                '<div class="wad-formula">Nature Points = Area × Quality × Threat weight</div>' +
                '<b>Area</b>: how much of each habitat there is, in km².<br>' +
                '<b>Quality</b>: how intact the habitat is, from 0 (degraded) to 1 (intact).<br>' +
                '<b>Threat weight</b>: how important the habitat is for rare and threatened species, from 0.1 to 2.4.<br><br>' +
                'One Nature Point equals one km² of habitat in perfect condition with a threat weight of 1. We calculate the formula for every 100 m cell of the 36,757 km² region on the map, then add the cells up.'
        }),
        chapter({
            id: 'habitat', legend: 'habitat', location: OVERVIEW, layers: [['habitat-layer', 1], ['wsr-line', 0.6]],
            title: 'Step 1: Where are the habitats?',
            html: '<span class="wad-tag">Step 1 of 4 · Area</span><br>' +
                'We divided the region into 24 habitat classes on a 100 m grid. <b>Land and inland water</b> (9 classes) come from the GLOBIO land-use map for 2015; the <b>sea</b> (15 classes) comes from the European seabed habitat map EUSeaMap 2023: three depth zones with five types of seabed.<br><br>' +
                'Land makes up 49% of the region, sea 36% and water 15%. Farmland dominates the land: managed grassland and arable land cover more than 80% of it.'
        }),
        chapter({
            id: 'quality', legend: 'quality', location: OVERVIEW, layers: [['quality-layer', 1], ['wsr-line', 0.6]],
            title: 'Step 2: How intact is nature?',
            html: '<span class="wad-tag">Step 2 of 4 · Quality</span><br>' +
                'Quality runs from 0 to 1 and comes from three European sources: <b>GLOBIO mean species abundance</b> on land, the <b>EU Water Framework Directive</b> ecological status for coastal and transitional waters (moderate 0.5, good 0.7, high 0.9), and <b>OSPAR</b> seabed diversity scores at sea.<br><br>' +
                'The land scores lowest, with an average of 0.27, because farmland leaves little room for wild species. The sea averages 0.56, and the water of the Wadden Sea scores highest, at 0.69.'
        }),
        chapter({
            id: 'threat', legend: 'threat', location: OVERVIEW, layers: [['threat-layer', 1], ['wsr-line', 0.6]],
            title: 'Step 3: Which habitats do threatened species need?',
            html: '<span class="wad-tag">Step 3 of 4 · Threat weight</span><br>' +
                'We took the 800 species from the IUCN Red List whose ranges overlap the region. Each species gets a weight from its Red List category, how rare it is, and how much of its world range lies in the Wadden Sea Region. That weight is shared among the habitats the species uses, added up per habitat and scaled from 0.1 to 2.4.<br><br>' +
                'Open water scores highest (2.4), followed by inland wetland (1.35) and woodland (0.66). Salt marsh scores lowest (0.10) because few assessed species list it as a habitat.'
        }),
        chapter({
            id: 'np', legend: 'np', location: OVERVIEW, layers: [['np-layer', 1], ['wsr-line', 0.6]],
            title: 'Step 4: Nature Points for the region',
            html: '<span class="wad-tag">Step 4 of 4 · Result</span><br>' +
                'Multiplying the three ingredients for every cell and adding them up gives the region <b>12,309 Nature Points</b>.' +
                '<div class="wad-stats"><div><b>12,309</b>total</div><div><b>8,942</b>water</div><div><b>2,046</b>sea</div><div><b>1,321</b>land</div></div><br>' +
                'Water covers 15% of the region but holds 73% of its Nature Points: it scores high on all three ingredients at once. Land covers almost half of the region but holds only 11%.<br>' +
                '<a class="wad-button" href="./compare.html" target="_blank">Compare habitat and Nature Points with a slider</a>'
        }),
        chapter({
            id: 'zoom', legend: 'np', location: { center: [5.75, 53.38], zoom: 8.0, pitch: 0, bearing: 0 }, layers: [['np-layer', 1], ['wsr-line', 0.6]],
            title: 'Closer: the tidal basins',
            html: '<span class="wad-tag">Zoom in</span><br>' +
                'The darkest cells lie in the Wadden Sea itself: the tidal basins behind the barrier islands, the channels and the estuaries. The mainland farmland behind the dikes is pale: its area is large, but its quality is low.'
        }),
        chapter({
            id: 'meaning', legend: 'np', location: OVERVIEW, layers: [['np-layer', 0.6], ['wsr-line', 0.8]],
            title: 'What the numbers mean, and what they don\'t',
            html: '<span class="wad-tag">Interpretation</span><br>' +
                'Nature Points are a measure of nature, not a price. Like hectares, they grow with the size of the area, so they can be added up and compared between places, habitats or future scenarios.<br><br>' +
                'Three choices matter most: the water class joins salt and fresh water, and much of its threat weight comes from freshwater species; the threat weight adds up species, so habitats with few assessed species, such as salt marsh, may be undervalued; and a wider or narrower boundary of the Wadden Sea gives a different total.'
        })
    ]
};
