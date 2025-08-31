const API_KEY = "d7ab7502d13d1ed63e868897";

const StdEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const PairEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/GBP`;
const enrichedData = `https://v6.exchangerate-api.com/v6/${API_KEY}/enriched/GBP/PKR`
const supportedCodes = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`

const conversion_btn = document.querySelector("#conversion_btn");
const amountInput = document.querySelector("#amountInput");
const base_select = document.querySelector("#base-select");
const target_select = document.querySelector("#target-select");
const conversionResult = document.querySelector("#conversion-result")
const conversionRateSec = document.querySelector("#conversion-rate-sec")
const errorMsgSec = document.querySelector(".errorMsg")
const resultSec = document.querySelector("#result")

let base_label_text = "From";
let target_label_text = "To";

const baseLabel = document.querySelector("#base-label")
const targetLabel = document.querySelector("#target-label")
const swap_btn = document.querySelector("#swap-btn")

const conversionRate_label = document.querySelector("#conversion-rate-label")
const conversionResult_label = document.querySelector("#conversion-result-label")

// TOP CONVERSION PAGE
const mainHeading = document.getElementById("main_heading");


document.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await fetch(`${StdEndPoint}/codes`)
        let data = await response.json();
        // console.log(data);
        // console.log(data?.supported_codes);
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
            base_select.value = "PKR";
            target_select.value = "TRY";
        })


        conversion_btn.addEventListener("click", async e => {
            e.preventDefault();

            if (amountInput.value == 0) {

                // conversion_btn.setAttribute("disabled")
                resultSec.classList.add("hidden")
                errorMsgSec.classList.remove("hidden")
                errorMsgSec.innerHTML = `<p class="amount_errorMsg ">Please enter some amount!</p>`
            } else if (amountInput.value > 0) {
                // if (amountInput.value > 0) {

                errorMsgSec.classList.add("hidden")
                resultSec.classList.remove("hidden")

                // const PairAmountEndPoint = `${StdEndPoint}/pair/PKR/USD/${amountInput.value}`;
                const PairAmountEndPoint = `${StdEndPoint}/pair/${base_select.value}/${target_select.value}/${amountInput.value}`;
                try {
                    let response = await fetch(PairAmountEndPoint)
                    // console.log(response);
                    let result = await response.json();
                    // console.log(result);
                    // console.log(base_select.children[0].value);
                    // console.log(target_select.children[0].value);

                    conversionResult_label.textContent = `${amountInput.value} ${base_select.value} =`
                    let conversion_result = result?.conversion_result
                    conversionResult.textContent = `${conversion_result} ${target_select.value}`;

                    try {
                        const baseToTrgt = await fetch(`${StdEndPoint}/pair/${base_select.value}/${target_select.value}/1`)
                        const updtData = await baseToTrgt.json()
                        console.log(updtData);
                        conversionRateSec.innerHTML = `<p>1 ${updtData?.base_code} = ${updtData?.conversion_rate} ${updtData?.target_code}</p>`
                    } catch (error) {
                        console.error(error);
                    }

                    try {
                        const trgtToBase = await fetch(`${StdEndPoint}/pair/${target_select.value}/${base_select.value}/1`);
                        const updtData = await trgtToBase.json();
                        console.log(updtData);
                        conversionRateSec.innerHTML += `<p>1 ${updtData?.base_code} = ${updtData?.conversion_rate} ${updtData?.target_code}</p>`

                    } catch (error) {
                        console.error(error);
                    }

                } catch (error) {
                    console.error(error)
                }
            }
        })

        baseLabel.textContent = base_label_text
        targetLabel.textContent = target_label_text


        swap_btn.addEventListener("click", async e => {
            e.preventDefault()

            if (amountInput.value == 0) {
                conversion_btn.setAttribute("disabled")
            }
            // Dropdown Values swapping
            let temp = base_select.value;
            base_select.value = target_select.value
            target_select.value = temp

            // result section values swapping

            conversionResult_label.textContent = `${amountInput.value} ${base_select.value} =`

            const convrsnRslt = await fetch(`${StdEndPoint}/pair/${base_select.value}/${target_select.value}/${amountInput.value}`)
            const res = await convrsnRslt.json()

            conversionResult.textContent = `${res?.conversion_result} ${target_select.value}`;
            // console.log(conversion_result);
            try {
                const baseToTrgt = await fetch(`${StdEndPoint}/pair/${base_select.value}/${target_select.value}/1`)
                const updtData = await baseToTrgt.json()
                // console.log(updtData);
                conversionRateSec.innerHTML = `<p>1 ${updtData?.base_code} = ${updtData?.conversion_rate} ${updtData?.target_code}</p>`
            } catch (error) {
                console.error(error);
            }

            try {
                const trgtToBase = await fetch(`${StdEndPoint}/pair/${target_select.value}/${base_select.value}/1`);
                const updtData = await trgtToBase.json();
                // console.log(updtData);
                conversionRateSec.innerHTML += `<p>1 ${updtData?.base_code} = ${updtData?.conversion_rate} ${updtData?.target_code}</p>`

            } catch (error) {
                console.error(error);
            }
        })

    } catch (error) {
        console.error(error)
    }
})