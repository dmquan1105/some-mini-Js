document.getElementById("submit").onclick = function() {
    let inp = Number(document.getElementById("inp").value);
    let result = document.getElementById("result");
    const checkboxes = document.querySelectorAll('input[name="check"]');
    let checked;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked = checkboxes[i].id;
            break;
        }
    }
    if(checked=="CToF"){
        result.textContent = ((inp*1.8)+32).toFixed(1) + `15\u00B0F`;
    }else{
        result.textContent = ((inp-32)/1.8).toFixed(1) + `15\u00B0C`;
    }
    result.style.opacity = 0; 
    setTimeout(function() {
        result.style.opacity = 1;
    }, 5);
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// https://www.learnui.design/tools/gradient-generator.html
const colors = [
  "#06205c",
  "#06205c",
  "#06205c", 
  "#3c206b",
  "#3c206b",
  "#671573",
  "#671573",
  "#671573", 
  "#910071",
  "#910071",
  "#910071",
  "#b80066",
  "#b80066", 
  "#d80053",
  "#d80053", 
  "#f10039",
  "#f10039",
  "#ff070f",
  "#ff070f"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();