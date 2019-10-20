//This is are all the elements that will be interacted with
var currentDate = document.getElementById("currentDate");
var currentHour = document.getElementById("currentHour");
var toDoList = document.querySelectorAll("textarea");
var saveBtnsList = document.querySelectorAll("img");
var hoursList = document.querySelectorAll(".hours");

//This block gets the current date and time and renders them in the page
var timer = setInterval(function () { //executes block every second
    var currentDay = moment().format("MMMM Do YYYY");
    var currentTime = moment().format("hh:mm:ss A");
    currentDate.innerText = currentDay;
    currentHour.innerText = currentTime;
}, 1000);

//This block sets the format for the textareas depending on the time of the day
var fieldFormat = setInterval(function () { //executes block every second
    var genCount = 0; //used to cycle through all textareas
    var hourNow = '';
    hourThisMoment = moment().get("hour"); //gets current hour in number formart
    for (var hour of hoursList) {
        //console.log(hoursList);
        hourNow = parseFloat(hour.getAttribute("id")); //gets every textarea id in number format
        //This block compares each textarea id and the current hour and applies the corresponding style
        if (hourNow < hourThisMoment) {
            toDoList[genCount].style.backgroundColor = "#736372";
        }
        else if (hourNow == hourThisMoment) {
            toDoList[genCount].style.backgroundColor = "#A18276";
        }
        else {
            toDoList[genCount].style.backgroundColor = "#7A918D";
        }
        genCount++; //increases count by one to cycle through all textareas
    }

}, 1000);

// This block creates a new object with the current date in localstorage if object doesn't exist;
if (localStorage.getItem("scheduleObj") === null) {
    scheduleObj.currentDate = moment().format("MMMM Do YYYY");
    localStorage.setItem("scheduleObj", JSON.stringify(scheduleObj));
}

//This checks the date in scheduelObj, updates the date and clears all entries from previous dates
var scheduleObj = JSON.parse(localStorage.getItem("scheduleObj"));
var storedDate = scheduleObj.currentDate; //date saved in local storage
var dateToday = moment().format("MMMM Do YYYY");
if (storedDate != dateToday) {
    scheduleObj.currentDate = dateToday;
    for (var i = 0; i < scheduleObj.entries.length; i++) { //replaces all values in arrays
        scheduleObj.entries[i] = "";
    }
}
localStorage.setItem("scheduleObj", JSON.stringify(scheduleObj));

//This block renders all saved entries in their respective time slot
if (localStorage.getItem("scheduleObj") != null) { //if obj is not localstorage it will not execute
    var scheduleObj = JSON.parse(localStorage.getItem("scheduleObj")); //parses the obj so it can be updated
    var counter = 0;
    for (var entry of toDoList) {
        entry.value = scheduleObj.entries[counter]; //reads object properties and renders them in the corresponding textareas
        counter++;
    }
}

//This blocks saves entries to the local storage
for (var saveBtn of saveBtnsList) {
    saveBtn.addEventListener("click", function () {
        var counter = parseFloat(this.getAttribute("id"));
        console.log(counter);
        var toDoEntry = toDoList[counter].value;
        console.log(toDoEntry);
        var scheduleObj = JSON.parse(localStorage.getItem("scheduleObj"));
        scheduleObj.entries[counter] = toDoEntry;
        localStorage.setItem("scheduleObj", JSON.stringify(scheduleObj));
    })
}