const apiKey = '21a5ba38c194e46dfb169e56a902e121'; 


const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeather');
const weatherDiv = document.getElementById('weather');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const iconEl = document.getElementById('icon');

const fetchWeather = async () => {
    const city = cityInput.value;

    if (!city) {
        alert('Silakan masukkan nama kota.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    try {
      
        const response = await fetch(apiUrl);
        const data = await response.json();

       
        if (data.cod === '404') {
            alert('Kota tidak ditemukan.');
            weatherDiv.classList.add('hidden');
            return;
        }

        if (data.cod !== 200) {
            alert('Terjadi kesalahan: ' + data.message);
            weatherDiv.classList.add('hidden');
            return;
        }

      
        locationEl.textContent = data.name;
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionEl.textContent = data.weather[0].description;
        
       
        const iconCode = data.weather[0].icon;
        iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        
        weatherDiv.classList.remove('hidden');

    } catch (error) {
        
        console.error('Error:', error);
        alert('Gagal mengambil data cuaca. Periksa koneksi internet Anda.');
    }
};


getWeatherBtn.addEventListener('click', fetchWeather);


cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});