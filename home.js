let controller;
let slideScene;
let pageScene;

function animateSlides() {
    // Initialize controller
    controller = new ScrollMagic.Controller();

    // select some things
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");

    // Looping over each slide
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector(".hero-img");
        const revealText = slide.querySelector(".reveal-text");

        // GSAP
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        });
        slideTl.fromTo(revealImg, { x: '0%' }, { x: '110%' });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        slideTl.fromTo(revealText, { x: '0%' }, { x: '110%' }, "-=0.8");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

        //  creating a scene
        slideScene = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 0.25,
                reverse: false
            })
            .setTween(slideTl)
            // .addIndicators({ colorStart: "", colorTrigger: "" })
            .addTo(controller);

        //New animation

        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        // create new scene
        pageScene = new ScrollMagic.Scene({
                triggerElement: slide,
                duration: "100%",
                triggerHook: 0
            })
            // .addIndicators({
            //     colorStart: "",
            //     colorTrigger: "",
            //     name: "",
            //     indent: 200
            // })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller);
    });

};

function toggleNav() {
    const navLinks = document.querySelector(".nav-links");
    const contact = document.querySelector(".contact");

    navLinks.classList.toggle("nav-active");
    // contact.classList.toggle("nav-active");
}

const burger = document.querySelector(".burger");
burger.addEventListener("click", toggleNav);

animateSlides();



