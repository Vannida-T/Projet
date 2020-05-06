
// Initialisation des variables de la map
var lat = 46.819;
var lon = 8.21;
var zoom = 8;
var macarte = null;
var cercle = null;

// Jeux de données
var cantons = {
	"VD": {"cas": 1173, "lat": 46.6356963, "lon": 6.5320717},
	"VS": {"cas": 329, "lat": 46.2303063, "lon": 7.6605757},
	"GE": {"cas": 531, "lat": 46.2017559, "lon": 6.1466014},
	"BE": {"cas": 1686, "lat": 46.9482713, "lon": 7.4514512},
	"FR": {"cas": 151, "lat": 46.6789116, "lon": 7.1027113},
	"SO": {"cas": 244, "lat": 47.31874, "lon": 7.6698284},
	"NE": {"cas": 245, "lat": 46.9895828, "lon": 6.9292641},
	"JU": {"cas": 31, "lat": 47.3566699, "lon": 7.1598893},
	"BS": {"cas": 504, "lat": 47.5579097, "lon": 7.5927728},
	"BL": {"cas": 125, "lat": 47.5092938, "lon": 7.6588333},
	"AG": {"cas": 353, "lat": 47.412396, "lon": 8.1948321},
	"ZU": {"cas": 2024, "lat": 47.3723941, "lon": 8.5423328},
	"GL": {"cas": 3, "lat": 46.9796562, "lon": 9.108812},
	"SH": {"cas": 120, "lat": 47.6960491, "lon": 8.634513},
	"AR": {"cas": 33, "lat": 47.38937, "lon": 9.39818},
	"AI": {"cas": 7, "lat": 47.33103, "lon": 9.40996},
	"SG": {"cas": 262, "lat": 47.4250593, "lon": 9.3765878},
	"GR": {"cas": 172, "lat": 46.6960615, "lon": 9.6027351},
	"TG": {"cas": 174, "lat": 47.5859649, "lon": 9.1428769},
	"LU": {"cas": 444, "lat": 47.0505452, "lon": 8.3054682},
	"UR": {"cas": 1, "lat": 46.7864413, "lon": 8.6420159},
	"SZ": {"cas": 40, "lat": 47.0571976, "lon": 8.7222073},
	"OW": {"cas": 1, "lat": 46.8613857, "lon": 8.2067825},
	"NW": {"cas": 3, "lat": 46.942756, "lon": 8.4119773},
	"ZG": {"cas": 42, "lat": 47.1486137, "lon": 8.5539378},
	"TI": {"cas": 529, "lat": 46.3356506, "lon": 8.753706}	
};

// Fonction de triage du tableau des cantons
// pour que les grosses bulles se retrouvent sous les petites bulles qui deviennent clicables


// Fonction d'initialisation de la map
function initMap() {
    // Créer l'objet "macarte" et l'insérer dans l'élément HTML qui a l'id "map"
    macarte = L.map('map').setView([lat, lon], zoom);
    // Leaflet rècupère une des cartes de la Suisse sur openstreetmap.org
    L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors under <a href="http://www.openstreetmap.org/copyright">ODbL</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);

	// Fonction boucle créant les bulles de données	
	for(canton in cantons){
		var cercle = L.circle([cantons[canton].lat,cantons[canton].lon], {
			color: "red",
			fillColor: "#f03",
			fillOpacity: 0.3,
			radius: cantons[canton].cas * 15
		})
		.addTo(macarte);
		cercle.bindPopup(cantons[canton].cas.toString() + " dénonciations");
	}
	
}

// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé	
window.onload = function(){
initMap(); 
};