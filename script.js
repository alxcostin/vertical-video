
const fakePageEl = document.getElementById("page");
let fakePageElHeight = fakePageEl.offsetHeight;

const auxInfoLine1 = document.querySelector(".heightVal");

let windowWidth;
let windowHeight;
let adjustedHeight;

const container = document.getElementById("container");

const height_sliderEl = document.getElementById("height_slider");

const video = document.getElementById("video");

// video elements
const videoTotalTime = document.querySelector(".total-time");
const videoCurrentTime = document.querySelector(".current-time");
const timelineContainer = document.querySelector(".timeline-container");

const title = document.querySelector(".text h1");
const description = document.querySelector(".text h2");


// title values

const msgTitle_long = "Exploring Nature's Trails: The Ultimate Guide to Hiking Adventures, Tips for Beginners, and Discovering Breathtaking Landscapes Around the World";
const msgTitle_medium = "Hiking the Great Outdoors: A Journey Through Nature's Wonders";
const msgTitle_short = "Embarking on Epic Hiking Journeys";
const msgDescription = "Federal budget cuts force the PCTA to scale back trail maintenance, leaving key projects delayed and hikers facing tougher conditions."

const titleOptions = document.querySelectorAll('input[name="titlelength"]');
const descriptionOptions = document.getElementById("description");

descriptionOptions.addEventListener("click", function(){
    if (descriptionOptions.checked) {
        description.classList = "";
    } else {
        description.classList.add("hidden")
    }
})

titleOptions.forEach(radio => {
    radio.addEventListener('click', function() {
        if(this.value === "long") {title.textContent = msgTitle_long;}
        else if(this.value === "medium") {title.textContent = msgTitle_medium;}
        else if(this.value === "short") {title.textContent = msgTitle_short;}
    });
});




// set title
title.textContent = msgTitle_long;
description.textContent = msgDescription;

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
});

function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
        return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }
}


//  Timeline


timelineContainer.addEventListener("mousemove", handleTimelineUpdate);

function handleTimelineUpdate(e) {
    const rect = timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    timelineContainer.style.setProperty("--preview-position", percent);

    // if(true) {
    //     e.preventDefault();
    //     timelineContainer.style.setProperty("--progress-position", percent);
    // }
}


//  - - - - - - - - - - - - - - - -EVENTS - - - - - - - - - - - - - - - - - - 


// PAGE LOAD
function handleLoad() {
    localStorage.removeItem("pageHeight");
    getwindowsize();
    localStorage.setItem("pageHeight", adjustedHeight);
    setfakePageheight();
    setsliderheight();
    setContainerSize();
    updateAuxInfo();
    
}

// Add event listener for the load event
window.addEventListener('load', handleLoad);

// PAGE RESIZE
function handleResize() {
    getwindowsize();
    localStorage.setItem("pageHeight", adjustedHeight);
    setfakePageheight();
    setsliderheight();
    setContainerSize();
    updateAuxInfo();
}

// Add event listener for the resize event
window.addEventListener('resize', handleResize);


// height slider modification
height_sliderEl.addEventListener("input", function () {
    // console.log(height_sliderEl.value);  
    localStorage.setItem("pageHeight", height_sliderEl.value);
    setfakePageheight();
    setContainerSize();
    updateAuxInfo()
});

// aftewr video is loaded do this
video.addEventListener("loadeddata", ()=> {
    videoTotalTime.textContent = formatDuration(video.duration)
});

// when video time updates
video.addEventListener("timeupdate", ()=> {
 videoCurrentTime.textContent = formatDuration(video.currentTime);
 const percent = video.currentTime / video.duration;
 timelineContainer.style.setProperty("--progress-position", percent);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// make fake page element as tall as the viewport on load
function setfakePageheight() {
    fakePageEl.style.height = `${localStorage.getItem("pageHeight")}px`;
}

// set slider max and value as viewport on initial load
function setsliderheight() {
    height_sliderEl.max = localStorage.getItem("pageHeight");
    height_sliderEl.value = localStorage.getItem("pageHeight");
}

function setContainerSize() {
    container.style.height = `${localStorage.getItem("pageHeight")}px`
    setVideoSize();
}

function getwindowsize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    adjustedHeight = windowHeight - 3;
}


function updateAuxInfo() {
    auxInfoLine1.textContent = `Device fake height: ${container.style.height}`
}

function setVideoSize() {
    video.width = localStorage.getItem("pageHeight")/1.7;
}