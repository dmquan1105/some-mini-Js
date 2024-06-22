const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('p');
const $hoverables2 = document.querySelectorAll('a');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

for (let i = 0; i < $hoverables2.length; i++) {
    $hoverables2[i].addEventListener('mouseenter', onMouseHover);
    $hoverables2[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor

function onMouseMove(e) {
    TweenMax.to($bigBall, .4, {
        x: e.clientX - 15,
        y: e.clientY - 15
    });

    TweenMax.to($smallBall, .1, {
        x: e.clientX - 5,
        y: e.clientY - 7
    });

}

let flag = 0;

// Hover an element
function onMouseHover() {
    flag = 1;
    TweenMax.to($bigBall, .3, {
        scale: 3
    });

}
function onMouseHoverOut() {
    flag = 0;
    TweenMax.to($bigBall, .3, {
        scale: 1
    });

}

document.body.addEventListener('mousedown', clicked);
document.body.addEventListener('mouseup', unClicked);

function clicked(){
    TweenMax.to($smallBall, 1, {
        scale: 1,
    });
    if(!flag){
        TweenMax.to($bigBall, 1, {
            scale: 3,
        });
    }else{
        TweenMax.to($bigBall, 1, {
            scale: 5,
        });
    }
}

function unClicked(){
    TweenMax.to($smallBall, 1, {
        scale: 1,
    });
    if(!flag){
        TweenMax.to($bigBall, 1, {
            scale: 1,
        });
    }else{
        TweenMax.to($bigBall, 1, {
            scale: 3,
        });
    }
}