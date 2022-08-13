let finalSelects = document.getElementsByClassName("finalSelect");
let selects = document.querySelectorAll(".finalSelect select");

// Persist regions to local storage
localStorage.setItem("regions", JSON.stringify(regions));

/**
 * Gets a region's cities
 * @param {string} region The region's cities to get
 * @returns {Array.<string>} The cities of the region region
 */
function getCitiesFromRegion(region) {
  return regions.filter((reg) => reg.name === region)[0].cities;
}

/**
 * Returns a random number
 * @param {number} maximum The maximum exclusive number to generate
 * @returns {number} The generated number
 */
function getRandomNumber(maximum) {
  return Math.floor(Math.random() * maximum);
}

/**
 * Gets a random selection from an array
 * @param {Array} array The array in which to randomly select
 * @returns {any} The selected item in the array
 */
function selectRandomly(array) {
  return array[getRandomNumber(array.length)];
}

/**
 * Removes from array
 * @param {Array} array The array in which to remove from
 * @param {any} item The item to remove
 * @returns {Array} The new array after item removal
 */
function removeFromArray(array, item) {
  return array.filter((element) => element != item);
}

/**
 * Gets the remaining regions in which to randomly select
 * @returns The remaining regions
 */
function getRemainingRegions() {
  // If remaining regions is empty or contains just one region available
  // Get regions from local storage
  if (remainingRegions.length === 0 || remainingRegions.length === 1) {
    return JSON.parse(localStorage.getItem("regions"));
  }

  // Otherwise return remaining regions
  return remainingRegions;
}

/**
 * Returns random cities in different regions
 * @returns {Array.<string>} Random cities
 */
function getRandomCities() {
  let currentRegions = getRemainingRegions();

  // Gets random regions
  let chosenRegions = Array(2)
    .fill(undefined)
    .map(() => selectRandomly(currentRegions));

  // If regions are the same, restart the function
  if (chosenRegions[0].name === chosenRegions[1].name) {
    return getRandomCities();
  }

  // Get random cities
  let chosenCities = chosenRegions.map((reg) => selectRandomly(reg.cities));

  // First remove already played cities in remaining regions
  // Second remove region where all cities have been chosen already
  remainingRegions = currentRegions
    .map((reg) => {
      for (let i = 0; i < chosenRegions.length; i++) {
        if (reg.name === chosenRegions[i].name) {
          reg.cities = removeFromArray(reg.cities, chosenCities[i]);
          return reg;
        }
      }
      return reg;
    })
    .filter((reg) => reg.cities.length !== 0);

  return chosenCities;
}

/**
 * Toggle the display of and HTML element
 * @param {HTMLElement} element The HTML element's display to change
 * @param {string} display The new display
 */
function toggleDisplay(element, display) {
  element.style.display = display;
}

/**
 * Toggles Regions display
 * @param {HTMLCollection} elements The elements display to change
 * @param {string} display The new display
 */
function toggleRegions(elements, display) {
  for (let i = 0; i < elements.length; i++) {
    toggleDisplay(elements[i], display);
  }
}

/**
 * Sets game type. Playoff or final
 */
function setGameType() {
  if (gameType.value === "final") {
    toggleRegions(finalSelects, "flex");
    setRegions(selects);
  } else {
    toggleRegions(finalSelects, "none");
  }
}

/**
 * Displays the regions to the user to select
 * @param {HTMLCollection} elements The elements in which to display the regions
 */
function setRegions(elements) {
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < regions.length; j++) {
      elements[
        i
      ].innerHTML += `<option value=${regions[j].name}>${regions[j].name}</option>`;
    }
  }
}

/**
 * Gets selected regions values
 * @param {HTMLCollection} elements The elements that provide selected regions values
 * @returns {Array.<string>} The selected regions
 */
function getValues(elements) {
  let values = [];
  for (let i = 0; i < elements.length; i++) {
    values.push(elements[i].value);
  }
  return values;
}

/**
 * Return an array of two random cities according to the provided regions
 * @returns {Array.<string>} An array of random cities
 */
function getFinalsCities() {
  return getValues(selects)
    .map((region) => getCitiesFromRegion(region))
    .map((cities) => selectRandomly(cities));
}

/**
 * Displays the playoffs
 * @param {string} id The id of the HTML tag in which to display
 * @param {Array.<string>} cities The cities to display
 */
function setOutput(id, cities) {
  document.getElementById(id).innerHTML += `<div class="item">
    <div>City 1: <b>${cities[0]}</b></div>
    <div>City 2: <b>${cities[1]}</b></div>
  </div>`;
}

/**
 * Handles the generate button onclick event
 */
function handleGenerateButton() {
  if (gameType.value === "final") {
    setOutput("output_final", getFinalsCities());
  } else {
    setOutput("output_playoff", getRandomCities());
  }
}

/**
 * Handles the reset button onclick event
 */
function handleResetButton() {
  document.getElementById(
    "output_playoff"
  ).innerHTML = `<div class="game title">Kpessekou</div>`;
  document.getElementById(
    "output_final"
  ).innerHTML = `<div class="game title">Zobibi</div>`;
}
