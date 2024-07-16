let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const priceDisplay = document.getElementById("price-display");
const changeDisplay = document.getElementById("change-display");
const changeDueDisplay = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const updateDisplay = () => {
  const currencyUnitNames = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  }

  cash.value = "";
  priceDisplay.textContent = `Total: $${price}`;
  changeDisplay.innerHTML = `<p class="bold">Change in drawer:</p>
    ${cid.map(el => `<p>${currencyUnitNames[el[0]]}: $${el[1]}</p>`).join("")}`;
}

const calculateChange = () => {
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    changeDueDisplay.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let changeDue = Number(cash.value) - price;
  let totalCashAvailable = parseFloat(
    cid
      .map(total => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );
  let denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
  let result = [];
  let status = "OPEN";
  
  if (totalCashAvailable < changeDue) {
    changeDueDisplay.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (totalCashAvailable === changeDue) {
    status = "CLOSED";
  }

  for (let i = cid.length-1; i>-1; i--) {
    if (changeDue >= denominations[i] && changeDue > 0) {
      let multiplier = 0
      let available = cid[i][1];

      while(available > 0 && changeDue >= denominations[i]) {
        available -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        multiplier++;
      }
      if (multiplier > 0) {
        result.push([cid[i][0], multiplier * denominations[i]]);
      }
    }
  }

  if(changeDue > 0) {
    changeDueDisplay.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  } else {
    changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;
    result.map(money => (changeDueDisplay.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );
  }

  updateCid(result);
  updateDisplay();
}

const updateCid = (change) => {
  change.forEach(changeArr => {
    const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
    targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
  });
}

const calculateResults = () => {
  if (!cash.value) {
    alert ("Please enter cash recieved from the customer!");
    return;
  }

  calculateChange();
}

purchaseBtn.addEventListener('click', calculateResults);

window.addEventListener("load", () => {
  updateDisplay();
});