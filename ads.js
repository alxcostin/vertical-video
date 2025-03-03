// general
var r = document.querySelector(":root");
let widthText = document.querySelector(".widthVal");
let heightText = document.querySelector(".heightVal");

// slider
const width_slider = document.getElementById("width");

// container
const container = document.getElementById("container");

//video 
const video = document.getElementById("video");

let windowWidth;
let windowHeight;

let isHoverableDevice;


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//ON LOAD

// Function to be called on window load
function handleLoad() {
   // get viewport size
   getwindowsize();
   // make container that size (max height)
   setContainerSizeAdjusted();
   updateSildercontrol();
   updateContainerValuesText();
}
// Add event listener for the load event
window.addEventListener('load', handleLoad);


// ON RESIZE

// Function to be called on window resize
function handleResize() {
    // get viewport size
   getwindowsize();
   // make container that size minus slider
   setContainerSizeAdjusted();
   updateSildercontrol();
   updateContainerValuesText();
}

// Add event listener for the resize event
window.addEventListener('resize', handleResize);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// UTILITIES


let ratioA = 215;
let ratioB = 369;

function checkifHoverable() {
    isHoverableDevice = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches;
      return isHoverableDevice;
    }

function getwindowsize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

function setContainerSizeAdjusted() {
    let sliderheight = document.querySelector('.page-controls').offsetHeight + 15;
    container.style.height = `${windowHeight-sliderheight}px`;
    container.style.width = `${Math.ceil((windowHeight-sliderheight)*ratioA/ratioB)}px`;

    adjustVideo(Math.ceil((windowHeight-sliderheight)*ratioA/ratioB))
}

function updateSildercontrol() {
    let sliderheight = document.querySelector('.page-controls').offsetHeight + 15;
    let max_height = Math.ceil((windowHeight-sliderheight)*ratioA/ratioB);
    width_slider.max = max_height; 
    width_slider.value = max_height;
    
}

// the update of read window size
function updateContainerValuesText() {
    widthText.innerHTML = `Container Width: ${container.scrollWidth}px`;
    heightText.innerHTML = `Container Height: ${container.scrollHeight}px`;
  }

  function adjustVideo(width) {
    video.width = width ;
    console.log(width)
  }

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



width_slider.addEventListener("input", function () {
    container.style.width = `${width_slider.value}px`;
    container.style.height = `${(Math.ceil(width_slider.value*ratioB/ratioA))}px`;
    updateContainerValuesText();
    adjustVideo(width_slider.value);
});



