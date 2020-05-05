
// Initialisation des variables de la map
var lat = 46.819;
var lon = 8.21;
var zoom = 8;
var macarte = null;
var cercle = null;

// Jeux de données
const cantons = [
	1173,	// VD 
	329, 	// VS
	531,	// GE
	1686,	// BE
	151,	// FR
	244,	// SO
	245,	// NE
	31,		// JU
	504,	// BS-ville
	125,	// BS-campagne
	353,	// AG
	2024,	// ZU
	3,		// GL
	120,	// SH
	33,		// AR
	7,		// AI
	262,	// SG
	172,	// GR
	174,	// TG
	444,	// LU
	1,		// UR
	40,		// SZ
	1,		// OW
	3,		// NW
	42,		// ZG
	529		// TI
];

// Coordonnées géographiques des cantons
const latitudes = [
	46.6356963,	// VD
	46.2303063,	// VS
	46.2017559,	// GE
	46.9482713,	// BE
	46.6789116,	// FR
	47.31874,	// SO
	46.9895828,	// NE
	47.3566699,	// JU
	47.5579097,	// BS-ville
	47.5092938,	// BS-campagne
	47.412396,	// AG
	47.3723941,	// ZU
	46.9796562,	// GL
	47.6960491,	// SH
	47.38937,	// AR
	47.33103,	// AI
	47.4250593,	// SG
	46.6960615,	// GR
	47.5859649,	// TG
	47.0505452,	// LU
	46.7864413,	// UR
	47.0571976,	// SZ
	46.8613857,	// OW
	46.942756,	// NW
	47.1486137,	// ZG
	46.3356506	// TI
];

const longitutdes = [
	6.5320717,	// VD
	7.6605757,	// VS
	6.1466014,	// GE
	7.4514512,	// BE
	7.1027113,	// FR
	7.6698284,	// SO
	6.9292641,	// NE
	7.1598893,	// JU
	7.5927728,	// BS-ville
	7.6588333,	// BS-campagne
	8.1948321,	// AG
	8.5423328,	// ZU
	9.108812,	// GL
	8.634513,	// SH
	9.39818,	// AR
	9.40996,	// AI
	9.3765878,	// SG
	9.6027351,	// GR
	9.1428769,	// TG
	8.3054682,	// LU
	8.6420159,	// UR
	8.7222073,	// SZ
	8.2067825,	// OW
	8.4119773,	// NW
	8.5539378,	// ZG
	8.753706	// TI
];

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
	let i=0;	// Initialisation d'une variable i pour le comptage des cantons
	while(i<26)	// Tant qu'on n'a pas fait tous les 26 cantons, on crée des bulles
	{		
		cercle = L.circle([latitudes[i], longitutdes[i]], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.3,	// Ajout de la transparence pour pouvoir voir les petites bulles prises à l'intérieur des grosses bulles
			radius: cantons[i]*15 // *15 = ratio pour une meilleure visibilité des petites bulles
		}).addTo(macarte);
		cercle.bindPopup(cantons[i].toString() + " dénonciations");
		i++;
	}

	
	}
	
    window.onload = function(){
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
initMap(); 
    };