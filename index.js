document.write(`
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #222;
            font-family: 'Open Sans', sans-serif;
            background-image: url('https://source.unsplash.com/1600x900/?landscape');
            font-size: 120%;
        }

        .card {
            background: #000000d0;
            color: whitesmoke;
            padding: 2em;
            border-radius: 30px;
            width: 100%;
            max-width: 420px;
            margin: 1em;
        }

        .search {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        button {
            margin: 1.7em;
            border-radius: 50%;
            border: none;
            height: 45px;
            width: 45px;
            outline: none;
            background: #7c7c7c2b;
            color: whitesmoke;
            cursor: pointer;
            transition: 0.2s ease-in-out;
        }

        input.searchbar {
            border: none;
            outline: none;
            padding: 0.4em 1em;
            border-radius: 24px;
            background: #7c7c7c2b;
            color: whitesmoke;
            font-family: inherit;
            font-size: 105%;
            width: calc(100% - 100px);
        }

        button:hover {
            background: white;
            color: black;
        }

        h1.temp {
            margin: 0;
            margin-bottom: 0.4em;
        }

        .flex {
            display: flex;
            align-items: center;
        }

        .description {
            text-transform: capitalize;
            margin-left: 8px;
        }

        .weather.loading {
            visibility: hidden;
            max-height: 20px;
            position: relative;
        }

        .weather.loading:after{
            visibility: visible;
            content: "Loading....";
            color: white;
            position: absolute;
            top: 0;
            left: 20px;
        }

        .card:hover {
            box-shadow: 5px 5px 5px #00000056;
        }

        .searchbar:hover {
            transform: scale(1.07);
        }
    </style>
    <body>
        <div class="card">
            <div class="search">
                <input type="text" class="searchbar" placeholder="Search">
                <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button>
            </div>
            <div class="weather loading">
                <h2 class="city">Weather in Kerala</h2>
                <h1 class="temp">45°C</h1>
                <div class="flex">
                    <img src="https://openweathermap.org/img/wn/02n.png" class="icon"></img>
                    <div class="description">Cloudy</div>
                </div>
                <div class="humidity">Humidity: 60%</div>
                <div class="wind">Wind speed: 6.2 km/h</div>
            </div>
        </div>
    </body>
`);

let weather = {
    fetchWeather : function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2505b29b62b6f1f3b005a797918852ee`)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    /**
     *
     * @param {*} data 
     * data from weather
     */
    displayWeather: function(data) {
        console.log(data);
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    /**
     * search for weather
     * send Place from searchbar to fetchweather function
     */
    search : function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

// default
weather.fetchWeather("kerala");