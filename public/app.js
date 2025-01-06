const enter = document.getElementById('search');
enter.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        setTimeout(getweather, 1000);
    }
});

async function getweather() {
    const city = document.getElementById('search').value || 'Bangalore';  // Default city if empty
    const url = `/weather?city=${city}`;  // Make request to the server-side route

    try {
        const response = await fetch(url);  // Fetch weather data from the server
        const data = await response.json();  // Parse the response JSON

        console.log('Weather Data:', data);  // Log the data to verify

        if (!data || data.cod !== 200) {
            console.error('Invalid city or API response:', data);
            return;
        }

        // Weather data
        const temp = data.main.temp - 273;
        const mintemp = data.main.temp_min - 273;
        const maxtemp = data.main.temp_max - 273;
        const feels = data.main.feels_like - 273;
        const humidity = data.main.humidity;
        const main = data.weather[0].main;
        const wind = data.wind.speed + " m/s";
        let description = data.weather[0].description;

        // Update DOM with fetched data
        document.getElementById('finaltemp').textContent = Math.ceil(temp) + "°C";
        document.getElementById('d').textContent = main;
        document.getElementById('longdescription').textContent = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById('maxtemp').textContent = "Max Temp: " + Math.ceil(maxtemp) + "°C";
        document.getElementById('mintemp').textContent = "Min Temp: " + Math.floor(mintemp) + "°C";
        document.getElementById('feelslike').textContent = "Feels Like: " + Math.floor(feels) + "°C";
        document.getElementById('humidity').textContent = "Humidity: " + humidity + "%";
        document.getElementById('wind').textContent = "Wind Speed: " + wind;
        document.getElementById('cityname').textContent = city.charAt(0).toUpperCase() + city.slice(1);

        // Optional: Update background based on weather type
        if(main=="Thunderstorm")
            document.body.style.background = "url('https://static.vecteezy.com/system/resources/thumbnails/026/381/045/small_2x/thunder-sky-lights-clouds-generate-ai-photo.jpg')";
        if(main=="Fog")
            document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/505644134/photo/smoke-and-fog-background.jpg?s=612x612&w=0&k=20&c=jQ87m7BuZGIPxygbBO33NfOEJu6Lq_wF0s87johPKqs=')";
        if(main=="Mist")
            document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/06/86/21/92/360_F_686219293_oZYWOBpbwnXUBzratocdJhGnkH8RBgry.jpg')";
        if(main == "Drizzle")
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-heeakM9vBjQXphw1jrMM9X8l3zvex-j72w&s')";
        if(main=="Rain")
            document.body.style.background = "url('https://wallpapercat.com/w/full/9/5/0/18166-3840x2160-desktop-4k-rain-background-photo.jpg')";
        if(main=="Clear")
            document.body.style.backgroundImage = "url('https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?cs=srgb&dl=pexels-wdnet-96622.jpg&fm=jpg')";
        if(main=="Clouds")
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1535557597501-0fee0a500c57?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D')";
       

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

  

function updateTimeAndDate() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = (hours != 0) ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = hours + ':' + minutes;
    document.getElementById('time').innerText = timeString;
    document.getElementById('ampm').innerText = ampm;
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const dateString = day + ' ' + month;
    document.getElementById('date').textContent = dateString;
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 6000);
    getweather();
});