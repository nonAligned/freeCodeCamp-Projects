const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const isNumberValid = phoneNumber => {
  const usPhoneNumRegex = /^1?\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

  if (!phoneNumber) {
    alert("Please provide a phone number");
    return;
  }
  
  const paragraph = document.createElement("p");
  paragraph.className = "result";

  if(usPhoneNumRegex.test(phoneNumber)) {
    paragraph.appendChild(document.createTextNode(`Valid US number: ${phoneNumber}`));
    paragraph.classList.add("result-valid");
  } else {
    paragraph.appendChild(document.createTextNode(`Invalid US number: ${phoneNumber}`));
    paragraph.classList.add("result-invalid");
  }

  resultsDiv.appendChild(paragraph);
}

const resetUserInput = () => {
  userInput.value = "";
}

const resetResultsDiv = () => {
  resultsDiv.innerHTML = "";
}

checkBtn.addEventListener("click", () => {
  isNumberValid(userInput.value);
  resetUserInput();
});

clearBtn.addEventListener("click", () => {
  resetResultsDiv();
});