const key = "fAADnTlCtH3pWQ9chtsuxpRHBSjxAbQZ";

//Get Weather of a location: Note we need a location key
const getWeather = async locKey => {
  const baseURI = `https://dataservice.accuweather.com/currentconditions/v1/${locKey}`;
  const query = `?apikey=${key}`;

  const response = await fetch(baseURI + query);
  const data = await response.json();

  return data[0];
};

//Get city
const getCity = async city => {
  const baseURI = `https://dataservice.accuweather.com/locations/v1/cities/search`;
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(baseURI + query);
  const data = await response.json();

  return data[0];
};
