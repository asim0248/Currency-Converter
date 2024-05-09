//API URl
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
//Select Dropdown
const dropDowns = document.querySelectorAll(".dropdown select");
//Button to perform action 
const btn = document.querySelector('button');
//Form Select Tag
const fromCurrn = document.querySelector('.from select');
//To Select Tag
const toCurrn = document.querySelector('.to select');
//This message box when From and To is select, after conversion of rate then this show message
const message = document.querySelector('.msg')

//Getting country list and code from list.js
for (let select of dropDowns) {
    for (let currnCode in countryList) {
        let addOption = document.createElement("option");
        addOption.innerText = currnCode;
        addOption.value = currnCode;
        if (select.name === "from" && currnCode === "USD") {
            addOption.selected = "selected";
        } else if (select.name === "to" && currnCode === "PKR") {
            addOption.selected = "selected";
        }
        select.append(addOption);
    }
    select.addEventListener("change", (evt) => {
       updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currnCode = element.value;
    let countryCode = countryList[currnCode];
    let imgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = imgSrc;
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener('load', () => {
    updateExchangeRate();
});
const updateExchangeRate = async () => {
    //select the Amount Input
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    //I set that by default user can't add value in Minus, when add minus then it becomes 1
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    //For Error handling Ii use this try and catch
    try {
        // Fetch data for the source currency
        const fromURL = `${BASE_URL}/currencies/${fromCurrn.value.toLowerCase()}.json`;
        const fromResponse = await fetch(fromURL);
        //Here we convert the Api to json format
        const fromData = await fromResponse.json();

        // Extract exchange rates
        const fromRate = fromData[fromCurrn.value.toLowerCase()][toCurrn.value.toLowerCase()];

        let conversionRate = fromRate * amtVal;
        //Show message 
        message.innerText = `${amtVal}${fromCurrn.value} = ${conversionRate}${toCurrn.value}`;

    } catch (error) {
        console.error("Error fetching data from the API:", error);
    }
}