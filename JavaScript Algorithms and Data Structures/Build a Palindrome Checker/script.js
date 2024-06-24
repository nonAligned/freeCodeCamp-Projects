const checkButton = document.getElementById("check-btn");
const userInput = document.getElementById("text-input");
const resultEl = document.getElementById("result");

const checkPalindrome = (textInput) => {
  let isPalindrome;
  const cleanedString = cleanString(textInput);

  if (cleanedString === cleanedString.split("").reverse().join("")) {
    isPalindrome = true;
  } else {
    isPalindrome = false;
  };

  return isPalindrome;
};

const cleanString = (string) => {
  return string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

checkButton.addEventListener("click", () => {
  if (userInput.value.length === 0) {
    window.alert("Please input a value");
    if (!resultEl.classList.contains("hidden")) {
      resultEl.classList.add("hidden");
    }
    return;
  };

  if (checkPalindrome(userInput.value)) {
    resultEl.children[0].innerHTML = `<span class="emphasized">${userInput.value}</span> is a palindrome`;
  } else {
    resultEl.children[0].innerHTML = `<span class="emphasized">${userInput.value}</span> is not a palindrome`;
  };

  if (resultEl.classList.contains("hidden")) {
    resultEl.classList.remove("hidden");
  }
});