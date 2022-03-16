//main JS
let interval; // to store the timer values
let projects = [] //store projects
let input = document.getElementById("task-input");
let submit = document.getElementById("task-submit")
let times = document.getElementById("times")

// on load
document.addEventListener('DOMContentLoaded', getProjects)

// add a project when the '+' button is clicked
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

    
    
let time = timeTxt.innerHTML;

    saveLocalProjects(h3.textContent)
    console.log(h3.textContent)
    let Clock= {
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
                              
                        let theTime = timeTxt.innerHTML = `${h}:${m}:${s}`
                          console.log(theTime)
                      }, 1000);
                  }
                },
              
                reset: function () {
                  Clock.totalSeconds = null; 
                  clearInterval(this.interval);
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
            times.removeChild(newDiv)
            removeProject(input);

        } else {
            return true;
        }
    })
    let formText = document.getElementById("task-input")
    formText.value = ""
    project(input)
}



// remove project from storage
const removeProject = (title) => {
const projectTitle = projects.findIndex(function (project) {
    return project.title === title
})

if (projectTitle > -1) {
        projects.splice(projectTitle, 1)
}

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






// storage()
const saveLocalProjects = (project) => {
    // check to see if there is a localStorage for Projects
    let projects;
    if(localStorage.getItem("projects") === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem("projects"))
    }
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects))
    }


//get projects
function getProjects() {
    // check to see if there is a local Storage
    let projects;
    if(localStorage.getItem("projects") === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem("projects"))
    }

    projects.forEach(function(project) {
        
         //create project DIV
    let newDiv = document.createElement("div")
    newDiv.classList.add("project")
    //create project inner div
    let projectBox = document.createElement("div")
    projectBox.classList.add("projectBox")
    //title of Project from input field
    // store the input into a variable named input
    let input = project;
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
    let Clock= {
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
                  console.log(timeTxt.innerHTML)
              }, 1000);
          }
        },
      
        reset: function () {
          Clock.totalSeconds = null; 
          clearInterval(this.interval);
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
    times.removeChild(newDiv)
    removeLocalProjects(input);

} else {
    return true;
}
// removeLocalProjects(project)
})

let formText = document.getElementById("task-input")
formText.value = ""

});
}

const removeLocalProjects = (project) => {
    // check to see if there is a localStorage
    let projects;
    if (localStorage.getItem("projects") === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem("projects"))
    }
    const projectIndex = projects.indexOf(project)
    projects.splice(projectIndex, 1)
    localStorage.setItem('projects', JSON.stringify(projects))

}


// setTimeout(function(){
//     window.location.reload();
// }, 30000);

// save project object   
const project = (input) => {
    
    if (input.length > 0) {
        projects.push({
            title: input
        })
    } 
}
