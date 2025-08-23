const API_KEY = "3f4bbc7fd68ddceeb2cf6791";

const StdEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PKR`;
const PairEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/GBP`;

const conversion_btn = document.getElementById("conversion_btn");
const amountInput = document.getElementById("amountInput");



conversion_btn.addEventListener("click", async e => {
    e.preventDefault();

    let response = await fetch(StdEndPoint)
    let data = await response.json();
    console.log(data);

    // const PairAmountEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${}/${}/${amountInput.value}`;
    const PairAmountEndPoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/PKR/${amountInput.value}`;
    try {
        let response = await fetch(PairAmountEndPoint)
        // console.log(response);
        let result = await response.json();
        console.log(result);
        console.log(Object.keys(data.conversion_rates));

    } catch (error) {
        console.error(error)
    }
})