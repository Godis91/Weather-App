const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

//update UI function
const updateUI = data => {
  const { cityDtls, weather } = data;

  details.innerHTML = `
          <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDtls.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
          </div>
  `;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  //update night and day icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //set Images based on time of the day

  let timesrc = weather.IsDayTime ? "/img/day.svg" : "/img/night.svg";
  time.setAttribute("src", timesrc);
};

//create an update city function to update city on the UI
const updateCity = async city => {
  const cityDtls = await getCity(city);
  const weather = await getWeather(cityDtls.Key);

  return {
    cityDtls,
    weather
  };
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const city = form.city.value.trim();
  form.reset();

  //update city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
  //store city in localstorage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => err => console.log(err));
}
