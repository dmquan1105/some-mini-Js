const vowels = ['a', 'o', 'e', 'u', 'i'];

// const text = document.getElementById('text').value;
const countBtn = document.getElementById('count');
const result = document.getElementById('result');

countBtn.onclick = function(){
    const text = document.getElementById('text').value.toLowerCase();
    let vowelCount = 0;
    for(let i in text){
        if(vowels.includes(text[i])){
            vowelCount++;
        }
    }
    result.textContent = `Total Vowels: ${vowelCount}`;
}