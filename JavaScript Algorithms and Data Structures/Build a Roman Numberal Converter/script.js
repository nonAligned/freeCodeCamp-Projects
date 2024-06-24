const inputElement = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputElement = document.getElementById("output");

const rules = {
    "M": 1000,
		"CM": 900,
		"D": 500,
		"CD": 400,
		"C": 100,
		"XC": 90,
		"L": 50,
		"XL": 40,
		"X": 10,
		"IX": 9,
		"V": 5,
		"IV": 4,
		"I": 1
};

const convertArabicToRoman = (inputNumber) => {
	let result = "";
	const romans = Object.keys(rules);

	for (const roman of romans) {
		const romanValue = rules[roman];

		while (inputNumber >= romanValue) {
			inputNumber -= romanValue;
			result += roman;
		}
	}

	return result;
};

const validateInput = (number) => {
	if (isNaN(number)) {
    outputElement.textContent = "Please enter a valid number";
    outputElement.classList.remove("hidden");
		return false;
  };

	if (number < 0) {
		outputElement.textContent = "Please enter a number greater than or equal to 1";
    outputElement.classList.remove("hidden");
		return false;
	};

	if (number >= 4000) {
		outputElement.textContent = "Please enter a number less than or equal to 3999";
    outputElement.classList.remove("hidden");
		return false;
	};

	return true;
};

convertButton.addEventListener("click", () => {
  const intInputNumber = parseInt(inputElement.value);

  if (!validateInput(intInputNumber)) {
		return;
	} else {
		outputElement.textContent = convertArabicToRoman(intInputNumber);
		outputElement.classList.remove("hidden");
	}

});