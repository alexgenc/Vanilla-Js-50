const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the dom
function calculate() {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`).then(res => res.json()).then(data => {
    const rate = data.rates[currency2];

    rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`

    amountTwo.value = (amountOne.value * rate).toFixed(4);
  })
}


// Event listeners

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);


swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
})
// On Load
calculate()