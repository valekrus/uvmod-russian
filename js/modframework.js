var showHidden = false;

class FirmwareMod {
  constructor(name, description, size) {
    this.name = name;
    this.description = description;
    this.size = size; // Additional flash usage in bytes
    this.enabled = false; // Checkbox status, initially disabled
    this.hidden = false; // If true, the mod will be hidden until activated in the instructions panel. Use this for risky mods. 
    this.modSpecificDiv = document.createElement("div"); // Div for mod-specific inputs
    // If needed, create input fields here and append them to the modSpecificDiv
  }

  apply(firmwareData) {
    // This method should be overridden in each mod implementation
    // It should apply the mod on the firmwareData and return the modified firmwareData
    return firmwareData;
  }
}

function addFWModToUI(mod, modDiv) {
  // Create a card div
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "border-left-primary", "border-left-secondary");
  if (mod.hidden) {
    card.classList.add("hiddenMod", "border-danger", "border-left-danger");
    if(! showHidden) {
        card.classList.add("d-none");
    }
  }

  // Create a card body div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create a row div
  const row = document.createElement("div");
  row.classList.add("row");

  // Create checkbox column
  const checkboxCol = document.createElement("div");
  checkboxCol.classList.add("col-auto");

  // Create checkbox for enabling the mod
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.height = "1.45rem"; 
  checkbox.style.width = "1.45rem"; 
  checkbox.checked = mod.enabled;
  checkbox.addEventListener("change", function () {
    mod.enabled = checkbox.checked;
    if (checkbox.checked) {
      card.classList.remove("border-left-secondary");
    } else {
      card.classList.add("border-left-secondary");
    }
  });
  checkboxCol.appendChild(checkbox);
  

  // Create name column
  const nameCol = document.createElement("div");
  nameCol.classList.add("col-auto", "mr-auto", "pl-1");
  if (mod.hidden) {
    nameCol.classList.add("text-danger");
  }

  const nameText = document.createElement("h5");
  nameText.textContent = mod.name;
  nameCol.appendChild(nameText);

  // Create size column
  const sizeCol = document.createElement("div");
  sizeCol.classList.add("col-auto");
  const sizeText = document.createElement("p");
  sizeText.textContent = "Flash usage: " + mod.size + " Bytes";
  sizeCol.appendChild(sizeText);

  // Add columns to the row
  row.appendChild(checkboxCol);
  row.appendChild(nameCol);
  row.appendChild(sizeCol);

    // Create description column
    const descCol = document.createElement("div");
    //descCol.classList.add("col");
  
    const descriptionText = document.createElement("p");
    descriptionText.textContent = mod.description;
    descCol.appendChild(descriptionText);

  // Add the mod-specific div for custom inputs
  cardBody.appendChild(row);
  cardBody.appendChild(descCol);
  cardBody.appendChild(mod.modSpecificDiv);


  // Add card body to the card div
  card.appendChild(cardBody);

  // Add the card to the modDiv
  modDiv.appendChild(card);
}


var FWModClasses = []; // Will be populated in mods.js
var FWModInstances = [];

function FWModLoader() {
  FWModClasses.forEach(FWModClass => {
    const FWModInstance = new FWModClass();
    FWModInstances.push(FWModInstance); // Add the instance to the array
    const FWModDiv = document.createElement("div");
    addFWModToUI(FWModInstance, FWModDiv);
    document.getElementById("modsContainer").appendChild(FWModDiv);
  });
  log("Patcher ready.");

  // for development purposes, add ?hidden to the url to always show hidden mods
  if (window.location.href.indexOf("?hidden") > -1) {
    showHiddenMods();
  }

  return FWModInstances; // Return the array of mod instances
}


function applyFWMods(firmware) {
  for (const FWModInstance of FWModInstances) {
    if (FWModInstance.enabled) {
      firmware = FWModInstance.apply(firmware);
    }
  }
  log("Finished applying mods...");
  return firmware;
}

class ConfigMod {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.enabled = false; // Checkbox status, initially disabled
    this.hidden = false; // If true, the mod will be hidden until activated in the instructions panel. Use this for risky mods. 
    this.error = false; // If true, the mod cannot be enabled, becouse it has errors, while loading current config data.
    this.modSpecificDiv = document.createElement("div"); // Div for mod-specific inputs
    // If needed, create input fields here and append them to the modSpecificDiv
  }

  apply(configData) {
    // This method should be overridden in each mod implementation
    // It should apply the mod on the configData and return the modified configData
    return configData;
  }

  load(configData) {
    // This method should be overridden in each mod implementation
    // It should load its settings, based on the configData
    // set this.error to true and return false if there was errors
    // while loading or return true if there was no erros.
    return true;
  }
}

function addConfigModToUI(mod, modDiv) {
  // Create a card div
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "border-left-primary", "border-left-secondary");
  if (mod.hidden) {
    card.classList.add("hiddenMod", "border-warning", "border-left-warning");
    if(! showHidden) {
        card.classList.add("d-none");
    }
  }

  // Create a card body div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create a row div
  const row = document.createElement("div");
  row.classList.add("row");

  // Create checkbox column
  const checkboxCol = document.createElement("div");
  checkboxCol.classList.add("col-auto");

  // Create checkbox for enabling the mod
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.height = "1.45rem"; 
  checkbox.style.width = "1.45rem";
  if (mod.error) {
    checkbox.disabled = true;
    checkbox.checked = false;
  } else {
    checkbox.checked = mod.enabled;
  
    checkbox.addEventListener("change", function () {
      mod.enabled = checkbox.checked;
      if (checkbox.checked) {
        card.classList.remove("border-left-secondary");
      } else {
        card.classList.add("border-left-secondary");
      }
    });
  }
  checkboxCol.appendChild(checkbox);
  

  // Create name column
  const nameCol = document.createElement("div");
  nameCol.classList.add("col-auto", "mr-auto", "pl-1");
  if (mod.error) {
    nameCol.classList.add("text-danger");
  } else if (mod.hidden) {
    nameCol.classList.add("text-warning");
  }

  const nameText = document.createElement("h5");
  nameText.textContent = mod.name;
  nameCol.appendChild(nameText);

  // Add columns to the row
  row.appendChild(checkboxCol);
  row.appendChild(nameCol);

    // Create description column
    const descCol = document.createElement("div");
    //descCol.classList.add("col");
  
    const descriptionText = document.createElement("p");
    descriptionText.textContent = mod.description;
    descCol.appendChild(descriptionText);

  // Add the mod-specific div for custom inputs
  cardBody.appendChild(row);
  cardBody.appendChild(descCol);
  cardBody.appendChild(mod.modSpecificDiv);


  // Add card body to the card div
  card.appendChild(cardBody);

  // Add the card to the modDiv
  modDiv.appendChild(card);
}


var ConfigModClasses = []; // Will be populated in mods.js
var ConfigModInstances = [];

function ConfigModLoader(configData) {
  ConfigModInstances = [];
  document.getElementById("configContainer").replaceChildren();

  ConfigModClasses.forEach(ConfigModClass => {
    const ConfigModInstance = new ConfigModClass();
    ConfigModInstances.push(ConfigModInstance); // Add the instance to the array
    ConfigModInstance.load(configData);
    const ConfigModDiv = document.createElement("div");
    addConfigModToUI(ConfigModInstance, ConfigModDiv);
    document.getElementById("configContainer").appendChild(ConfigModDiv);
  });
  log("Configuration data patcher ready.");

  // for development purposes, add ?hidden to the url to always show hidden mods
  if (window.location.href.indexOf("?hidden") > -1) {
    showHiddenMods();
  }

  return ConfigModInstances; // Return the array of mod instances
}


function applyConfigMods(configuration) {
  for (const ConfigModInstance of ConfigModInstances) {
    if (ConfigModInstance.enabled) {
      configuration = ConfigModInstance.apply(configuration);
    }
  }
  log("Finished applying configuration mods...");
  return configuration;
}

class CalibMod {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.enabled = false; // Checkbox status, initially disabled
    this.hidden = false; // If true, the mod will be hidden until activated in the instructions panel. Use this for risky mods. 
    this.error = false; // If true, the mod cannot be enabled, becouse it has errors, while loading current calibration data.
    this.modSpecificDiv = document.createElement("div"); // Div for mod-specific inputs
    // If needed, create input fields here and append them to the modSpecificDiv
  }

  apply(calibData) {
    // This method should be overridden in each mod implementation
    // It should apply the mod on the firmwareData and return the modified firmwareData
    return calibData;
  }

  load(calibData) {
    // This method should be overridden in each mod implementation
    // It should load its settings, based on the firmwareData
    // set this.error to true and return false if there was errors
    // while loading or return true if there was no erros.
    return true;
  }
}

function addCalibModToUI(mod, modDiv) {
  // Create a card div
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "border-left-primary", "border-left-secondary");
  if (mod.hidden) {
    card.classList.add("hiddenMod", "border-warning", "border-left-warning");
    if(! showHidden) {
        card.classList.add("d-none");
    }
  }

  // Create a card body div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create a row div
  const row = document.createElement("div");
  row.classList.add("row");

  // Create checkbox column
  const checkboxCol = document.createElement("div");
  checkboxCol.classList.add("col-auto");

  // Create checkbox for enabling the mod
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.height = "1.45rem"; 
  checkbox.style.width = "1.45rem";
  if (mod.error) {
    checkbox.disabled = true;
    checkbox.checked = false;
  } else {
    checkbox.checked = mod.enabled;
  
    checkbox.addEventListener("change", function () {
      mod.enabled = checkbox.checked;
      if (checkbox.checked) {
        card.classList.remove("border-left-secondary");
      } else {
        card.classList.add("border-left-secondary");
      }
    });
  }
  checkboxCol.appendChild(checkbox);
  

  // Create name column
  const nameCol = document.createElement("div");
  nameCol.classList.add("col-auto", "mr-auto", "pl-1");
  if (mod.error) {
    nameCol.classList.add("text-danger");
  } else if (mod.hidden) {
    nameCol.classList.add("text-warning");
  }

  const nameText = document.createElement("h5");
  nameText.textContent = mod.name;
  nameCol.appendChild(nameText);

  // Add columns to the row
  row.appendChild(checkboxCol);
  row.appendChild(nameCol);

    // Create description column
    const descCol = document.createElement("div");
    //descCol.classList.add("col");
  
    const descriptionText = document.createElement("p");
    descriptionText.textContent = mod.description;
    descCol.appendChild(descriptionText);

  // Add the mod-specific div for custom inputs
  cardBody.appendChild(row);
  cardBody.appendChild(descCol);
  cardBody.appendChild(mod.modSpecificDiv);


  // Add card body to the card div
  card.appendChild(cardBody);

  // Add the card to the modDiv
  modDiv.appendChild(card);
}


var CalibModClasses = []; // Will be populated in mods.js
var CalibModInstances = [];

function CalibModLoader(calibData) {
  CalibModInstances = [];
  document.getElementById("calibContainer").replaceChildren();

  CalibModClasses.forEach(CalibModClass => {
    const CalibModInstance = new CalibModClass();
    CalibModInstances.push(CalibModInstance); // Add the instance to the array
    CalibModInstance.load(calibData);
    const CalibModDiv = document.createElement("div");
    addCalibModToUI(CalibModInstance, CalibModDiv);
    document.getElementById("calibContainer").appendChild(CalibModDiv);
  });
  log("Calibration data patcher ready.");

  // for development purposes, add ?hidden to the url to always show hidden mods
  if (window.location.href.indexOf("?hidden") > -1) {
    showHiddenMods();
  }

  return CalibModInstances; // Return the array of mod instances
}


function applyCalibMods(calibration) {
  for (const CalibModInstance of CalibModInstances) {
    if (CalibModInstance.enabled) {
      calibration = CalibModInstance.apply(calibration);
    }
  }
  log("Finished applying calibration mods...");
  return calibration;
}

function log(message, replace = false) {
  const consoleArea = document.getElementById('console');

  if (replace) {
    // Replace the last line with the new message
    const lastLineIndex = consoleArea.value.lastIndexOf('\n');
    consoleArea.value = consoleArea.value.substring(0, lastLineIndex) + '\n' + message;
  } else {
  // Append the new message to the existing content and add a newline

  // If the console is empty, dont add a newline
  if (consoleArea.value.length === 0) {
    consoleArea.value = message;
  } else {

  consoleArea.value += '\n' + message;
  }
  }

  // Scroll to the bottom to show the latest message
  consoleArea.scrollTop = consoleArea.scrollHeight;
}

function showHiddenMods() {
  const hiddenMods = document.getElementsByClassName("hiddenMod");
  for (const mod of hiddenMods) {
    mod.classList.remove("d-none");
  }
  showHidden = true;
  log("Hidden mods shown. Please pay extra attention when using them.");
}


// Helper functions:

/**
 * Converts a hexadecimal string to a Uint8Array.
 * The input hex string should have the format "HH" where HH is a two-digit hexadecimal value. 
 * 
 * 0x or \x is not allowed
 * 
 * To output a python bytearray in the correct format, use this in python: print(''.join('%02x'%i for i in YOUR_BYTEARRAY))
 * @example hexString("0102AAFF") // Outputs Uint8Array of 1, 2, 170, 255
 * @param {string} hexString - The hexadecimal string to convert.
 * @returns {Uint8Array} The Uint8Array representing the converted data.
 */
function hexString(hexString) {
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    const byteValue = parseInt(hexString.substr(i * 2, 2), 16);
    byteArray[i] = byteValue;
  }
  return byteArray;
}

/**
 * Converts a Uint8Array to a hexadecimal string
 *
 * @param {Uint8Array} uint8Array - The Uint8Array to convert.
 * @returns {string} The hexadecimal representation of the Uint8Array without separators. 
 */
function uint8ArrayToHexString(uint8Array, separators = '') {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join(separators);
}


/**
 * Replaces or appends a section in the firmware data with new data at the specified offset.
 * To append data to the firmware, use firmwareData.length as the offset. 
 * @param {Uint8Array} firmwareData - The original firmware Uint8array.
 * @param {Uint8Array} newData - The new data to replace the section with.
 * @param {number} offset - The offset where the section should be replaced. 
 * @returns {Uint8Array} - The updated firmware data with the section replaced.
 */
function replaceSection(firmwareData, newData, offset) {
  const updatedFirmwareData = new Uint8Array(Math.max(firmwareData.length, offset + newData.length));

  updatedFirmwareData.set(firmwareData.subarray(0, offset));
  updatedFirmwareData.set(newData, offset);
  if (offset + newData.length < firmwareData.length) {
    updatedFirmwareData.set(firmwareData.subarray(offset + newData.length), offset + newData.length);
  }

  return updatedFirmwareData;
}

/**
 * Compares two Uint8Arrays to check if they are equal.
 * @param {Uint8Array} array1 - The first Uint8Array to compare.
 * @param {Uint8Array} array2 - The second Uint8Array to compare.
 * @returns {boolean} - True if the Uint8Arrays are equal, false otherwise.
 */
function compareUint8Arrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Compares a section of a Uint8Array with another Uint8Array.
 * @param {Uint8Array} array - The Uint8Array to compare a section from.
 * @param {Uint8Array} section - The Uint8Array representing the section to compare.
 * @param {number} offset - The offset within the main array to start the comparison.
 * @returns {boolean} - True if the section matches the part of the main array starting from the offset, false otherwise.
 */
function compareSection(array, section, offset) {
  if (offset < 0 || offset + section.length > array.length) {
    throw new Error("Offset is out of bounds.");
  }

  const slicedArray = array.slice(offset, offset + section.length);
  return compareUint8Arrays(slicedArray, section);
}

/**
 * Converts 8pix height bitmap with font divided by halves to 16-bit font bitmap.
 * @param {Uint8Array} fontData - The Uint8Array of initial font data.
 * @param {number} symbWidth - The width of the symbol within the font.
 * @returns {Uint16Array} - Coverted font data.
 */
function font8to16(fontData, symbWidth) {
    let fontConv = new Uint16Array(fontData.length / 2);
	let fontConvView = new DataView(fontConv.buffer);
	let j = 0;
    for (let s = 0; s < parseInt(fontData.length/(symbWidth * 2)); s++) {
        const symbOffset = s * symbWidth * 2;
        for (let i = 0; i < symbWidth; i++) {
            fontConvView.setUint8(j++, fontData[symbOffset+i]);
			fontConvView.setUint8(j++, fontData[symbOffset+i+symbWidth]);
        }
    }
    return fontConv;
}

/**
 * Draws font data as image on the canvas.
 * @param {HTMLElement} previewCanvas - Canvas for the image.
 * @param {Uint8Array, Uint16Array} fontData - the data of the font.
 * @returns {ImageData} - Image data.
 */
function drawFont(previewCanvas, fontData) {
    const ctx = previewCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);
	
    for (let x = 0; x < previewCanvas.width; x++) {
        
        for (let y = 0; y < previewCanvas.height; y++) {
            const index = y * previewCanvas.width + x;
            const i = index * 4;
            let pixel = 0;
	
            pixel = !((fontData[x] & (1 << y)) != 0);
	
            imageData.data[i] = pixel * 255;
            imageData.data[i + 1] = pixel * 255;
            imageData.data[i + 2] = pixel * 255;
            imageData.data[i + 3] = 255;
        }
    }
	
    ctx.putImageData(imageData, 0, 0);
    return imageData;
}

/**
 * Adds an input field to a parent div with a label and default text.
 *
 * @param {HTMLElement} parentDiv - The parent div to which the input field will be added. Usually this.modSpecificDiv
 * @param [{string},{string}] labelText - The array with label text (title) for the left and right label.
 * @param {string} defaultText - The default text to pre-fill the input field with.
 * @returns {HTMLInputElement} - The created input element, assign it to a constant for later use. 
 */
function addInputField(parentDiv, labelText, defaultValue) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");

  if (labelText[0] != null) {
    const inputGroupPre = document.createElement("div");
    inputGroupPre.classList.add("input-group-prepend");

    const labell = document.createElement("span");
    labell.classList.add("input-group-text");
    labell.innerText = labelText[0];
    inputGroupPre.appendChild(labell);
    inputGroup.appendChild(inputGroupPre);
  }

  const input = document.createElement("input");
  input.classList.add("form-control");
  input.type = "text";
  input.value = defaultValue; // Set the default value
  inputGroup.appendChild(input);

  if (labelText[1] != null) {
    const inputGroupApp = document.createElement("div");
    inputGroupApp.classList.add("input-group-append");

    const labelr = document.createElement("span");
    labelr.classList.add("input-group-text");
    labelr.innerText = labelText[1];
    inputGroupApp.appendChild(labelr);
    inputGroup.appendChild(inputGroupApp);
  }

  parentDiv.appendChild(inputGroup);

  return input; // Return the input element
}

/**
 * Adds a radio input field to a parent div with an id, name, value and label.
 *
 * @param {HTMLElement} parentDiv - The parent div to which the input field will be added. Usually this.modSpecificDiv
 * @param {string} labelText - The label text (title) for the input field.
 * @param {string} id - The id is needed to link radio button and label, choose any unique id. 
 * @param {string} name - The name of the radio button needs to be the same for all radio buttons in a mutually exclusive group. 
 * @returns {HTMLInputElement} - The created input element, assign it to a constant for later use. 
 */
function addRadioButton(parentDiv, labelText, id, name) {
  const formCheckDiv = document.createElement("div");
  formCheckDiv.classList.add("form-check", "mt-2");

  const inputElement = document.createElement("input");
  inputElement.classList.add("form-check-input");
  inputElement.type = "radio";
  inputElement.name = name;
  inputElement.id = id;

  const labelElement = document.createElement("label");
  labelElement.classList.add("form-check-label");
  labelElement.htmlFor = id;
  labelElement.textContent = labelText;

  formCheckDiv.appendChild(inputElement);
  formCheckDiv.appendChild(labelElement);

  parentDiv.appendChild(formCheckDiv);

  return inputElement;
}

/**
 * Adds two input fields to a parent div with an inline label and default text.
 *
 * @param {HTMLElement} parentDiv - The parent div to which the input field will be added. Usually this.modSpecificDiv
 * @param [{string},{string},{string}] labelText - The array with label text (title) for the left, center and right label.
 * @param {string} defaultText1 - The default text to pre-fill the first input field with.
 * @param {string} defaultText2 - The default text to pre-fill the second input field with.
 * @returns [{HTMLInputElement}, {HTMLInputElement}] - The array of created input elements, assign it to a constant for later use.
 */
function addTwoInputFields(parentDiv, labelText, defaultValue1, defaultValue2) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");

  if (labelText[0] != null) {
    const inputGroupPre = document.createElement("div");
    inputGroupPre.classList.add("input-group-prepend");

    const labell = document.createElement("span");
    labell.classList.add("input-group-text");
    labell.innerText = labelText[0];
    inputGroupPre.appendChild(labell);
    inputGroup.appendChild(inputGroupPre);
  }

  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  input1.type = "text";
  input1.value = defaultValue1; // Set the default value for first element
  inputGroup.appendChild(input1);

  if (labelText[1] != null) {
    const inputGroupMid = document.createElement("div");
    inputGroupMid.classList.add("input-group-prepend", "input-group-append");

    const labelc = document.createElement("span");
    labelc.classList.add("input-group-text");
    labelc.innerText = labelText[1];
    inputGroupMid.appendChild(labelc);
    inputGroup.appendChild(inputGroupMid);
  }


  const input2 = document.createElement("input");
  input2.classList.add("form-control");
  input2.type = "text";
  input2.value = defaultValue2; // Set the default value for second element
  inputGroup.appendChild(input2);

  if (labelText[2] != null) {
    const inputGroupApp = document.createElement("div");
    inputGroupApp.classList.add("input-group-append");

    const labelr = document.createElement("span");
    labelr.classList.add("input-group-text");
    labelr.innerText = labelText[2];
    inputGroupApp.appendChild(labelr);
    inputGroup.appendChild(inputGroupApp);
  }

  parentDiv.appendChild(inputGroup);

  return [input1, input2]; // Return the input element
}
