# Weather App

A simple web application to display the current weather conditions for any city. The app allows users to input a city name, fetches weather data using the OpenWeather API, and displays the weather details like temperature, humidity, wind speed, and more.

## Features

- Displays the current weather based on the city entered.
- Shows temperature, humidity, wind speed, and weather description.
- Changes background based on the weather condition (Clear, Cloudy, etc.).

## Technologies Used

- **HTML**: Structure of the webpage.
- **CSS**: Styling the webpage.
- **JavaScript**: Fetching weather data and updating the DOM.
- **Node.js**: Backend to handle weather API requests.
- **OpenWeather API**: Provides real-time weather data.

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in a browser.
3. Enter a city name in the search input field (e.g., Bangalore, New York).
4. Press "Enter" or wait for the weather data to load.
5. The weather data for the entered city will be displayed on the page.

## Getting Started

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository to your local machine.
3. Navigate to the project directory in the terminal.
4. Install the required dependencies using:

    ```bash
    npm install
    ```

5. Run the app with:

    ```bash
    node app.js
    ```

6. Open `index.html` in a web browser to view the app.

## What I Learned

- How to work with APIs (specifically OpenWeather API) to fetch weather data.
- How to handle asynchronous requests using `fetch()` and `async/await` in JavaScript.
- Manipulating the DOM dynamically to update content based on the API response.
- Using basic HTML and CSS to create a user interface.
- Debugging JavaScript code by inspecting the console and checking the network requests.