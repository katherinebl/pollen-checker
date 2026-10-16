const userLang = navigator.language || navigator.userLanguage;
let currentLang = userLang.startsWith('es') ? 'es' : 'en';
let lastPollenData = null;
let lastLocationName = null;
let activeErrorKey = null;
let errorTimeout;

const translations = {
    en: {
        skip: 'Skip to content',
        heroEyebrow: 'A little closer to nature',
        heroTitle: 'What are you',
        heroAccent: 'breathing today?',
        searchLabel: 'Find a location',
        panelNote: 'Six pollen species. One clearer picture.',
        localReport: 'Your local pollen report',
        emptyTitle: 'A breath of clarity.',
        emptyDescription: 'Search for a city or use your location to explore pollen concentrations near you.',
        displayed: 'Displayed',
        species: 'Species',
        concentration: 'Concentration',
        risk: 'Risk level',
        trend: '7-day samples',
        trendDescription: 'Available daily samples, oldest to newest',
        noTrend: 'Not enough data for a trend',
        unavailable: 'Unavailable',
        noConcentration: 'Concentration data is unavailable for this species.',
        partialData: 'Some concentrations are unavailable. Risk is shown only where concentration data is available.',
        noData: 'Pollen concentrations are unavailable for this location. No risk levels can be reported.',
        reportLoaded: 'Pollen report loaded for',
        dataSource: 'Pollen data · Open-Meteo',
        language: 'Language',
        subtitle: 'Check pollen levels in your area',
        placeholder: 'Enter city name...',
        search: 'Search',
        or: 'or',
        location: 'Use my location',
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
        skip: 'Saltar al contenido',
        heroEyebrow: 'Un poco más cerca de la naturaleza',
        heroTitle: '¿Qué respiras',
        heroAccent: 'hoy?',
        searchLabel: 'Busca una ubicación',
        panelNote: 'Seis tipos de polen. Una visión más clara.',
        localReport: 'Tu informe local de polen',
        emptyTitle: 'Respira con más claridad.',
        emptyDescription: 'Busca una ciudad o usa tu ubicación para consultar las concentraciones de polen cerca de ti.',
        displayed: 'Mostrado',
        species: 'Especie',
        concentration: 'Concentración',
        risk: 'Nivel de riesgo',
        trend: 'Muestras de 7 días',
        trendDescription: 'Muestras diarias disponibles, de la más antigua a la más reciente',
        noTrend: 'No hay suficientes datos para mostrar una tendencia',
        unavailable: 'Sin datos',
        noConcentration: 'No hay datos de concentración para esta especie.',
        partialData: 'Algunas concentraciones no están disponibles. Solo se muestra el riesgo cuando hay datos de concentración.',
        noData: 'No hay datos de concentración de polen para esta ubicación. No se pueden indicar niveles de riesgo.',
        reportLoaded: 'Informe de polen cargado para',
        dataSource: 'Datos de polen · Open-Meteo',
        language: 'Idioma',
        subtitle: 'Consulta los niveles de polen en tu zona',
        placeholder: 'Ingresa el nombre de la ciudad...',
        search: 'Buscar',
        or: 'o',
        location: 'Usar mi ubicación',
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
    { key: 'alder_pollen', illustration: 'branch', palette: 'green' },
    { key: 'birch_pollen', illustration: 'branch', palette: 'blue' },
    { key: 'grass_pollen', illustration: 'grass', palette: 'yellow' },
    { key: 'mugwort_pollen', illustration: 'flower', palette: 'blue' },
    { key: 'olive_pollen', illustration: 'branch', palette: 'green' },
    { key: 'ragweed_pollen', illustration: 'grass', palette: 'yellow' }
];

function getLevel(value) {
    if (!Number.isFinite(value)) return { level: 'unavailable', label: translations[currentLang].unavailable };
    if (value <= 10) return { level: 'low', label: translations[currentLang].levels.low.label };
    if (value <= 30) return { level: 'moderate', label: translations[currentLang].levels.moderate.label };
    if (value <= 60) return { level: 'high', label: translations[currentLang].levels.high.label };
    return { level: 'very-high', label: translations[currentLang].levels['very-high'].label };
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    updateUIText();

    // Re-render results if they are currently displayed
    if (lastPollenData && lastLocationName && document.getElementById('resultsCard').classList.contains('active')) {
        displayResults(lastPollenData, lastLocationName);
    }
}

function updateUIText() {
    const t = translations[currentLang];
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t[el.dataset.i18n];
    });
    document.getElementById('languageControl').setAttribute('aria-label', t.language);
    document.getElementById('report').setAttribute('aria-label', t.localReport);
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('cityInput').placeholder = t.placeholder;
    document.getElementById('or').textContent = t.or;
    document.getElementById('loadingText').textContent = t.loading;
    if (activeErrorKey) {
        document.getElementById('errorMessage').textContent = t.errors[activeErrorKey];
    }
}

function showError(key) {
    const errorEl = document.getElementById('errorMessage');
    activeErrorKey = key;
    errorEl.textContent = translations[currentLang].errors[key];
    errorEl.classList.add('active');
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorEl.classList.remove('active');
        errorEl.textContent = '';
        activeErrorKey = null;
    }, 5000);
}

function showLoading(show) {
    document.getElementById('loading').classList.toggle('active', show);
    document.getElementById('resultsCard').setAttribute('aria-busy', String(show));
    document.getElementById('searchBtn').disabled = show;
    document.getElementById('locationBtn').disabled = show;
    if (show) {
        clearTimeout(errorTimeout);
        activeErrorKey = null;
        document.getElementById('errorMessage').classList.remove('active');
        document.getElementById('errorMessage').textContent = '';
        document.getElementById('reportStatus').textContent = '';
    }
    document.getElementById('emptyState').hidden = show || document.getElementById('resultsCard').classList.contains('active');
}

async function searchCity() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        showError('enterCity');
        return;
    }

    showLoading(true);
    document.getElementById('resultsCard').classList.remove('active');

    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${currentLang}&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            showError('cityNotFound');
            showLoading(false);
            return;
        }

        const location = geoData.results[0];
        await fetchPollenData(location.latitude, location.longitude, location.name);
    } catch (error) {
        showError('fetchLocation');
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
        showError('fetchPollen');
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

function createSparkline(hourlyData, pollenKey) {
    const values = hourlyData[pollenKey];
    if (!Array.isArray(values)) return '';

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
        <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${translations[currentLang].pollenTypes[pollenKey]}: ${translations[currentLang].trend}">
            <desc>${translations[currentLang].trendDescription}: ${validValues.join(', ')}</desc>
            <polyline
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                points="${points}"
            />
            <circle
                cx="${lastX}"
                cy="${lastY}"
                r="3"
                fill="currentColor"
            />
        </svg>
    `;
}

function displayResults(data, locationName) {
    if (!data.hourly || !Array.isArray(data.hourly.time)) {
        throw new Error('Pollen hourly data is unavailable');
    }
    const t = translations[currentLang];
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

    let unavailableCount = 0;
    pollenTypes.forEach(type => {
        const value = hourlyData[type.key]?.[index];
        const { level, label } = getLevel(value);
        const available = level !== 'unavailable';
        if (!available) unavailableCount++;
        const typeName = t.pollenTypes[type.key];
        const sparkline = createSparkline(hourlyData, type.key);

        const card = document.createElement('article');
        card.className = `pollen-card level-${level}`;
        card.setAttribute('aria-labelledby', `species-${type.key}`);
        card.innerHTML = `
            <div class="illustration-box botanical-${type.palette}" aria-hidden="true">
                <svg><use href="#botanical-${type.illustration}"/></svg>
            </div>
            <h3 class="pollen-type" id="species-${type.key}">${typeName}</h3>
            <div class="measurement">
                <span class="sr-only">${t.concentration}: </span>
                <strong class="pollen-value">${available ? value : '—'}</strong>
                <span class="pollen-unit"></span>
            </div>
            <span class="pollen-label ${level}"><span class="sr-only">${t.risk}: </span>${label}</span>
            <div class="pollen-secondary">
                <p class="${available ? 'pollen-recommendation' : 'pollen-availability'}">${available ? t.recommendations[type.key][level] : t.noConcentration}</p>
                <div class="card-trend">
                    <span class="trend-label" aria-hidden="true">${t.trend}</span>
                    ${sparkline || `<span class="trend-unavailable" role="img" aria-label="${t.noTrend}">—</span>`}
                </div>
            </div>
        `;
        // API unit metadata is text, never HTML. No unit is inferred when absent.
        const unit = data.hourly_units?.[type.key];
        if (available && typeof unit === 'string') {
            card.querySelector('.pollen-unit').textContent = unit === 'grains/m³'
                ? (currentLang === 'es' ? 'granos/m³' : unit)
                : unit;
        }
        grid.appendChild(card);
    });

    const availabilityNote = document.getElementById('availabilityNote');
    availabilityNote.hidden = unavailableCount === 0;
    availabilityNote.textContent = unavailableCount === pollenTypes.length ? t.noData : t.partialData;
    document.getElementById('resultsCard').classList.add('active');
    document.getElementById('emptyState').hidden = true;
    document.getElementById('reportStatus').textContent = `${t.reportLoaded} ${locationName}. ${unavailableCount ? availabilityNote.textContent : ''}`;
}

function useMyLocation() {
    if (!navigator.geolocation) {
        showError('noGeolocation');
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
            showError('locationError');
            showLoading(false);
        }
    );
}

// Native form submission supports both Enter and the search button, once each.
document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!document.getElementById('searchBtn').disabled) searchCity();
});
document.getElementById('locationBtn').addEventListener('click', useMyLocation);
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
// Initialize UI with detected language
setLanguage(currentLang);
