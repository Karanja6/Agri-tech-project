document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const farmersId = document.getElementById('farmers_id').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ farmers_id: farmersId, password: password }),
                });

                const data = await response.json();
                if (response.ok) {
                    window.location.href = "/home.html"; 
                } else {
                    alert(`Login failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('Server error. Please try again later.');
            }
        });
    }

    const registerForm = document.getElementById('signup_form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const farmers_id = formData.get('farmers_id');
            const fullName = formData.get('name');
            const contact = formData.get('contact');
            const land_size = formData.get('land_size');
            const soil_type = formData.get('soil_type');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm_password');
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        farmers_id, fullName, contact, land_size, soil_type, password, confirmPassword
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    window.location.href = "/home.html"; 
                } else {
                    alert(`Registration failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Registration failed:', error);
                alert('Registration failed due to an error.');
            }
        });
    }
    const cropProcessForm = document.getElementById('crop_process');
    if (cropProcessForm) {
        cropProcessForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(cropProcessForm);
            const farmers_id = formData.get('farmers_id');
            const crop = formData.get('crop');
            const process_type = formData.get('process_type');
            const process_date = formData.get('process_date');

            try {
                const response = await fetch('http://localhost:3000/api/Evaluation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        farmers_id, crop, process_type, process_date
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Crop process saved successfully!');
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error saving crop process:', error);
                alert('Error saving crop process. Please try again.');
            }
        });
    }
const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(feedbackForm);
            const status = formData.get('status');

            const response = await fetch('http://localhost:3000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();
            alert(data.message);
        });
    }
    const apiKey = 'e303728999f9d4a7a5ced20c22f4b71e';
    const fetchWeather = async (location) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather information not available');
            }
            const weatherData = await response.json();
            console.log(weatherData);
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather:', error);
            displayErrorMessage();
        }
    };
function displayWeather(data) {
        if (data) {
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const cloudCoverage = data.clouds.all;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;

            console.log(`Temperature: ${temperature} °C`);
            console.log(`Wind Speed: ${windSpeed} m/s`);
            console.log(`Cloud Coverage: ${cloudCoverage} %`);
            console.log(`Pressure: ${pressure} hPa`);

            const temperatureElement = document.getElementById('temperature');
            if (temperatureElement) {
                temperatureElement.innerText = `Temperature: ${temperature} °C`;
            } else {
                console.error('Temperature element not found');
            }

            const windElement = document.getElementById('wind');
            if (windElement) {
                windElement.innerText = `Wind Speed: ${windSpeed} m/s`;
            }

            const cloudsElement = document.getElementById('clouds');
            if (cloudsElement) {
                cloudsElement.innerText = `Cloud Coverage: ${cloudCoverage} %`;
            }

            const pressureElement = document.getElementById('pressure');
            if (pressureElement) {
                pressureElement.innerText = `Pressure: ${pressure} hPa`;
            }

            const crops = recommendCrops(temperature, humidity, windSpeed);
            displayRecommendedCrops(crops);
            showRecommendationContainer(); 
        } else {
            console.error('Weather data is missing:', data);
        }
    }

    const displayErrorMessage = () => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.textContent = 'Weather information not available. Please try again later.';
    };

    const showRecommendationContainer = () => {
        const recommendationContainer = document.querySelector('.recommendation-container');
        recommendationContainer.style.display = 'block'; 
    };

    const recommendCrops = (temperature, humidity, windSpeed) => {
        if (temperature <= 10 && humidity >= 70 && windSpeed < 5) {
            return ['Cabbage', 'Broccoli', 'Spinach'];
        } else if (temperature > 10 && temperature < 15 && humidity >= 60 && windSpeed < 6) {
            return ['Tomatoes', 'Beans', 'Peas'];
        } else if (temperature >= 15 && temperature < 20 && humidity >= 50 && windSpeed < 6) {
            return ['Broccoli', 'Lettuce', 'Peas', 'Spinach', 'Cabbage'];
        } else if (temperature >= 20 && temperature < 25 && humidity >= 45 && windSpeed < 7) {
            return ['Sorghum', 'Millet', 'Watermelon', 'Okra', 'Sweet Potatoes'];
        } else if (temperature >= 25 && temperature < 30 && humidity >= 40 && windSpeed < 8) {
            return ['Maize', 'Soy Beans', 'Tomatoes', 'Eggplant', 'Cucumbers', 'Peppers'];
        } else if (temperature >= 30 && temperature < 35 && humidity >= 35 && windSpeed < 9) {
            return ['Cotton', 'Peanuts', 'Pumpkin', 'Sunflower'];
        } else if (temperature >= 35 && humidity >= 30 && windSpeed < 10) {
            return ['Sesame', 'Coconut', 'Sesbania'];
        } else {
            return ['No specific recommendations for this weather condition'];
        }
    };

    const displayRecommendedCrops = (crops) => {
        const cropList = document.getElementById('cropList');
        cropList.innerHTML = '';

        crops.forEach(crop => {
            const cropItem = document.createElement('li');
            cropItem.textContent = crop;
            cropList.appendChild(cropItem);
        });
    };
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    if (fetchWeatherBtn) {
        fetchWeatherBtn.addEventListener('click', function () {
            const locationInput = document.getElementById('location');
            if (locationInput && locationInput.value) {
                fetchWeather(locationInput.value);
            } else {
                alert('Please enter a city name.');
            }
        });
    }
});
