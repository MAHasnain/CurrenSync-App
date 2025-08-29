const API_KEY = "3f4bbc7fd68ddceeb2cf6791";

const StdEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const PairEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/GBP`;
const enrichedData = `https://v6.exchangerate-api.com/v6/${API_KEY}/enriched/GBP/PKR`
const supportedCodes = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`

const conversion_btn = document.getElementById("conversion_btn");
const amountInput = document.getElementById("amountInput");
const base_select = document.querySelector("#base-select");
const target_select = document.querySelector("#target-select");
const conversionResult = document.querySelector("#conversion-result")
const conversionRate = document.querySelector("#conversion-rate")

let base_label_text = "From";
let target_label_text = "To";

const baseLabel = document.querySelector("#base-label")
const targetLabel = document.querySelector("#target-label")

const conversionRate_label = document.querySelector("#conversion-rate-label")
const conversionResult_label = document.querySelector("#conversion-result-label")

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await fetch(`${StdEndPoint}/codes`)
        let data = await response.json();
        console.log(data);
        console.log(data?.supported_codes);
        const currCodes = data?.supported_codes;
        currCodes.map(cod => {
            base_select.innerHTML += `<option value="${cod[0]}">
            <ul>
            <li>${cod[0]}</li>
            <li>${cod[1]}</li>
            </ul>
            </option>`;
            target_select.innerHTML += `<option value="${cod[0]}">
            <ul>
            <li>${cod[0]}</li>
            <li>${cod[1]}</li>
            </ul>
            </option>`;
        })
        // const targetOption = document.getElementById("targetOption");
        // const baseOption = document.getElementById("baseOption");

        // console.log(base_select.value);

        // if (target_select.value == "PKR") {
        //     // target_select.textContent = "USD";
        //     target_select.value = "USD";
        // }
        // console.log(target_select.value);

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


                conversionRate_label.textContent = `Conversion Rate`
                conversionResult_label.textContent = `Conversion Result`
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

baseLabel.textContent = base_label_text
targetLabel.textContent = target_label_text

// Swap Button functionality
const swap_btn = document.querySelector("#swap-btn")
swap_btn.addEventListener("click", e => {
    e.preventDefault();

})

// Convert amount
