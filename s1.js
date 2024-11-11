const apikey = "c65174f2c467a36451e7e2478594739d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `${apiurl}?q=${encodeURIComponent(city)}&units=metric&appid=${apikey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found or API request failed");

        const data = await response.json();
        
        // Update the DOM with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Weather icon mapping
        const weatherIcons = {
            Clouds: "clouds.png",
            Clear: "clear.png",
            Rain: "rain.png",
            Drizzle: "drizzel.png",
            Mist: "mist.png"
        };

        // Set default icon or fallback if weather condition not in map
        weathericon.src = weatherIcons[data.weather[0].main] || "default.png";
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message);
    }
}

// Add event listener to the search button
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value.trim());
});

// Optionally, call checkweather with a default city if desired
// checkweather('Berlin');

