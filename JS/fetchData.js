const API_KEY = "3f4bbc7fd68ddceeb2cf6791";

const StdEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const PairEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/GBP`;

const conversion_btn = document.getElementById("conversion_btn");
const amountInput = document.getElementById("amountInput");
const base_select = document.querySelector("#base-select");
const target_select = document.querySelector("#target-select");
const conversionResult = document.querySelector("#conversion-result")
const conversionRate = document.querySelector("#conversion-rate")

let base_label = "From";
let target_label = "To";

const baseLabel = document.querySelector("#base-label")
const targetLabel = document.querySelector("#target-label")

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await fetch(`${StdEndPoint}/latest/PKR`)
        let data = await response.json();
        // console.log(data);
        console.log(Object.keys(data?.conversion_rates));
        const currCodes = Object.keys(data?.conversion_rates);
        currCodes.map(cod => {
            base_select.innerHTML += `<option value="${cod}">${cod}</option>`;
            target_select.innerHTML += `<option value="${cod}">${cod}</option>`;

        })
        // const targetOption = document.getElementById("targetOption");
        // const baseOption = document.getElementById("baseOption");

        console.log(base_select.value);

        if (target_select.value == "PKR") {
            // target_select.textContent = "USD";
            target_select.value = "USD";
        }
        console.log(target_select.value);

        conversion_btn.addEventListener("click", async e => {
            e.preventDefault();

            // const PairAmountEndPoint = `${StdEndPoint}/pair/PKR/USD/${amountInput.value}`;
            const PairAmountEndPoint = `${StdEndPoint}/pair/${base_select.value}/${target_select.value}/${amountInput.value}`;
            try {
                let response = await fetch(PairAmountEndPoint)
                // console.log(response);
                let result = await response.json();
                console.log(result);
                // console.log(base_select.children[0].value);
                // console.log(target_select.children[0].value);

                conversionRate.textContent = result?.conversion_rate;
                conversionResult.textContent = result?.conversion_result;
            } catch (error) {
                console.error(error)
            }
        })
    } catch (error) {
        console.error(error)
    }
})


// Swap Button functionality
const swap_btn = document.querySelector("#swap-btn")
swap_btn.addEventListener("click", e => {
    e.preventDefault();

})

// Convert amount
