let currentLang = 'en';
let lastPollenData = null;
let lastLocationName = null;

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
            alder_pollen: '🌾 Alder',
            birch_pollen: '🌳 Birch',
            grass_pollen: '🌿 Grass',
            mugwort_pollen: '🌼 Mugwort',
            olive_pollen: '🫚 Olive',
            ragweed_pollen: '🌱 Ragweed'
        },
        levels: {
            low: { label: 'Low' },
            moderate: { label: 'Moderate' },
            high: { label: 'High' },
            'very-high': { label: 'Very High' }
        },
        recommendations: {
            alder_pollen: {
                low: 'Alder pollen is minimal. Enjoy outdoor activities near rivers and wetlands.',
                moderate: 'Alder levels are rising. Avoid areas near alder trees, especially in morning.',
                high: 'High alder pollen. Stay away from riverbanks and alder groves. Keep windows closed.',
                'very-high': 'Extreme alder pollen. Avoid outdoor activities entirely. Use air purifier.'
            },
            birch_pollen: {
                low: 'Birch pollen is low. Good time for outdoor activities in wooded areas.',
                moderate: 'Birch pollen increasing. Consider avoiding parks with birch trees during peak hours.',
                high: 'High birch pollen. Limit time near birch trees. Wear mask outdoors if needed.',
                'very-high': 'Very high birch pollen. Avoid all outdoor exposure. Stay indoors with air filtration.'
            },
            grass_pollen: {
                low: 'Grass pollen minimal. Great day for sports and outdoor activities.',
                moderate: 'Moderate grass pollen. Avoid freshly cut grass. Consider mowing less frequently.',
                high: 'High grass pollen. Avoid lawns and fields. Don\'t mow grass during peak hours.',
                'very-high': 'Extreme grass pollen. Stay away from all grassy areas. Keep windows shut.'
            },
            mugwort_pollen: {
                low: 'Mugwort pollen low. Safe for outdoor activities in meadows and fields.',
                moderate: 'Mugwort levels rising. Avoid fields and roadsides where mugwort grows.',
                high: 'High mugwort pollen. Stay away from meadows and rural areas. Keep windows closed.',
                'very-high': 'Very high mugwort pollen. Avoid all outdoor activities in rural areas.'
            },
            olive_pollen: {
                low: 'Olive pollen low. Good time to be outdoors in Mediterranean regions.',
                moderate: 'Olive pollen increasing. Avoid olive groves, especially during flowering season.',
                high: 'High olive pollen. Stay away from olive orchards. Limit outdoor exposure.',
                'very-high': 'Extreme olive pollen. Avoid outdoor activities in olive-growing regions entirely.'
            },
            ragweed_pollen: {
                low: 'Ragweed pollen minimal. Safe for outdoor activities in late summer/fall.',
                moderate: 'Ragweed increasing. Avoid rural areas and fields where ragweed grows.',
                high: 'High ragweed pollen. Stay away from fields and roadsides. Keep windows closed.',
                'very-high': 'Very high ragweed pollen. Avoid all outdoor exposure. Use air purifier indoors.'
            }
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
            alder_pollen: '🌾 Alerce',
            birch_pollen: '🌳 Abedul',
            grass_pollen: '🌿 Hierba',
            mugwort_pollen: '🌼 Artemisa',
            olive_pollen: '🫚 Olivo',
            ragweed_pollen: '🌱 Ambrosía'
        },
        levels: {
            low: { label: 'Bajo' },
            moderate: { label: 'Moderado' },
            high: { label: 'Alto' },
            'very-high': { label: 'Muy alto' }
        },
        recommendations: {
            alder_pollen: {
                low: 'El polen de alerce es mínimo. Disfruta de actividades al aire libre cerca de ríos y humedales.',
                moderate: 'Los niveles de alerce están aumentando. Evita áreas cerca de árboles de alerce, especialmente por la mañana.',
                high: 'Alto polen de alerce. Aléjate de riberas y bosques de alerce. Mantén las ventanas cerradas.',
                'very-high': 'Polen de alerce extremo. Evita actividades al aire libre por completo. Usa purificador de aire.'
            },
            birch_pollen: {
                low: 'El polen de abedul es bajo. Buen momento para actividades al aire libre en zonas boscosas.',
                moderate: 'El polen de abedul está aumentando. Evita parques con abedules durante las horas pico.',
                high: 'Alto polen de abedul. Limita el tiempo cerca de abedules. Usa mascarilla al aire libre si es necesario.',
                'very-high': 'Polen de abedul muy alto. Evita toda exposición al aire libre. Quédate en interiores con filtración de aire.'
            },
            grass_pollen: {
                low: 'Polen de hierba mínimo. Gran día para deportes y actividades al aire libre.',
                moderate: 'Polen de hierba moderado. Evita el césped recién cortado. Considera cortar el césped con menos frecuencia.',
                high: 'Alto polen de hierba. Evita césped y campos. No cortes el césped durante las horas pico.',
                'very-high': 'Polen de hierba extremo. Aléjate de todas las áreas con césped. Mantén las ventanas cerradas.'
            },
            mugwort_pollen: {
                low: 'Polen de artemisa bajo. Seguro para actividades al aire libre en praderas y campos.',
                moderate: 'Los niveles de artemisa están aumentando. Evita campos y carreteras donde crece la artemisa.',
                high: 'Alto polen de artemisa. Aléjate de praderas y zonas rurales. Mantén las ventanas cerradas.',
                'very-high': 'Polen de artemisa muy alto. Evita todas las actividades al aire libre en zonas rurales.'
            },
            olive_pollen: {
                low: 'Polen de olivo bajo. Buen momento para estar al aire libre en regiones mediterráneas.',
                moderate: 'El polen de olivo está aumentando. Evita olivares, especialmente durante la temporada de floración.',
                high: 'Alto polen de olivo. Aléjate de huertos de olivos. Limita la exposición al aire libre.',
                'very-high': 'Polen de olivo extremo. Evita actividades al aire libre en regiones de olivares por completo.'
            },
            ragweed_pollen: {
                low: 'Polen de ambrosía mínimo. Seguro para actividades al aire libre a finales del verano/otoño.',
                moderate: 'La ambrosía está aumentando. Evita zonas rurales y campos donde crece la ambrosía.',
                high: 'Alto polen de ambrosía. Aléjate de campos y carreteras. Mantén las ventanas cerradas.',
                'very-high': 'Polen de ambrosía muy alto. Evita toda exposición al aire libre. Usa purificador de aire en interiores.'
            }
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
    if (value === null || value === undefined) return { level: 'low', label: translations[currentLang].levels.low.label };
    if (value <= 10) return { level: 'low', label: translations[currentLang].levels.low.label };
    if (value <= 30) return { level: 'moderate', label: translations[currentLang].levels.moderate.label };
    if (value <= 60) return { level: 'high', label: translations[currentLang].levels.high.label };
    return { level: 'very-high', label: translations[currentLang].levels['very-high'].label };
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    updateUIText();
    
    // Re-render results if they are currently displayed
    if (lastPollenData && lastLocationName) {
        displayResults(lastPollenData, lastLocationName);
    }
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
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&past_days=6&forecast_days=1`);
        const data = await response.json();

        // Save for re-rendering on language change
        lastPollenData = data;
        lastLocationName = locationName;

        displayResults(data, locationName);
    } catch (error) {
        showError(translations[currentLang].errors.fetchPollen);
    } finally {
        showLoading(false);
    }
}

function formatTimestamp() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    if (currentLang === 'en') {
        return `Today at ${displayHours}:${minutes} ${period}`;
    } else {
        return `Hoy a las ${displayHours}:${minutes} ${period}`;
    }
}

function createSparkline(hourlyData, pollenKey, level) {
    const colorMap = {
        low: '#2E7D32',
        moderate: '#E65100',
        high: '#BF360C',
        'very-high': '#C62828'
    };
    
    const color = colorMap[level];
    const values = hourlyData[pollenKey];
    
    // Get last 7 days of data (one value per day at the same hour)
    const currentHour = new Date().getHours();
    const dailyValues = [];
    
    for (let i = 0; i < 7; i++) {
        const targetIndex = values.length - 1 - ((6 - i) * 24);
        if (targetIndex >= 0 && targetIndex < values.length) {
            dailyValues.push(values[targetIndex]);
        }
    }
    
    // Filter out null values
    const validValues = dailyValues.filter(v => v !== null && v !== undefined);
    
    if (validValues.length < 2) {
        return '';
    }
    
    const max = Math.max(...validValues);
    const min = Math.min(...validValues);
    const range = max - min || 1;
    
    const width = 100;
    const height = 32;
    const padding = 2;
    
    const points = validValues.map((val, i) => {
        const x = padding + (i / (validValues.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((val - min) / range) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');
    
    const lastPointIndex = validValues.length - 1;
    const lastX = padding + (lastPointIndex / (validValues.length - 1)) * (width - 2 * padding);
    const lastY = height - padding - ((validValues[lastPointIndex] - min) / range) * (height - 2 * padding);
    
    return `
        <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke="${color}"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                points="${points}"
            />
            <circle
                cx="${lastX}"
                cy="${lastY}"
                r="3"
                fill="${color}"
            />
        </svg>
    `;
}

function displayResults(data, locationName) {
    document.getElementById('locationName').textContent = locationName;
    document.getElementById('lastUpdated').textContent = formatTimestamp();
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
        const { level, label } = getLevel(value);
        const typeName = translations[currentLang].pollenTypes[type.key];
        const recommendation = translations[currentLang].recommendations[type.key][level];
        const sparkline = createSparkline(hourlyData, type.key, level);

        const card = document.createElement('div');
        card.className = `pollen-card level-${level}`;
        card.innerHTML = `
            <div class="pollen-type">${typeName}</div>
            <div class="pollen-value ${level}">${value !== null ? value : 'N/A'}</div>
            <div class="pollen-label ${level}">${label}</div>
            ${sparkline}
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
