var columns = Array.from(document.getElementsByClassName("col"));
var empty = [];
var images = [];

//SPACEBAR PRESS EVENT HANDLING
document.getElementsByTagName("body")[0].addEventListener("keydown", function(event) {
    if (event.key == " " || event.code == "Space") {
        randomizeColors();
    }
});

//DISPLAYING ICONS ON HOVER
for(let i = 0; i < columns.length; i++) {
    images.push(document.getElementById(`i${i}`));

    columns[i].addEventListener("mouseover", function handleMouseOver() {
        images[i].style.display = "block";
    });

    columns[i].addEventListener("mouseout", function handleMouseOut() {
        images[i].style.display = "none";
    });
}

//HIDING COLUMNS
for(let i = 3; i < 6; i++) {
    columns[i].style.display = "none";
    empty.push(columns[i]);
}

var colors = columns.slice(0, 3);

//SETTING INITIAL CONDITIONS
setOnClick();
randomizeColors();

//FUNCTION SETS ONCLICK EVENT ON "ADD COLUMN" BUTTON
function setOnClick() {
    for(let i = 0; i < colors.length; i++) {
        colors[i].getElementsByClassName("plus")[0].onclick = function() {
            addColumn(i);
        }
    }
}

//SHOWING/HIDING BUTTONS LOGIC
function buttonsLogic() {
    let plus = document.getElementsByClassName("plus");
    if(colors.length > 5) {
        for(let i = 0; i < colors.length; i++) {
            plus[i].style.display = "none";
        }
    } else {
        for(let i = 0; i < colors.length; i++) {
            plus[i].style.display = "initial";
        }
    }

    let minus = document.getElementsByClassName("minus");
    if(colors.length > 3) {
        for(let i = 0; i < colors.length; i++) {
            minus[i].style.display = "initial";
        }
    } else {
        for(let i = 0; i < colors.length; i++) {
            minus[i].style.display = "none";
        }
    }
}

//HANDLING "ADD COLUMN" BUTTON
function addColumn(id) {
    if(colors.length < 6) {
        if(id == colors.length - 1) {
            colors.push(empty.pop());
            colors[id + 1].style.display = "initial";

            colorize(colors[id + 1]);
        } else {
            colors.splice(id + 1, 0, empty.pop());
            colors[id + 1].style.display = "initial";
    
            colors[id + 1].style.backgroundColor = colors[colors.length - 1].style.backgroundColor;
            
            for(let i = colors.length - 1; i > id + 1; i--) {
                colors[i].style.backgroundColor = colors[i - 1].style.backgroundColor;
            }

            colorize(colors[id + 2]);
        }
        setOnClick();
        buttonsLogic();
    }
}

//RANDOMIZING COLORS FOR ALL ACTIVE AND NON-HIDDEN COLUMNS
function randomizeColors() {
    for(let i = 0; i < colors.length; i++) {
        colorize(colors[i]);
    }
}

//FUNCTION RETURNING RANDOM COLOR
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//COMPUTE IF COLOR IS LIGHT
function isLight(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 2), 16);
    const c_g = parseInt(hex.substring(2, 4), 16);
    const c_b = parseInt(hex.substring(4, 6), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    if(brightness > 155) {
        return true
    } else {
        return false
    }
}

function colorize(column) {
    let temp = getRandomColor()
    column.style.backgroundColor = temp;

    if(isLight(temp)) {
        for(element of column.getElementsByTagName("img")) {
            element.style.filter = "invert(0%) sepia(100%) saturate(29%) hue-rotate(133deg) brightness(93%) contrast(107%)";
        }
    } else {
        for(element of column.getElementsByTagName("img")) {
            element.style.filter = "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)";
        }
    }    
}