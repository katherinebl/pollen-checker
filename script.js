let currentLang = 'en';

const translations = {
    en: {
        subtitle: 'Check pollen levels in your area',
        placeholder: 'Enter city name...',
        search: 'Search',
        or: 'or',
        location: '📍 Use my location',
        loading: 'Fetching pollen data...',
        yourLocation: 'Your Location',
        pollenTypes: {
            alder_pollen: 'Alder',
            birch_pollen: 'Birch',
            grass_pollen: 'Grass',
            mugwort_pollen: 'Mugwort',
            olive_pollen: 'Olive',
            ragweed_pollen: 'Ragweed'
        },
        levels: {
            low: { label: 'Low', recommendation: 'Pollen levels are low. Great day for outdoor activities!' },
            moderate: { label: 'Moderate', recommendation: 'Moderate pollen levels. Consider limiting prolonged outdoor exposure.' },
            high: { label: 'High', recommendation: 'High pollen levels. Limit outdoor activities, keep windows closed.' },
            'very-high': { label: 'Very High', recommendation: 'Very high pollen levels. Avoid outdoor activities, use air purifier indoors.' }
        },
        errors: {
            enterCity: 'Please enter a city name',
            cityNotFound: 'City not found. Please try another name.',
            fetchLocation: 'Failed to fetch location data. Please try again.',
            fetchPollen: 'Failed to fetch pollen data. Please try again.',
            noGeolocation: 'Geolocation is not supported by your browser',
            locationError: 'Unable to retrieve your location. Please enable location services or search by city name.'
        }
    },
    es: {
        subtitle: 'Consulta los niveles de polen en tu zona',
        placeholder: 'Ingresa el nombre de la ciudad...',
        search: 'Buscar',
        or: 'o',
        location: '📍 Usar mi ubicación',
        loading: 'Obteniendo datos de polen...',
        yourLocation: 'Tu ubicación',
        pollenTypes: {
            alder_pollen: 'Alerce',
            birch_pollen: 'Abedul',
            grass_pollen: 'Hierba',
            mugwort_pollen: 'Artemisa',
            olive_pollen: 'Olivo',
            ragweed_pollen: 'Ambrosía'
        },
        levels: {
            low: { label: 'Bajo', recommendation: 'Los niveles de polen son bajos. ¡Excelente día para actividades al aire libre!' },
            moderate: { label: 'Moderado', recommendation: 'Niveles de polen moderados. Considera limitar la exposición prolongada al aire libre.' },
            high: { label: 'Alto', recommendation: 'Niveles de polen altos. Limita las actividades al aire libre, mantén las ventanas cerradas.' },
            'very-high': { label: 'Muy alto', recommendation: 'Niveles de polen muy altos. Evita actividades al aire libre, usa purificador de aire en interiores.' }
        },
        errors: {
            enterCity: 'Por favor ingresa el nombre de una ciudad',
            cityNotFound: 'Ciudad no encontrada. Por favor intenta con otro nombre.',
            fetchLocation: 'Error al obtener datos de ubicación. Por favor intenta de nuevo.',
            fetchPollen: 'Error al obtener datos de polen. Por favor intenta de nuevo.',
            noGeolocation: 'La geolocalización no es compatible con tu navegador',
            locationError: 'No se pudo obtener tu ubicación. Por favor habilita los servicios de ubicación o busca por nombre de ciudad.'
        }
    }
};

const pollenTypes = [
    { key: 'alder_pollen' },
    { key: 'birch_pollen' },
    { key: 'grass_pollen' },
    { key: 'mugwort_pollen' },
    { key: 'olive_pollen' },
    { key: 'ragweed_pollen' }
];

function getLevel(value) {
    if (value === null || value === undefined) return { level: 'low', label: translations[currentLang].levels.low.label, recommendation: translations[currentLang].levels.low.recommendation };
    if (value <= 10) return { level: 'low', label: translations[currentLang].levels.low.label, recommendation: translations[currentLang].levels.low.recommendation };
    if (value <= 30) return { level: 'moderate', label: translations[currentLang].levels.moderate.label, recommendation: translations[currentLang].levels.moderate.recommendation };
    if (value <= 60) return { level: 'high', label: translations[currentLang].levels.high.label, recommendation: translations[currentLang].levels.high.recommendation };
    return { level: 'very-high', label: translations[currentLang].levels['very-high'].label, recommendation: translations[currentLang].levels['very-high'].recommendation };
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    updateUIText();
}

function updateUIText() {
    const t = translations[currentLang];
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('cityInput').placeholder = t.placeholder;
    document.getElementById('searchBtn').textContent = t.search;
    document.getElementById('or').textContent = t.or;
    document.getElementById('locationBtn').textContent = t.location;
    document.getElementById('loadingText').textContent = t.loading;
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.classList.add('active');
    setTimeout(() => errorEl.classList.remove('active'), 5000);
}

function showLoading(show) {
    document.getElementById('loading').classList.toggle('active', show);
}

async function searchCity() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        showError(translations[currentLang].errors.enterCity);
        return;
    }

    showLoading(true);
    document.getElementById('resultsCard').classList.remove('active');

    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${currentLang}&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            showError(translations[currentLang].errors.cityNotFound);
            showLoading(false);
            return;
        }

        const location = geoData.results[0];
        await fetchPollenData(location.latitude, location.longitude, location.name);
    } catch (error) {
        showError(translations[currentLang].errors.fetchLocation);
        showLoading(false);
    }
}

async function fetchPollenData(lat, lon, locationName) {
    try {
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&forecast_days=1`);
        const data = await response.json();

        displayResults(data, locationName);
    } catch (error) {
        showError(translations[currentLang].errors.fetchPollen);
    } finally {
        showLoading(false);
    }
}

function displayResults(data, locationName) {
    document.getElementById('locationName').textContent = locationName;
    const grid = document.getElementById('pollenGrid');
    grid.innerHTML = '';

    const hourlyData = data.hourly;
    const currentHour = new Date().getHours();
    const currentIndex = hourlyData.time.findIndex(t => {
        const time = new Date(t);
        return time.getHours() === currentHour;
    });

    const index = currentIndex >= 0 ? currentIndex : 0;

    pollenTypes.forEach(type => {
        const value = hourlyData[type.key][index];
        const { level, label, recommendation } = getLevel(value);
        const typeName = translations[currentLang].pollenTypes[type.key];

        const card = document.createElement('div');
        card.className = `pollen-card level-${level}`;
        card.innerHTML = `
            <div class="pollen-type">${typeName}</div>
            <div class="pollen-value ${level}">${value !== null ? value : 'N/A'}</div>
            <div class="pollen-label ${level}">${label}</div>
            <div class="pollen-recommendation">${recommendation}</div>
        `;
        grid.appendChild(card);
    });

    document.getElementById('resultsCard').classList.add('active');
}

function useMyLocation() {
    if (!navigator.geolocation) {
        showError(translations[currentLang].errors.noGeolocation);
        return;
    }

    showLoading(true);
    document.getElementById('resultsCard').classList.remove('active');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${currentLang}`);
                const geoData = await geoResponse.json();
                
                const locationName = geoData.address && geoData.address.city 
                    ? geoData.address.city 
                    : (geoData.address && geoData.address.town 
                        ? geoData.address.town 
                        : translations[currentLang].yourLocation);
                
                await fetchPollenData(latitude, longitude, locationName);
            } catch (error) {
                await fetchPollenData(latitude, longitude, translations[currentLang].yourLocation);
            }
        },
        (error) => {
            showError(translations[currentLang].errors.locationError);
            showLoading(false);
        }
    );
}

// Allow search on Enter key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCity();
});
