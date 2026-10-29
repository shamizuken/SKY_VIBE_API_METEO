const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const suggestionText = document.getElementById('suggestion-text');

// Déclencher la recherche au clic sur le bouton
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Déclencher aussi si on appuie sur la touche "Entrée" du clavier
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getWeather(city) {
    try {
        // Étape 1 : Récupérer les coordonnées (Latitude/Longitude) de la ville
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("Ville introuvable ! Vérifie l'orthographe.");
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Étape 2 : Récupérer la météo en utilisant ces coordonnées
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const weatherCode = weatherData.current_weather.weathercode;
        console.log("Ville :", name, "| Code météo reçu :", weatherCode, "Type :", typeof weatherCode);

        // Afficher les résultats dans le HTML
        cityName.innerText = `${name}, ${country || ''}`;
        temperature.innerText = `${temp}°C`;
        weatherInfo.style.display = 'block'; // Fait apparaître la boîte météo

        // Mettre à jour le design, l'icône et la suggestion
        updateThemeAndUI(weatherCode, temp);

    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la récupération des données.");
    }
}

// Fonction pour adapter l'UI (thème, icône, texte)
function updateThemeAndUI(code, temp) {
    const body = document.body;
    body.className = ''; // Réinitialise les classes du body

    // Sécurité : s'assurer que le code est bien un nombre
    const numericCode = Number(code);

    let iconClass = "fa-solid fa-sun";
    let descText = "Ensoleillé";
    let suggestion = "Profite de ta journée ! ☀️";

    // 🌤️ 1. BEAU TEMPS / CIEL DÉGAGÉ (Codes 0, 1)
    if (numericCode === 0 || numericCode === 1) {
        body.classList.add('weather-sunny');
        iconClass = "fa-solid fa-sun";
        descText = "Ciel dégagé";
        suggestion = temp > 20 ? "Idéal pour une terrasse ou une balade ! 🕶️" : "Beau temps mais frais, sors couvert ! 🧣";
    } 
  // ☁️ 2. NUAGEUX / BRUMEUX (Codes 2, 3, 45, 48)
    else if ([2, 3, 45, 48].includes(numericCode)) {
        body.classList.add('weather-cloudy'); // <-- On change ici !
        iconClass = "fa-solid fa-cloud";
        descText = "Nuageux / Brumeux";
        suggestion = "Temps calme, parfait pour bosser au chaud. ☕";
    }
    // 🌧️ 3. PLUIE / AVERSES (Tous les codes entre 50 et 69, et 80-82)
    else if ((numericCode >= 50 && numericCode <= 69) || (numericCode >= 80 && numericCode <= 82)) {
        body.classList.add('weather-rainy');
        iconClass = "fa-solid fa-cloud-showers-heavy";
        descText = "Pluvieux";
        suggestion = "Chocolat chaud, plaid et série Netflix recommandés ! 🌧️";
    } 
    // ❄️ 4. NEIGE (Tous les codes entre 70 et 79, et 85-86)
    else if ((numericCode >= 70 && numericCode <= 79) || (numericCode >= 85 && numericCode <= 86)) {
        body.classList.add('weather-snowy');
        iconClass = "fa-solid fa-snowflake";
        descText = "Neigeux";
        suggestion = "Sortez les bonnets, il neige ! ⛄";
    } 
    // ⚡ 5. ORAGE (Codes 95, 96, 99)
    else if (numericCode >= 95) {
        body.classList.add('weather-rainy');
        iconClass = "fa-solid fa-bolt";
        descText = "Orageux";
        suggestion = "Reste bien à l'abri ! 🌩️";
    }
    // PAR DÉFAUT
    else {
        body.classList.add('weather-default');
        iconClass = "fa-solid fa-cloud-sun";
        descText = "Variable";
        suggestion = "Météo incertaine, prévois une veste. 🧥";
    }

    weatherIcon.className = iconClass;
    weatherDesc.innerText = descText;
    suggestionText.innerText = suggestion;
}