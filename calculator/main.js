const display = document.getElementById('display');

function appendToDisplay(input){
    display.value+=input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    const expression = display.value;
    try{
        const result = eval(expression);
        display.value = result;
    } catch(error){
        display.value = "Error!";
    }
}