document.addEventListener("DOMContentLoaded", () => {
    const do1 = document.getElementById("do1");
    const do2 = document.getElementById("do2");
    const do5 = document.getElementById("do5");
    const do10 = document.getElementById("do10");
    const do20 = document.getElementById("do20");
    const do50 = document.getElementById("do50");
    const do100 = document.getElementById("do100");

    const txt1 = document.getElementById("txt1");
    const txt2 = document.getElementById("txt2");
    const txt5 = document.getElementById("txt5");
    const txt10 = document.getElementById("txt10");
    const txt20 = document.getElementById("txt20");
    const txt50 = document.getElementById("txt50");
    const txt100 = document.getElementById("txt100");

    const txtFinalCash = document.getElementById("txtFinalCash");
    const txtFinalCashInWords = document.getElementById("txtFinalCashInWords");
    const btnReset = document.getElementById("btnReset");

    const cashInputs = [do1, do2, do5, do10, do20, do50, do100];
    const cashTexts = [txt1, txt2, txt5, txt10, txt20, txt50, txt100];
    const denominations = [1, 2, 5, 10, 20, 50, 100];

    cashInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            cashCalculate(index);
        })
    })

    function cashCalculate(index) {
        const rowValue = cashInputs[index].value * denominations[index];
        cashTexts[index].textContent = rowValue.toFixed(0);

        totalCash();
    }

    function totalCash() {
        let totalCashValue = 0;
        cashTexts.forEach((text) => {
            totalCashValue += parseInt(text.textContent);
        })

        txtFinalCash.textContent = "Total Cash: " + totalCashValue;
        txtFinalCashInWords.textContent = "Total cash in words: " + convertToWords(totalCashValue);
    }

    function convertToWords(number) {
        const words = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
            "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
        ];
        const groups = ["", "Thousand", "Million", "Billion", "Trillion"];

        function getWords(n) {
            let str = "";

            if (n >= 100) {
                str += words[Math.floor(n / 100)] + " Hundred ";
                n %= 100;
            }
            if (n >= 20) {
                str += words[20 + Math.floor(n / 10) - 2] + " ";
                n %= 10;
            }
            if (n > 0) {
                str += words[n] + " ";
            }

            return str.trim();
        }

        if (number === 0) return "Zero";

        let i = 0;
        let result = "";

        while (number > 0) {
            const groupValue = number % 1000;
            if (groupValue > 0) {
                const groupWords = getWords(groupValue);
                result = groupWords + (groups[i] ? " " + groups[i] : "") + " " + result;
            }
            number = Math.floor(number / 1000);
            i++;
        }

        return result.trim();
    }

    btnReset.onclick = function() {
        cashInputs.forEach((input) => {
            input.value = "";
        })

        cashTexts.forEach((text) => {
            text.textContent = "0";
        })

        // make animation for txtFinalCash and txtFinalCashInWords
        txtFinalCash.style.animation = "fadeOut 0.5s";
        txtFinalCashInWords.style.animation = "fadeOut 0.5s";
        // reset text content
        txtFinalCash.textContent = "Total Cash: 0";
        txtFinalCashInWords.textContent = "Total cash in words: Zero";
    }

})