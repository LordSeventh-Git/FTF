let gameType = document.getElementById("gameType");
let finalSelects = document.getElementsByClassName("finalSelect");
let selects = document.querySelectorAll(".finalSelect select");

// Persist regions to local storage
localStorage.setItem("regions", JSON.stringify(regions));

gameType.addEventListener("click", setGameType);

document
  .getElementById("generateButton")
  .addEventListener("click", handleGenerateButton);

document
  .getElementById("resetButton")
  .addEventListener("click", handleResetButton);

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
    setOutput("output_final", getFinalsCities(regions, selects));
  } else {
    setOutput(
      "output_playoff",
      getRandomCities(localStorage.getItem("regions"), remainingRegions)
    );
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
