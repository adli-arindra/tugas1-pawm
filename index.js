let bmi, category, kg = 65, m = 1.75;

const gridbb = document.getElementById("gridbb");
const gridtb = document.getElementById("gridtb");
let img = document.getElementById("img_ff");
let pointer = document.getElementById("pointer");

update();

document.addEventListener("keypress", function(e) {
    kg = Number(gridbb.value);
    m = Number(gridtb.value) / 100;
    
    if (e.key == "Enter") update();
})

document.getElementById("gridbutton").onclick = function() {
    kg = Number(gridbb.value);
    m = Number(gridtb.value) / 100;

    update();
}

function update() {
    // UPDATING BMI
    bmi = Math.round((kg/m**2) * 100) / 100;
    
    if (bmi <= 18.4) {
        category = "Underweight";
    }
    else if (bmi < 25) {
        category = "Normal";
    }
    else if (bmi < 40) {
        category = "Overweight";
    }
    else {
        category = "Obese";
    }
    document.getElementById("bmi").innerHTML = bmi + " - " + category;

    // UPDATING LABEL
    gridbb.value = Math.round(kg);
    gridtb.value = Math.round(m * 100);

    // UPDATING FF IMAGE
    
    img.width = ((kg * 2) + 50) * 1.5;
    img.height = m * 100 * 1.5 * 1.5;

    // UPDATING POINTER
    pointer.style.left = Math.max(Math.min((bmi * 5) - 75, 86), 12) + "%";
}

// DRAGGABLE

const dragged_img = document.getElementById("dragged");

const milk = document.getElementById("milk");
const dumbell = document.getElementById("dumbell");
const meat = document.getElementById("meat");
const broccoli = document.getElementById("broccoli");

let ofx, ofy;
let state = "none";

milk.addEventListener("click", milkPressed);
dumbell.addEventListener("click", dumbellPressed);
meat.addEventListener("click", meatPressed);
broccoli.addEventListener("click", broccoliPressed);


function milkPressed(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    ofx = e.clientX - rect.left;
    ofy = e.clientY - rect.top;

    setDraggable("assets/milk.png", milk, e.clientX, e.clientY, ofx, ofy);
    state = "milk";
}

function dumbellPressed(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    ofx = e.clientX - rect.left;
    ofy = e.clientY - rect.top;

    setDraggable("assets/iron.png", dumbell, e.clientX, e.clientY);
    state = "iron";
}

function meatPressed(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    ofx = e.clientX - rect.left;
    ofy = e.clientY - rect.top;

    setDraggable("assets/meat.png", meat, e.clientX, e.clientY);
    state = "meat";
}

function broccoliPressed(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    ofx = e.clientX - rect.left;
    ofy = e.clientY - rect.top;
    setDraggable("assets/broccoli.png", broccoli, e.clientX, e.clientY);
    state = "broccoli";
}

function setDraggable(source, obj, x, y) {
    dragged_img.src = source;
    dragged_img.style.top = (y - ofy) + "px";
    dragged_img.style.left = (x - ofx) + "px";
    
    document.addEventListener("mousemove", moveObject);
    document.addEventListener("mouseup", allowPlace);
}

function moveObject(e) {
    dragged_img.style.top = (e.clientY - ofy) + "px";
    dragged_img.style.left = (e.clientX - ofx) + "px";
}

function allowPlace(e) {
    document.addEventListener("click", place);
}

function place(e) {
    document.removeEventListener("mousemove", moveObject);
    document.removeEventListener("mouseup", allowPlace);
    document.removeEventListener("click", place);
    dragged_img.removeAttribute("src");

    img.addEventListener("mouseover", changeState);
}

function changeState(e) {
    if (state == "milk") m += 0.05;
    else if (state == "iron") m -= 0.05;
    else if (state == "meat") kg += 1;
    else if (state == "broccoli") kg -= 1;
    state = "none";
    update();
    img.removeEventListener("mouseover", changeState)
}