var columns = Array.from(document.getElementsByClassName("col"));
var empty = [];
var images = [];

for(let i = 0; i < columns.length; i++) {
    images.push(document.getElementById(`i${i}`));

    columns[i].addEventListener("mouseover", function handleMouseOver() {
        images[i].style.display = "block";
    });

    columns[i].addEventListener("mouseout", function handleMouseOut() {
        images[i].style.display = "none";
    });
}

for(let i = 3; i < 6; i++) {
    columns[i].style.display = "none";
    empty.push(columns[i]);
}

var colors = columns.slice(0, 3);

setOnClick();
randomizeColors();

function setOnClick() {
    for(let i = 0; i < colors.length; i++) {
        colors[i].onclick = function() {
            addColumn(i);
        }
    }
}

function randomizeColors() {
    for(let i = 0; i < colors.length; i++) {
        colors[i].style.background = getRandomColor();
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addColumn(id) {
    if(id = colors.length - 1) {
        colors.push(empty.pop());
        colors[id + 1].style.display = "initial";
        colors[id + 1].style.backgroundColor = getRandomColor();
    } else {
        colors.splice(id + 1, 0, empty.pop());
        colors[id + 1].style.display = "initial";
        colors[id + 1].style.backgroundColor = colors[colors.length - 1].style.backgroundColor;
        
        for(let i = colors.length - 1; i > id + 1; i--) {
            colors[i].style.backgroundColor = colors[i - 1].style.backgroundColor;
        }

        colors[id + 2].style.backgroundColor = getRandomColor();
    }

    setOnClick(); 
}