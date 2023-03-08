let search = document.querySelector(".search");
let searchIcon = document.querySelector(".search__icon");
let searchInput = document.querySelector(".search__input");
let searchClose = document.querySelector(".search__close");

searchIcon.addEventListener("click", () => {
    search.classList.add("search-open");
    searchInput.focus();
  });
  
  searchClose.addEventListener("click", () => {
    search.classList.remove("search-open");
    //clear search field on close
    searchInput.value = "";
  });
  

  //Weather API
  
  let weather = {
    apiKey: config.API_KEY,
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed, } = data.wind;
      const { all } = data.clouds;
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = humidity;
      document.querySelector(".wind").innerText = speed;
      document.querySelector(".clouds").innerText = all;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
    
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
        search.classList.remove("search-open");
        searchInput.value = "";
      }
    });
  
  weather.fetchWeather("Denver");