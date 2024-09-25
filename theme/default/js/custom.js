// const slides = document.querySelectorAll('.slider-slide');
// let currentIndex = 0; // Start with Slide 3 in the center

// function updateSlides() {
//   // Remove all classes
//   slides.forEach((slide) => {
//     slide.classList.remove('left', 'active', 'right');
//   });

//   const leftIndex = (currentIndex - 1 + slides.length) % slides.length;
//   const rightIndex = (currentIndex + 1) % slides.length;

//   // Assign classes based on current index
//   slides[leftIndex].classList.add('left');
//   slides[currentIndex].classList.add('active');
//   slides[rightIndex].classList.add('right');
// }

// slides.forEach((slide, index) => {
//   slide.addEventListener('click', () => {
//     if (slide.classList.contains('left')) {
//       currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     } else if (slide.classList.contains('right')) {
//       currentIndex = (currentIndex + 1) % slides.length;
//     }
//     updateSlides();
//   });
// });

// // Initialize the slider with the current configuration
// updateSlides();


let slideIndices = {};

function initSliders() {
  let sliders = document.querySelectorAll('.slideshow-container');
  sliders.forEach((slider, index) => {
    let sliderId = `slider${index + 1}`;
    slider.setAttribute('id', sliderId);
    slideIndices[sliderId] = 1;
    showSlides(slideIndices[sliderId], sliderId);
    
    slider.querySelector('.previous').addEventListener('click', () => plusSlides(-1, sliderId));
    slider.querySelector('.next').addEventListener('click', () => plusSlides(1, sliderId));
  });
}

function plusSlides(n, sliderId) {
  showSlides(slideIndices[sliderId] += n, sliderId);
}

function showSlides(n, sliderId) {
  let i;
  let slides = document.querySelectorAll(`#${sliderId} .imgs-slider`);
  if (n > slides.length) {slideIndices[sliderId] = 1}    
  if (n < 1) {slideIndices[sliderId] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndices[sliderId] - 1].style.display = "flex";  
}

document.addEventListener('DOMContentLoaded', initSliders);


var sectionCoordinates = {
  'chairman-message': 5.35,
  'leadership-spotlight': 12.8,
  'number-highlight': 22.22,
  'a-kaleidoscope-of-triumphs-and-collaborations': 43,
  'leaping-forward-towards-nafa100': 76,
  'giving-back': 86.5,
  'highlights-video': 99.2,
}


function getSectionPercentage(){
 const percentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
 console.log(percentage)
 requestAnimationFrame(getSectionPercentage)
}

getSectionPercentage()



function goToSection(sectionId) {



  const percentage = sectionCoordinates[sectionId];

  const scrollPosition = (document.documentElement.scrollHeight - window.innerHeight) * (percentage / 100);
  window.scrollTo({
    top: scrollPosition
  });
}