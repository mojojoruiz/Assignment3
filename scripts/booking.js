/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?


let costperday = "full-day"; 
let numberofdays = 0;
let dayButtons = document.querySelectorAll('.daybtn');
let selectedDay = null;
let dayCost = 0;
let totalCost = 0;
let modelButton= Monday, Tuesday, Wednesday, Thursday, Friday;


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!


dayButtons.forEach(function(button) {
    button.addEventListener('click', function() {
    if (!this.classList.contains('clicked')) {
        dayButtons.forEach(function(button) {
        button.classList.remove('clicked');
        });

        this.classList.add('clicked');

        selectedDay = this.dataset.day;
        dayCost = calculateDayCost(selectedDay);
        totalCost = calculateTotalCost(dayCost);

        document.getElementById('total-cost').textContent = totalCost;
    }
    });
});

function calculateDayCost(day) {
    if (day === "Saturday" || day === "Sunday") {
        return costperday === "full-day" ? 35 : 20;
    } else {
        return costperday === "full-day" ? 25 : 15;
    }
}

function calculateTotalCost(dayCost) {
    numberofdays = document.querySelectorAll('.day-btn.clicked').length;
    return numberofdays * dayCost;
}


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
    dayButtons.forEach(function(button) {
    button.classList.remove('clicked');
    });

    selectedDay = null;
    dayCost = 0;
    totalCost = 0;

    document.getElementById('total-cost').textContent = totalCost;
});
/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.


let modelButton= document.getElementById("model-button");

function recalculate() {
    dayCost = calculateDayCost(selectedDay);
    totalCost = calculateTotalCost(dayCost);
    document.getElementById('total-cost').textContent = totalCost;
}

function changeModel() {
    costperday = costperday === "full-day" ? "half-day" : "full-day";
    document.getElementById("model-text").textContent = costperday === "full-day" ? "Full Day Button" : "Half Day Button";
    recalculate();
}

modelButton.addEventListener("click", changeModel);

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value


let modelButton = document.getElementById("model-button");

function changeModel() {
    if (modelName === "Full Day Button") {
        modelName = "Half Day Button";
        document.getElementById("model-text").innerHTML = "Half Day Button";
    } else if (modelName === "Half Day Button") {
        modelName = "Full Day Button";
        document.getElementById("model-text").innerHTML = "Full Day Button";
    }
    recalculate();
}

modelButton.addEventListener("click", changeModel);