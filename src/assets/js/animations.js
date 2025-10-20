function animationMain() {
  gsap.registerPlugin(ScrollTrigger);

// Inicjalizacja Lenis
const lenis = new Lenis({
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  duration: 1,
  lerp: 0.1,
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
  wheelMultiplier: 0.7,
  infinite: false,
  autoResize: true
});

// Funkcja przewijania do sekcji
function scrollToSection(targetPosition) {
  lenis.scrollTo(targetPosition);
}

// Obsługa linków kotwicowych
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const currentScroll = window.scrollY;
      let offsetPosition;

      if (elementPosition > currentScroll) {
        offsetPosition = elementPosition - 10; 
      } else {
        offsetPosition = elementPosition - 125; 
      }
      scrollToSection(offsetPosition);
    }
  });
});

// Zapobiegaj przewijaniu przy ładowaniu strony
window.addEventListener("load", () => {
  window.scrollTo(0, 0); // Ustaw przewijanie na samą górę
  lenis.scrollTo(0, { immediate: true }); // Ustaw natychmiast Lenis na górę
});

// Synchronizacja Lenis i ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});


if (window.matchMedia("(min-width: 767px)").matches) {

// Headings --------------------------------------------------------------

let splitTextChars = [...document.querySelectorAll('.split-chars')];

splitTextChars.forEach(element =>{
  new SplitText(element, { 
    type: "words",
    wordsClass: "word"
  });
  let mySplitText = new SplitText(element, {
    type:"chars",
    charsClass: "char"
  });
  
   gsap.from(mySplitText.chars, {
       autoAlpha: 0,
       opacity: 0,
	   filter: "blur(5px)",
       // yPercent: 70,
       duration: .7,
       delay: .3,
       stagger: {
         amount: 0.2,
         from: "0"
       },
       scrollTrigger: { 
         trigger: element,
         //toggleActions: 'restart pause reverse pause',
       },
   })
});


  // Paragraph --------------------------------------------------------------
  if (document.querySelector(".split-lines")) {
    let splitTextLines = [...document.querySelectorAll(".split-lines")];
    splitTextLines.forEach((element) => {
      let mySplitText = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      new SplitText(element, {
        type: "lines",
        linesClass: "line-parent",
      });
      gsap.from(mySplitText.lines, {
        duration: .5,
        delay: .3,
        stagger: 0.05,
        yPercent: 105,
        ease: "power3",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          //toggleActions: 'restart pause reverse pause',
        },
      });
    });
  };

  const textHighlights = document.querySelectorAll(".text-highlight");
  textHighlights.forEach((textHighlight) => {
    const splitText = new SplitText(textHighlight, {
      type: "lines, chars",
      charsClass: "char-highlight"
    });
    const tlh = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlight, 
        scrub: 1,
        start: "top 70%", 
        end: "bottom 80%" 
      }
    });
    tlh.from(".char-highlight", {
      opacity: 0.2,
      stagger: 0.3
    });
  });
  
  // Fade in
  /*
  const fadeIn = gsap.utils.toArray(".fade-in");
  fadeIn.forEach((fadeInItem) => {
    gsap.from(fadeInItem, {
      opacity: 0,
      duration: 1,
      delay: .1,
      scrollTrigger: {
        trigger: fadeInItem,
        start: "top 95%",
      },
    });
  });
  */
  const boxes = gsap.utils.toArray('.fade-in');

  boxes.forEach((fadeElement, i) => {
    const anim = gsap.fromTo(fadeElement, {
      autoAlpha: 0, 
      y: 30}, {
        duration: .6, 
        delay: .3,
        autoAlpha: 1, 
        ease: "power3",
        y: 0
      });
    ScrollTrigger.create({
      trigger: fadeElement,
      animation: anim,
      once: true,
    });
  });

   const boxesIn = gsap.utils.toArray('.fade');

  boxesIn.forEach((fadeElement, i) => {
    const anim = gsap.fromTo(fadeElement, {
      autoAlpha: 0, 
      opacity: 0}, {
        duration: .6, 
        delay: .3,
        autoAlpha: 1, 
        ease: "power3",
        opacity: 1
      });
    ScrollTrigger.create({
      trigger: fadeElement,
      animation: anim,
      once: true,
    });
  });


  // Line animation
  const lineX = gsap.utils.toArray(".line-x");
  lineX.forEach((lineXItem) => {
    gsap.from(lineXItem, {
      width: "0",
      duration: .6,
      delay: .3,
      ease: Power2.easeInOut,
      scrollTrigger: {
        trigger: '.line-x',
        start: "top 90%",
      },
    });
  });

    // Parallax
      gsap.utils.toArray(".parallax-wrap").forEach(function (container) {
        let image = container.querySelector("picture img");
        gsap.set(".parallax-wrap", {overflow: "hidden"});
  
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
          },
        });
        tl.from(image, {
          yPercent: -9,
          ease: "none",
        }).to(image, {
          yPercent: 9,
          ease: "none",
        });
      });

  // Footer parallax
    gsap.from(".footer-parallax", {
      opacity: 0,
      y: "-25%",
      scrollTrigger: {
        trigger: ".footer-parallax",
        start: "top bottom",
        end: "bottom 85%",
        scrub: true,
      },
    });

  // Magnetic
  var magnets = document.querySelectorAll('.magnetic');
  var magnetText = document.querySelectorAll("xt");
  var strength = 100;

  if(window.innerWidth > 767){
    // Mouse Reset
    magnets.forEach( (magnet) => {
      magnet.addEventListener('mousemove', moveMagnet );
      // $(this.parentNode).removeClass('not-active');
      magnet.addEventListener('mouseleave', function(event) {
        gsap.to( event.currentTarget, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
        gsap.to( magnetText, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
      });
    });

    // Mouse move
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      var magnetsStrength = magnetButton.getAttribute("data-strength");
      var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
      var magnetText = magnetButton.querySelector(".btn-text");

      gsap.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
        rotate: '0.005deg',
        ease: 'Power4.easeOut'
      });
      gsap.to( magnetText, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
        rotate: '0.001deg',
        ease: 'Power4.easeOut'
      });
    }
  }; 

     // Scroll progress
     if (window.matchMedia("(min-width: 767px)").matches) {
      gsap.to(".scrollprogress", {
       height: "100vh",
       ease: 'none',
       scrollTrigger: { 

         trigger: ".scrollContainer",
         start: "top 0%",
         end: "bottom 100%",
         scrub: true,
       }
     });
     };
    };

         // Nav menu
         const menuToggle = document.getElementById("menuToggle");
         const menuLinks = document.querySelectorAll(".main-menu a");
         const menuBar = gsap.timeline();
         var tl = gsap.timeline({ paused: true});
         tl.to('.fullpage-menu', {
             duration: 0,
             display: "block",
             ease: 'Expo.easeInOut',
         });
         tl.from('.menu-bg', {
             duration: .6,
             opacity: 0,
             ease: 'Expo.easeInOut'
         });
         tl.from('.main-menu li a', {
             duration: 1,
             y:"110%",
             stagger: 0.05,
             ease: 'Expo.easeInOut'
         }, "-=0.6");
         tl.from('.line-xh', {
          duration: 1,
          stagger: .1,
          width: "0",
          ease: 'Expo.easeInOut'
         }, "-=0.5");
         tl.reverse();
         
         menuToggle.addEventListener('click', function(){
             menuBar.reversed(!menuBar.reversed());
             tl.reversed(!tl.reversed());
           // menuWrap.classList.toggle("active");
         });
         menuLinks.forEach(link => {
          link.addEventListener('click', function () {
              menuBar.reversed(!menuBar.reversed());
              tl.reversed(!tl.reversed());
              document.querySelector("body").classList.remove("menu-open");
          });
      });
  // End animation 
}

function addMenuClass() {
  MenuClass = document.querySelector("body");
  MenuToggle = document.querySelector(".menu-toggle");
  MenuToggle.addEventListener('click', () => {
    MenuClass.classList.toggle("menu-open");
  });
}
addMenuClass();
function removeMenuClass() {
  document.querySelector("body").classList.remove("menu-open");
}
