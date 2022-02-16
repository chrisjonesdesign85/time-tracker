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
    // timeTxt.innerHTML = ''
    const Clock= {
                totalSeconds: 0,
                start: function () {
                  if (!this.interval) {
                      var self = this;
                      function pad(val) { return val > 9 ? val : "0" + val; }
                      this.interval = setInterval(function () {
                        self.totalSeconds += 1;
                        h= pad(Math.floor(self.totalSeconds / 3600 % 60))
                        m= pad(Math.floor(self.totalSeconds / 60 % 60));
                        s = pad(parseInt(self.totalSeconds % 60));
                              
                        timeTxt.innerHTML = `${h}:${m}:${s}`
                          
                      }, 1000);
                  }
                },
              
                reset: function () {
                  Clock.totalSeconds = null; 
                  clearInterval(this.interval);
                //   document.getElementById("min").innerHTML = "00";
                //   document.getElementById("sec").innerHTML = "00";
                  delete this.interval;
                },
                pause: function () {
                  clearInterval(this.interval);
                  delete this.interval;
                },
              
                resume: function () {
                  this.start();
                },
              
                restart: function () {
                   this.reset();
                   Clock.start();
                }
              }

    // create a play button
    let playBtn = document.createElement("button")
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
    playBtn.classList.add("playBtn")
    
    playBtn.addEventListener('click', () => {
        console.log("play")
        Clock.start()        
    })

    //create a stop button
    let stopBtn = document.createElement("button")
    stopBtn.innerHTML = '<i class="fas fa-stop"></i>'
    stopBtn.classList.add("stopBtn")
    
    stopBtn.addEventListener('click', () => {
        console.log("stop")
        Clock.pause()
        
        
    })

    // create a delete button
    let del = document.createElement("button")
    del.innerHTML = '<i class="fas fa-trash"></i>'
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
   
    
    project(input, Clock)
    

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




// save projects to storage
const saveProjects = () => {
        localStorage.setItem('projects', JSON.stringify(projects))
}

//load projects from storage
const loadProjects = () => {
    const projectsJSON = localStorage.getItem('projects')

    try {
        return projectsJSON ? JSON.parse(projectsJSON) : []
    } catch (e) {
        return []
    }
    
}
    

 // save project object   
const project = (input, Clock) => {
    
    if (input.length > 0) {
        projects.push({
            title: input,
            id: '',
            Clock
        })
    
        saveProjects()
    }
    
}

// document.getElementById("startButton").addEventListener("click", function () { Clock.start(); });
// document.getElementById("pauseButton").addEventListener("click", function () { Clock.pause(); });
// document.getElementById("resumeButton").addEventListener("click", function () { Clock.resume(); });
// document.getElementById("resetButton").addEventListener("click", function () { Clock.reset(); });
// ocument.getElementById("restartButton").addEventListener("click", function () { Clock.restart(); });
