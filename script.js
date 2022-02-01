//main JS
let seconds = 00;
let tens = 00;
let min = 00;
let hr = 00;

let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let appendMins = document.getElementById("mins");
let appendHrs = document.getElementById("hrs")
let buttonStart = document.getElementById("button-start");
let buttonStop = document.getElementById("button-stop");
let buttonReset = document.getElementById("button-reset");
let interval; // to store the timer values
const projects = [] //store projects

let input = document.getElementById("task-input");
let submit = document.getElementById("task-submit")
let times = document.getElementById("times")

//this function will run when start is clicked
function startTimer() {
    tens++;
    if(tens < 9) {
        // appendTens.innerHTML= "0" + tens;
    }
    if (tens > 9) {
        // appendTens.innerHTML =  tens;
    }
    // if (tens > 10)
    if(tens > 254) {
        seconds++
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        // appendSeconds.innerHTML = "0" + 0;
    }
    if (seconds > 0){
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;

    }
    if (seconds < 9){
        appendSeconds.innerHTML = "0" + seconds;
    }
    if(seconds == 60) {
        min++
        appendMins.innerHTML = "0" + min;
        seconds = 00;
    }

    if (min == 60) {
        hr++
        appendHrs.innerHTML = "0" + hr
        min = 00
    }

}

buttonStart.onclick = function() {
    interval = setInterval(startTimer)
};

buttonStop.onclick = function () {
    clearInterval(interval);
};

buttonReset.onclick = function() {
    clearInterval(interval);
    tens = "00";
    seconds = "00";
    minutes = "00";
    hours = "00"
    appendSeconds.innerHTML = seconds;
    appendMins.innerHTML = minutes;
    appendHrs.innerHTML = hours;
}




let addProject = () => {
    //create project DIV
    let newDiv = document.createElement("div")
    newDiv.classList.add("project")
    //create project inner div
    let projectBox = document.createElement("div")
    projectBox.classList.add("projectBox")
    //title of Project from input field
    // store the input into a variable named input
    let input = document.getElementById("task-input").value;
    // create an h3 to store the input
    let h3 = document.createElement("h3")
    // make the text inside the h3 the input
    h3.innerHTML = input
    //add the h3 to the newDiv
    newDiv.appendChild(h3)
    // create a span for the timer
    let timeTxt = document.createElement("span")
    // give the span an id of timer.
    timeTxt.id = "timer"
    // set the timer to 00
    timeTxt.innerHTML = "00"
      



    // create a play button
    let playBtn = document.createElement("button")
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
    playBtn.classList.add("playBtn")
    
    playBtn.addEventListener('click', () => {
        console.log("play")
        playBtn.style.backgroundColor = "lightblue"
        interval = setInterval(startTimer)
    })

    let stopBtn = document.createElement("button")
    stopBtn.innerHTML = '<i class="fas fa-stop"></i>'
    stopBtn.classList.add("stopBtn")
    stopBtn.addEventListener('click', () => {
        console.log("stop")
        clearInterval(interval)
    } )

    // create a delete button
    let del = document.createElement("button")
    del.innerHTML='<i class="fas fa-trash"></i>'
    del.classList.add("delete")

    projectBox.appendChild(timeTxt)
    projectBox.appendChild(playBtn);
    projectBox.appendChild(stopBtn)
    projectBox.appendChild(del);
    
    newDiv.appendChild(projectBox);
    document.getElementById("times").appendChild(newDiv);

    // delete a project
    del.addEventListener('click', (e) => {
        e.stopPropagation();
        let res = confirm('Do you want to delete this project?');
        if (res == true) {
            times.removeChild(newDiv);
        } else {
            return true;
        }
    })
    let formText = document.getElementById("task-input")
    formText.value = ""
}



//run addProject when the submit button is clicked.
submit.addEventListener("click", (addProject) => {
    addProject.preventDefault()
    alertMessage(input)
    
});
 
//create an alert when there is nothing in input
const alertMessage = () => {
        let text = input.value
        if ( text === "") {
            alert('Add a Project')
        } else {
            addProject()
        
    }

}




// save tasks to storage
const saveProjects = () => {
        localStorage.setItem('projects', JSON.stringify(projects))
    }
    

 // save project object   
const project = (input) => {
    if (input.length > 0) {
        projects.push({
            title: input,
            id: '',
            startTime: '',
            endTime: '', 
        })
        saveProjects()
    }
    
}

    
