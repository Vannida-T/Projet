// Initialisation des variables de la map
var lat = 46.819;
var lon = 8.21;
var zoom = 8;
var macarte = null;
var cercle = null;
var couche_hero = L.featureGroup();
var couche_coc = L.featureGroup();


// Jeu de données
var cantons = [
	{"nom": "VD", "coc": 1173, "hero": 648, "lat": 46.6356963, "lon": 6.5320717},
	{"nom": "VS", "coc": 329, "hero": 110, "lat": 46.2303063, "lon": 7.6605757},
	{"nom": "GE", "coc": 531, "hero": 619, "lat": 46.2017559, "lon": 6.1466014},
	{"nom": "BE", "coc": 1686, "hero": 1690, "lat": 46.9482713, "lon": 7.4514512},
	{"nom": "FR", "coc": 151, "hero": 135, "lat": 46.6789116, "lon": 7.1027113},
	{"nom": "SO", "coc": 244, "hero": 122, "lat": 47.31874, "lon": 7.6698284},
	{"nom": "NE", "coc": 245, "hero": 223, "lat": 46.9895828, "lon": 6.9292641},
	{"nom": "JU", "coc": 31, "hero": 12, "lat": 47.3566699, "lon": 7.1598893},
	{"nom": "BS", "coc": 504, "hero": 383, "lat": 47.5579097, "lon": 7.5927728},
	{"nom": "BL", "coc": 125, "hero": 32, "lat": 47.5092938, "lon": 7.6588333},
	{"nom": "AG", "coc": 353, "hero": 259, "lat": 47.412396, "lon": 8.1948321},
	{"nom": "ZU", "coc": 2024, "hero": 1118, "lat": 47.3723941, "lon": 8.5423328},
	{"nom": "GL", "coc": 3, "hero": 1, "lat": 46.9796562, "lon": 9.108812},
	{"nom": "SH", "coc": 120, "hero": 90, "lat": 47.6960491, "lon": 8.634513},
	{"nom": "AR", "coc": 33, "hero": 11, "lat": 47.38937, "lon": 9.39818},
	{"nom": "AI", "coc": 7, "hero": 2, "lat": 47.33103, "lon": 9.40996},
	{"nom": "SG", "coc": 262, "hero": 474, "lat": 47.4250593, "lon": 9.3765878},
	{"nom": "GR", "coc": 172, "hero": 197, "lat": 46.6960615, "lon": 9.6027351},
	{"nom": "TG", "coc": 174, "hero": 72, "lat": 47.5859649, "lon": 9.1428769},
	{"nom": "LU", "coc": 444, "hero": 322, "lat": 47.0505452, "lon": 8.3054682},
	{"nom": "UR", "coc": 1, "hero": 1, "lat": 46.7864413, "lon": 8.6420159},
	{"nom": "SZ", "coc": 40, "hero": 8, "lat": 47.0571976, "lon": 8.7222073},
	{"nom": "OW", "coc": 1, "hero": 1, "lat": 46.8613857, "lon": 8.2067825},
	{"nom": "NW", "coc": 3, "hero": 0, "lat": 46.942756, "lon": 8.4119773},
	{"nom": "ZG", "coc": 42, "hero": 3, "lat": 47.1486137, "lon": 8.5539378},
	{"nom": "TI", "coc": 529, "hero": 263, "lat": 46.3356506, "lon": 8.753706}	
];

// Trier le tableau des cantons dans l'ordre décroissant des cas
// pour que les grosses bulles se retrouvent sous les petites bulles qui deviennent ainsi clicables
var triCoc = cantons.sort(function compare(a, b) {
	return b.coc - a.coc;
});

var triHero = cantons.sort(function compare(a, b) {
	return b.hero - a.hero;
});


// Fonction d'initialisation de la map
function initMap() 
{
    // Créer l'objet "macarte" et l'insérer dans l'élément HTML qui a l'id "map"
    macarte = L.map('map').setView([lat, lon], zoom);
    // Leaflet rècupère une des cartes de la Suisse sur openstreetmap.org
    L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors under <a href="http://www.openstreetmap.org/copyright">ODbL</a>',
            minZoom: 8,	// on veut juste la suisse
			maxZoom: 15	// pour que le nom des petits villages soit visibles
        }).addTo(macarte);

    // Créer la couche cocaine
    for(canton in cantons)
    {
        var cercle = L.circle([cantons[canton].lat,cantons[canton].lon], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.3,
            radius: cantons[canton].coc * 15
        })
        .addTo(couche_coc);
        cercle.bindPopup(triCoc[canton].coc.toString() + " dénonciation(s)");
    }

    // Créer la couche héroïne
    for(canton in cantons)
    {
        var cercle = L.circle([cantons[canton].lat,cantons[canton].lon], {
            color: "blue",
            fillColor: "#4169FF",
            fillOpacity: 0.35,
            radius: cantons[canton].hero * 15
        })
        .addTo(couche_hero);
        cercle.bindPopup(triHero[canton].hero.toString() + " dénonciation(s)");
    }

    // Sélectionner la bonne couche à afficher
    let button = document.getElementById("bouton");
    let itemList = document.getElementById("stup");
 
    button.addEventListener("click", function() 
    { // Quand on clique, on exécute ce qui suit
    let liste = itemList.selectedOptions;
    let output = "";

    for (let i=0; i<liste.length; i++) {
        if (output === "") 
        {
            output = liste[i].value;
        }

    }
        if(output === "0")
        {
            macarte.removeLayer(couche_coc);
            macarte.removeLayer(couche_hero);
        }
        if(output === "1")
        {
        macarte.removeLayer(couche_coc); 
        macarte.removeLayer(couche_hero); 
        macarte.addLayer(couche_coc);
        }
        if(output === "2")
        {
        macarte.removeLayer(couche_hero); 
        macarte.removeLayer(couche_coc); 
        macarte.addLayer(couche_hero);
        }
    }, false);
	
}

// Initialiser la map
initMap(); 