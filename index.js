import "https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js";

const mapbox_token="pk.eyJ1IjoiZGlkaW5hbWFydWRpbiIsImEiOiJja2IwZDlycTIwNnZjMnJzOWFwNTh5MHF0In0.7SfIGPF_Nm28KosRJ-GADQ"
mapboxgl.accessToken =  mapbox_token;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 3,
    center: [4.899, 52.372]
    });
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

const getColorFromCount=count=>{
    if(count >= 1000){
        return "red";
    }
    if(count < 1000 && count >=100){
        return "orange";
    }
    return "grey";
};
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}


fetch("https://api.kawalcorona.com/")
.then(response => response.json())
.then(data => {
    const list=data
    .map(attributes=>{
        var res=attributes.attributes;
        var marker= new mapboxgl.Marker({
            color : getColorFromCount(attributes.attributes.Confirmed)
        })
        .setLngLat([attributes.attributes.Long_,attributes.attributes.Lat])
        .setPopup(new mapboxgl.Popup().setHTML(res.Country_Region+" , "+"Confirmed : "+res.Confirmed+", "+"Recovered : "+res.Recovered+", "+"Deaths : "+ res.Deaths+", "+"Active : "+res.Active))
        .addTo(map);
        
        marker.getPopup();
    });
});