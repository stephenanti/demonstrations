mapboxgl.accessToken =
"pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/stephenanti/cl4ma3rje001514nt869sekqq",
  center:[10.108, 35.221],
  zoom: 1.15,
  maxZoom: 10,
  minZoom: 1,
  projection:'naturalEarth',
});

map.on("load", function () {
  map.addLayer(
    { 
      id: "political-demo", 
      type: "circle",
      source: {
        type: "geojson",
        data: "data/POLGEO.geojson",
      },
      paint: { 
    //     'circle-radius':
    // ['interpolate', ['linear'], ['zoom'],
    //     3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Violence against civilians'], ['get', 'Protests'], ['get','Strategic developments'],['get','Riots'],['get','Explosions/Remote violence'],['get','Battles']]]], 40], 1],
    //     9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Violence against civilians'], ['get', 'Protests'],['get','Strategic developments'],['get','Riots'],['get','Explosions/Remote violence'],['get','Battles']]]], 15], 5],
    // ],
    "circle-radius": 2,
    "circle-color": [
      "match",
      ["get", "EVENT_TYPE"],
      "Violence against civilians","#e62e00",
      "Protests","#ac7339",
      "Strategic developments","#0000ff",
      "Riots","#ff9900",
      "Explosions/Remote violence","#661a00",
      "Battles","#008080",
      "#ffffff"
     ],
      // "circle-stroke-color": "#000000",
      // "circle-stroke-width": 0.5,
    },
    // minzoom: 3,
  },
  "waterway-label"
  );
 });


// Pop up
map.on("click", "political-demo", function (e) {
  var location = e.features[0].properties['LOCATION'];
  var totalevents = e.features[0].properties.EVENT_ID_NO_CNTY;
  console.log(location);
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" 
      + "location:" 
      + "</h4>" 
      + "<hr>"
      + "<h6>" 
      + location
      + "</h6>"
      + "<h4>" 
      + "No.of events: " 
      + totalevents 
      + "</h4>"
    )
    .addTo(map);
  });

map.on("mouseenter", "political-demo", function () {
map.getCanvas().style.cursor = "pointer";});
map.on("mouseleave", "political-demo", function () {
map.getCanvas().style.cursor = ""; });

