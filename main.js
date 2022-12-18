var columns = Array.from(document.getElementsByClassName("col"));
var lock = [];
var empty = [];
var images = [];

//SPACEBAR PRESS EVENT HANDLING
document.getElementsByTagName("body")[0].addEventListener("keydown", function(event) {
    if (event.key == " " || event.code == "Space") {
        randomizeColors();
    }
});

//DISPLAYING ICONS ON HOVER EVENT HANDLING
for(let i = 0; i < columns.length; i++) {
    images.push(document.getElementById(`i${i}`));
    lock.push(false);

    columns[i].addEventListener("mouseover", function handleMouseOver() {
        images[i].style.display = "initial";
    });

    columns[i].addEventListener("mouseout", function handleMouseOut() {
        images[i].style.display = "none";
    });
}

//HIDE COLUMNS
for(let i = 3; i < 6; i++) {
    columns[i].style.display = "none";
    empty.push(columns[i]);
}

//SET INITIAL CONDITIONS
assignColumns()
setOnClick();
randomizeColors();

//FUNCTION SETS ONCLICK EVENT ON "ADD COLUMN" BUTTON
function setOnClick() {
    for(let i = 0; i < colors.length; i++) {
        colors[i].getElementsByClassName("plus")[0].onclick = function() {
            addColumn(i);
        }
        colors[i].getElementsByClassName("minus")[0].onclick = function() {
            removeColumn(i);
        }
        colors[i].getElementsByClassName("lock")[0].onclick = function() {
            toggleLock(i);
        }
    }
}

//SHOWING/HIDING BUTTONS LOGIC
function buttonsLogic() {
    if(colors.length > 5) {
        for(color of colors) {
            color.getElementsByClassName("plus")[0].style.display = "none";
        }
    } else {
        for(color of colors) {
            color.getElementsByClassName("plus")[0].style.display = "initial";
        }
    }

    if(colors.length > 3) {
        for(color of colors) {
            color.getElementsByClassName("minus")[0].style.display = "initial";
        }
    } else {
        for(color of colors) {
            color.getElementsByClassName("minus")[0].style.display = "none";
        }
    }
}

//REASIGNS ARRAYS TO CONTAIN ALL COLUMNS FROM LEFT TO RIGHT
function assignColumns() {
    columns = Array.from(document.getElementsByClassName("col"));
    colors = [];
    empty = [];

    for(column of columns) {
        if(column.style.display == "none") {
            empty.push(column);
        } else {
            colors.push(column);
        }
    }
}

//LOCKS OR UNLOCKS COLOR CHANGE
function toggleLock(id) {
    lock[id] = !lock[id]
    if(lock[id]) {
        colors[id].getElementsByClassName("lock")[0].src = "static/icons/unlock.png";
    } else {
        colors[id].getElementsByClassName("lock")[0].src = "static/icons/lock.png";
    }
}

//HANDLING "ADD COLUMN" BUTTON
function addColumn(id) {
    empty[0].style.display = "flex";
    assignColumns();

    let content = colors[colors.length - 1];
    colorize(content);
    let parent = content.parentNode;
    parent.insertBefore(content, parent.getElementsByClassName("col")[id + 1]);
    lock.splice(id + 1, 0, lock.pop())
    
    assignColumns();  
    setOnClick();
    buttonsLogic();
}

//HANDLING "REMOVE COLUMN" BUTTON
function removeColumn(id) {
    let content = colors[id];
    let parent = content.parentNode;

    content.style.backgroundColor = "#FFFFFF";
    content.style.display = "none";
    lock.splice(id, 1);
    lock.push(false);

    parent.appendChild(content);
    assignColumns();
    setOnClick();
    buttonsLogic();
}

//RANDOMIZING COLORS FOR ALL ACTIVE AND NON-HIDDEN COLUMNS
function randomizeColors() {
    for(let i = 0; i < colors.length; i++) {
        if(!lock[i]) {
            colorize(colors[i]);
        }
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

    if(brightness > 100) {
        return true
    } else {
        return false
    }
}

//FUNCTION COLORIZES IT'S INPUT
function colorize(column) {
    let temp = getRandomColor()
    column.style.backgroundColor = temp;
    column.getElementsByTagName("h2")[0].innerHTML = temp;

    if(isLight(temp)) {
        for(element of column.getElementsByTagName("img")) {
            element.style.filter = "invert(0%) sepia(100%) saturate(29%) hue-rotate(133deg) brightness(93%) contrast(107%)";
        }
        column.getElementsByTagName("h2")[0].style.color = "#000000";
    } else {
        for(element of column.getElementsByTagName("img")) {
            element.style.filter = "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)";
        }
        column.getElementsByTagName("h2")[0].style.color = "#FFFFFF";
    }    
}