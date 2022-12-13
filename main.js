var colors = document.getElementsByClassName("col");
for (let i = 1; i < colors.length; i++) {
    colors[i].style.display = "none";
    i++
}
randomizeColors();

function randomizeColors() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.background = getRandomColor();
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addColumn(id) {
    //document.getElementById(id).style.display = "initial";
    document.getElementById("c" + id).getElementsByClassName("image")[0].src = "static/icons/minus.png";
}
