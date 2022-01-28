//main JS
let seconds = 00;
let tens = 00;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
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
        appendTens.innerHTML= "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    if(tens > 99) {
        seconds++
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
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
    appendSeconds.innerHTML = seconds;
    appendTens.innerHTML = tens;
}

let addProject = () => {
    console.log("hello")
    let input = document.getElementById("task-input").value; 
    let newDiv = document.createElement("div")
    let newCont = document.createTextNode(input)
    let toolBox = document.createElement("div")
    let del = document.createElement("button")
    let onBtn = document.createElement("button")
    newDiv.classList.add("project")
    newDiv.appendChild(newCont);
    onBtn.innerHTML = "ON/OFF"
    onBtn.classList.add("onOffBtn")
    toolBox.appendChild(onBtn);
    toolBox.appendChild(del);
    del.innerHTML = "X";
    del.classList.add("delete")
    newDiv.appendChild(toolBox);
    document.getElementById("times").appendChild(newDiv);
    project(input)
    
    
}

let deleteButton = () => {
   
    console.log("delete")
}

submit.addEventListener("click", (addProject) => {
    addProject.preventDefault()
    alertMessage(input)
});
 
// let delBtn = document.querySelector(".delete")
// delBtn.addEventListener("click", deleteButton)


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

    
