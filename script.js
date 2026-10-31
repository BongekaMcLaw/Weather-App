const API_KEY = "da6ddf4016cfdf6f57d71faada94f24d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const weatherBox = document.getElementById("weather-box");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

async function fetchWeather(city) {
  // Reset states
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  weatherBox.classList.add("hidden");

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling and try again.");
      }
      throw new Error("Something went wrong. Please try again.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove("hidden");
  } finally {
    loadingEl.classList.add("hidden");
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent =
    `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${data.wind.speed} m/s`;

  weatherBox.classList.remove("hidden");
}
