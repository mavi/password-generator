const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const strengthEl = document.getElementById('strength');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbols = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
    strengthEl.innerHTML = testPassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
});

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        // alert('Password not found.');
        return;
    } else {
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        // alert('Password copied.');
    };
})

function testPassword(lower, upper, number, symbol, length) {
    let finalStrength;
    const typesCount = lower + upper + number + symbol;
 
    if(typesCount == 0){ finalStrength = "Password Strength" };
    if((typesCount > 0) && (typesCount <= 2)){ finalStrength = "Weak" };
    if((typesCount > 0) && (length < 8)){ finalStrength = "Weak" };
    if((typesCount >= 2) && (length > 8)){ finalStrength = "Medium" };
    if((typesCount == 4) && (length > 12)){ finalStrength = "Strong" };
    
    return finalStrength;
 };

function generatePassword(lower, upper, number, symbol, length) {
   let generatedPassword = '';

   const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    if(typesCount === 0){ return ''; };

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    };

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
};

// http://www.net-comber.com/charset.html
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!?@#&*=,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}