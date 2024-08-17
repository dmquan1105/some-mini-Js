const inputSlider = document.getElementById('inputSlider');
const sliderValue = document.getElementById('sliderValue');
const passBox = document.getElementById('passBox');

const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const generateBtn = document.getElementById('genBtn');
const copyBtn = document.getElementById('copyIcon');
const checkBtn = document.getElementById('checkIcon');
const pasIndicator = document.getElementById('passIndicator');

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~\\'

sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', function () {
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

function generatePassword() {
    const length = inputSlider.value;

    let percentage = length * 100 / 30;
    if (percentage < 40) {
        pasIndicator.classList.add('weak');
        pasIndicator.classList.remove('medium');
        pasIndicator.classList.remove('strong');
    } else if (percentage < 80) {
        pasIndicator.classList.add('medium');
        pasIndicator.classList.remove('weak');
        pasIndicator.classList.remove('strong');
    } else {
        pasIndicator.classList.add('strong');
        pasIndicator.classList.remove('weak');
        pasIndicator.classList.remove('medium');
    }

    let characters = "";
    let password = "";

    characters += lowercaseEl.checked ? lowercaseLetters : "";
    characters += uppercaseEl.checked ? uppercaseLetters : "";
    characters += numbersEl.checked ? numbers : "";
    characters += symbolsEl.checked ? symbols : "";

    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    passBox.value = password;
}

generateBtn.addEventListener('click', () => {
    generatePassword();
});

copyBtn.addEventListener('click', () => {
    const password = passBox.value;

    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            checkBtn.classList.remove('del');
            copyBtn.classList.add('del');
            setTimeout(() => {
                checkBtn.classList.add('del');
                copyBtn.classList.remove('del');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
});