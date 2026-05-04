const pollenTypes = [
    { key: 'alder_pollen', name: 'Alder' },
    { key: 'birch_pollen', name: 'Birch' },
    { key: 'grass_pollen', name: 'Grass' },
    { key: 'mugwort_pollen', name: 'Mugwort' },
    { key: 'olive_pollen', name: 'Olive' },
    { key: 'ragweed_pollen', name: 'Ragweed' }
];

function getLevel(value) {
    if (value === null || value === undefined) return { level: 'low', label: 'Low', recommendation: 'No data available' };
    if (value <= 10) return { level: 'low', label: 'Low', recommendation: 'Pollen levels are low. Great day for outdoor activities!' };
    if (value <= 30) return { level: 'moderate', label: 'Moderate', recommendation: 'Moderate pollen levels. Consider limiting prolonged outdoor exposure.' };
    if (value <= 60) return { level: 'high', label: 'High', recommendation: 'High pollen levels. Limit outdoor activities, keep windows closed.' };
    return { level: 'very-high', label: 'Very High', recommendation: 'Very high pollen levels. Avoid outdoor activities, use air purifier indoors.' };
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
        showError('Please enter a city name');
        return;
    }

    showLoading(true);
    document.getElementById('resultsCard').classList.remove('active');

    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            showError('City not found. Please try another name.');
            showLoading(false);
            return;
        }

        const location = geoData.results[0];
        await fetchPollenData(location.latitude, location.longitude, location.name);
    } catch (error) {
        showError('Failed to fetch location data. Please try again.');
        showLoading(false);
    }
}

async function fetchPollenData(lat, lon, locationName) {
    try {
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&forecast_days=1`);
        const data = await response.json();

        displayResults(data, locationName);
    } catch (error) {
        showError('Failed to fetch pollen data. Please try again.');
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

        const card = document.createElement('div');
        card.className = `pollen-card level-${level}`;
        card.innerHTML = `
            <div class="pollen-type">${type.name}</div>
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
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    document.getElementById('resultsCard').classList.remove('active');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchPollenData(latitude, longitude, 'Your Location');
        },
        (error) => {
            showError('Unable to retrieve your location. Please enable location services or search by city name.');
            showLoading(false);
        }
    );
}

// Allow search on Enter key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCity();
});
