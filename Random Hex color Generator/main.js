const containerEl = document.querySelector(".container");

for(let index = 0; index < 50; index++) {
    const colorContainerEl = document.createElement('div');
    colorContainerEl.classList.add('color-container');

    const colorCodeEl = document.createElement('span');
    colorCodeEl.classList.add("color-code");
    colorContainerEl.appendChild(colorCodeEl);

    const copyButtonEl = document.createElement('button');
    copyButtonEl.innerText = "Copy";
    colorContainerEl.appendChild(copyButtonEl);

    containerEl.appendChild(colorContainerEl);
}

function randomColor() {
    const chars = "0123456789ABCDEF";
    const colorCodeLength = 6;
    let colorCode = "";

    for(let idx = 0; idx < colorCodeLength; idx++) {
        const randomNumber = Math.floor(Math.random()*chars.length);
        colorCode += chars[randomNumber];
    }
    
    return "#" + colorCode;
}

generateColor();

function generateColor() {
    const colorContainerEls = document.querySelectorAll('.color-container');
    
    for(let index = 0; index < colorContainerEls.length; index++) {
        const colorCode = randomColor();
        colorContainerEls[index].style.backgroundColor = colorCode;
        colorContainerEls[index].querySelector('.color-code').innerText = colorCode;

        const copBtn = colorContainerEls[index].querySelector('button');
        
        copBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(colorCode);
            alert("Color code copied to clipboard!");
        });
    }
}