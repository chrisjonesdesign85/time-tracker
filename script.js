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
    //create project DIV
    let newDiv = document.createElement("div")
    newDiv.classList.add("project")
    //create project inner div
    let projectBox = document.createElement("div")
    //title of Project from input field
    // get input text
    let input = document.getElementById("task-input").value;
    // newDiv.appendChild(newCont);
    let h3 = document.createElement("h3")
    h3.innerHTML = input
    newDiv.appendChild(h3)
    
    let cap = h3.textContent
    cap.toUpperCase()
    console.log(h3.textContent)

    
    // create an play button
    let playBtn = document.createElement("button")
    playBtn.innerHTML = '<i class="fas fa-play"></i>'

    playBtn.classList.add("playBtn")
    playBtn.addEventListener('click', () => {
        console.log("play")
    })

    let stopBtn = document.createElement("button")
    stopBtn.innerHTML = '<i class="fas fa-stop"></i>'
    stopBtn.classList.add("stopBtn")

    stopBtn.addEventListener('click', () => {
        console.log("stop")
    } )

    // create a delete button
    let del = document.createElement("button")
    del.classList.add("delete")

    
    projectBox.appendChild(playBtn);
    projectBox.appendChild(stopBtn)
    projectBox.appendChild(del);
    del.innerHTML = "X";
    
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

    
