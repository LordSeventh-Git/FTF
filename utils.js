let finalSelects = document.getElementsByClassName("finalSelect");
let selects = document.querySelectorAll(".finalSelect select");

function getCitiesFromRegion(region) {
  return cities
    .filter((city) => city.region === region)
    .map((city) => city.name);
}

function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

function selectRandomly(array) {
  return array[getRandomNumber(array.length)];
}

function removeFromArray(array, item) {
  return array.filter((element) => element.name != item.name);
}

function getRandomCities() {
  if (
    remainingCities.length === 0 ||
    remainingCities.length === 1 ||
    remainingCities.length === cities.length
  ) {
    remainingCities = cities;
  }

  let city1 = selectRandomly(remainingCities);
  let city2 = selectRandomly(remainingCities);

  if (city1.region === city2.region) {
    console.log("Here");
    getRandomCities();
  }

  console.log(remainingCities);

  remainingCities = removeFromArray(remainingCities, city1);
  remainingCities = removeFromArray(remainingCities, city2);

  return [city1, city2].map((city) => city.name);
}

function toggleDisplay(element, display) {
  element.style.display = display;
}

function toggleRegions(elements, display) {
  for (let i = 0; i < elements.length; i++) {
    toggleDisplay(elements[i], display);
  }
}

function setGameType() {
  if (gameType.value === "final") {
    toggleRegions(finalSelects, "flex");
    setRegions(selects);
  } else {
    toggleRegions(finalSelects, "none");
  }
}

function setRegions(elements) {
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < regions.length; j++) {
      elements[
        i
      ].innerHTML += `<option value=${regions[j]}>${regions[j]}</option>`;
    }
  }
}

function getValues(elements) {
  let values = [];
  for (let i = 0; i < elements.length; i++) {
    values.push(elements[i].value);
  }
  return values;
}

function getFinalsCities() {
  return getValues(selects)
    .map((region) => getCitiesFromRegion(region))
    .map((cities) => selectRandomly(cities));
}

function setOutput(id, cities) {
  document.getElementById(id).innerHTML += `<div class="item">
    <div>City 1: <b>${cities[0]}</b></div>
    <div>City 2: <b>${cities[1]}</b></div>
  </div>`;
}

function handleGenerateButton() {
  if (gameType.value === "final") {
    setOutput("output_final", getFinalsCities());
  } else {
    setOutput("output_playoff", getRandomCities());
  }
}

function handleResetButton() {
  const outputs = document.getElementsByClassName("item");
  for (let i = 0; i < outputs.length; i++) {
    outputs[i].remove();
  }
}
