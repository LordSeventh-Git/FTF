/**
 * Gets a region's cities
 * @param {Array} regions The list of regions
 * @param {string} region The region's cities to get
 * @returns {Array.<string>} The cities of the region region
 */
function getCitiesFromRegion(regions, region) {
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
 * @param {Array} remainingRegions The remaining regions
 * @param {string} regionsFromStorage The regions taken from local storage
 * @returns The remaining regions
 */
function getRemainingRegions(remainingRegions, regionsFromStorage) {
  // If remaining regions is empty or contains just one region available
  // Get regions from local storage
  if (remainingRegions.length === 0 || remainingRegions.length === 1) {
    return JSON.parse(regionsFromStorage);
  }

  // Otherwise return remaining regions
  return remainingRegions;
}

/**
 * Returns random cities in different regions
 * @param {string} regionsFromStorage The regions taken from local storage
 * @param {Array} currentRegions The remaining regions
 * @returns {Array.<string>} Random cities
 */
function getRandomCities(regionsFromStorage, currentRegions) {
  currentRegions = getRemainingRegions(currentRegions, regionsFromStorage);

  // Gets random regions
  let chosenRegions = Array(2)
    .fill(undefined)
    .map(() => selectRandomly(currentRegions));

  // If regions are the same, restart the function
  if (chosenRegions[0].name === chosenRegions[1].name) {
    return getRandomCities(regionsFromStorage, remainingRegions);
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
 * Returns an array of two random cities according to the provided regions
 * @param {Array} regions The list of regions
 * @param {HTMLCollection} elements The elements that provide selected regions values
 * @returns {Array.<string>} An array of random cities
 */
function getFinalsCities(regions, elements) {
  return getValues(elements)
    .map((region) => getCitiesFromRegion(regions, region))
    .map((cities) => selectRandomly(cities));
}
