// Select the element
const clbContentWrapper = document.querySelector("#clbContentWrapper");

// Calculate and log the height
const height = clbContentWrapper ? clbContentWrapper.getBoundingClientRect().height : 0;
console.log("Height of #clbContentWrapper:", height);


var wpContent = {
    init: function () {
        var c = wpContent;

        c.stickyHeader.init();
        c.menuTapped.init();
        c.initialAnimation.init();
        c.readMoreBtn.init();// Initialize the animation for the first screen
        //c.parallaxScroll.init();
        c.scrollDownBtn.init();

    },
    stickyHeader: {
        init: function () {

            var lastScrollTop = 0;

            $(window).on('scroll', function () {

                var scrollTop = $(this).scrollTop()

                if (scrollTop > lastScrollTop) {
                    // Down
                    if (scrollTop >= 1) {

                        if (!$('.header').hasClass('sticky')) {
                            $('.header').addClass('sticky')
                        }

                    }
                } else {
                    // Up

                    if (scrollTop <= 0) {

                        if ($('.header').hasClass('sticky')) {
                            $('.header').removeClass('sticky')
                        }

                    }
                }

                lastScrollTop = scrollTop
            })

        }
    },
    menuTapped: {
        init: function () {
            $('#menuToggle').on('click', function () {
                $(this).toggleClass('active');
                $('#menuOverlay').toggleClass('active');
            });

            $('.menu-list a').on('click', function () {
                $('#menuOverlay').removeClass('active');
                $("#menuToggle").removeClass('active');
            });

            

        }
    },
    readMoreBtn: {
        init: function () {
            $(".btn-read-more").click(function () {
                const moreContent = $(this).parent().find(".more-content");
                moreContent.slideToggle(400, () => {
                    // Check if the content is visible after the animation completes
                    const buttonText = moreContent.is(":visible") ? "Read Less" : "Read More";
                    $(this).text(buttonText);  // Update the button text
                });
            });
        }
    },
    scrollDownBtn: {
        init: function () {
            $("#btn-down").click(function () {
                
            });
        }
    },

    
    initialAnimation: {
        init: function () {
            var c = wpContent;

            var $video = $("#strokeVideo");



            // Play the video when the page loads
            $video.get(0).play();

            // Listen for the video to end
            $video.on('ended', function () {
                // Hide the video element after it finishes playing
                $(this).get(0).pause();

                // Create a timeline for the initial animations
                let tl = gsap.timeline();

                // Add animations to the timeline
                tl
                    .fromTo('.main-heading',
                        { y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        }
                    )
                    .fromTo('.main-visual',
                        { y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        },
                        "-=0.1" // Start slightly before the previous animation ends
                    )
                    .fromTo('.btn-round-arrow-up',
                        { y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            display: 'flex',
                            duration: 0.5,
                            ease: "power2.out",
                            onComplete: function () {
                                // Add bounce effect after the button appears
                                gsap.to('.btn-round-arrow-up', {
                                    y: -20,
                                    duration: 0.5,
                                    ease: "bounce.out",
                                    yoyo: true,
                                    repeat: 2,
                                    onComplete: function () {
                                        document.getElementById("main-scroll-container").style.height = "unset"
                                        c.parallaxScroll.init();

                                    }
                                });
                            }
                        },
                        "-=0.1" // Start slightly before the previous animation ends
                    );

                // Play the timeline
                tl.play();

            });

            gsap.registerPlugin(ScrollTrigger);


            var tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".towards-nafa-100",
                    start: "top 95px",
                    end: "bottom top",
                    scrub: 2,
                    markers: false,
                },
                duration: 1
            });





            // Change opacity of the main heading on scroll
            tl2.to(".main-heading",
                {
                    opacity: 0,
                    ease: "none",
                    duration: 0.2,
                },
                0 // Start at the beginning of the timeline
            );

            tl2.to("#btn-down",
                {
                    opacity: 0,  // Fade out to fully transparent
                    ease: "power2.out",  // Smooth easing for the transition
                    duration: 0.1,  // Longer duration for a slower fade out
                }, 0
            );

            tl2.fromTo("#content", {
                y: 100,  // Start below the viewport
                opacity: 0,  // Start fully transparent
            }, {
                y: 50,  // Move to its original position
                opacity: 1,  // Fade to full opacity
                ease: "power2.out",  // Smooth easing for the transition
                duration: 0.1
            }, 0);

        }
    },
    parallaxScroll: {

        init: function () {
            console.log("parallax");
            var tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".chairman-message",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                    markers: false,
                    pin: true,
                    pinSpacing: false,
                    // snap: {
                    //     snapTo: [0,0.2,1], // Snap to timeline labels
                    //     duration: 2, // Reduced snap duration
                    //     delay: 1, // Small delay before snapping
                    //     inertia: false // Disable inertia for more direct control
                    // },
                    onEnter: () => {
                        let video = document.getElementById("strokeVideo-chairman");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                    onEnterBack: () => {
                        let video = document.getElementById("strokeVideo-chairman");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                },
                duration: 1
            })

            // First snap stop
            tl3
                .to('#chairManSubHeading', {
                    opacity: 1,
                    top: 'calc(50vh + 50px)',
                    duration: 0.3,
                    ease: "power2.out",

                }, 0)
                .to('.spark', {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }, 0);

            // Second snap stop
            tl3
                .to('#chairManSubHeading', {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.4)
                .to('.spark', {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.4);

            // Third snap stop
            tl3
                .to('.content-wrapper-message', {
                    opacity: 1,
                    top: 'calc(50vh + 50px)',
                    duration: 0.2,
                }, 0.6);
            //Second snap stop



            var tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".Ldship-Spot",
                    start: "top top",
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                    scrub: 2,
                    markers: false,
                    onEnter: () => {
                        let video = document.getElementById("strokeVideo-leadership");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.add('bg-white');
                    },
                    onEnterBack: () => {
                        let video = document.getElementById("strokeVideo-leadership");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.add('bg-white');
                    },
                },
                duration: 1
            });


            tl4.to("#ldrSubHeading",
                {
                    top: 'calc(50vh + 50px)',
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0);
            tl4.to(".artStudent",
                {
                    bottom: "calc(66.6% + 39vh)",
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0);


            tl4.to("#ldrSubHeading",
                {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.3);
            tl4.to(".artStudent",
                {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.3);

            tl4.to("#ldrContentWrapper",
                {
                    top: "calc(50vh + 76px)",
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.5);

            tl4.to("#ldrContentWrapper",
                {

                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.5);


            var tl5 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".number-hightlight",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                    onEnter: () => {
                        let video = document.getElementById("strokeVideo-number");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                    onEnterBack: () => {
                        let video = document.getElementById("strokeVideo-number");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                    duration: 1
                },
            });


            tl5.to("#subheadingNumber",
                {
                    top: 'calc(50vh + 50px)',
                    opacity: 1,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0);

            tl5.to(".school-theatre",
                {
                    bottom: 'calc(85.71% + 63vh)',
                    opacity: 1,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0);


            tl5.to("#subheadingNumber",
                {
                    opacity: 0,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0.2);

            tl5.to(".school-theatre",
                {
                    opacity: 0,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0.2);

            tl5.fromTo("#numbersSlider",
                {
                    opacity: 0,
                    y: "70vh",
                },
                {
                    y: "5vh",
                    opacity: 1,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0.3);


            tl5.to(".slider-container",
                {
                    transform: "translateX(-42%)",
                    duration: 0.5,
                    ease:"none"
                }, 0.4);

            tl5.to("#slide-1",
                {
                    opacity: 0.3,
                    transform: "scale(0.6)",
                    duration: 0.1,
                    ease: "none"
                }, 0.4);
            tl5.to("#slide-2",
                {
                    opacity: 1,
                    transform: "scale(1)",
                    duration: 0.1,
                    ease: "none"
                }, 0.4);


                tl5.to("#slide-2",
                    {
                        opacity:0.3,
                        transform: "scale(0.6)",
                        duration:0.1,
                        ease:"none"
                    }, 0.5);
                    tl5.to("#slide-3",
                        {
                            opacity:1,
                            transform: "scale(1)",
                            duration:0.1,
                            ease:"none"
                        }, 0.5);


                        tl5.to("#slide-3",
                            {
                                opacity:0.3,
                                transform: "scale(0.6)",
                                duration:0.1,
                                ease:"none"
                            }, 0.6);
                            tl5.to("#slide-4",
                                {
                                    opacity:1,
                                    transform: "scale(1)",
                                    duration:0.1,
                                    ease:"none"
                                }, 0.6);


                                tl5.to("#slide-4",
                                    {
                                        opacity:0.3,
                                        transform: "scale(0.6)",
                                        duration:0.1,
                                        ease:"none"
                                    }, 0.7);
                                    tl5.to("#slide-5",
                                        {
                                            opacity:1,
                                            transform: "scale(1)",
                                            duration:0.1,
                                            ease:"none"
                                        }, 0.7);


                                        tl5.to("#slide-5",
                                            {
                                                opacity:0.3,
                                                transform: "scale(0.6)",
                                                duration:0.1,
                                                ease:"none"
                                            }, 0.8);
                                            tl5.to("#slide-6",
                                                {
                                                    opacity:1,
                                                    transform: "scale(1)",
                                                    duration:0.1,
                                                    ease:"none"
                                                }, 0.8);


// Collaboration
var tl6 = gsap.timeline({
    scrollTrigger: {
        trigger: ".tri-collaboration",
        start: "top top",
        end: () => "+=10000", // Adjust as needed
       // end: "bottom bottom",
        scrub: 4,
        pin: true,
        pinSpacing: true,
        markers: false , // Set to true for debugging, false for production
        onEnter: () => {
            let video = document.getElementById("strokeVideo-collab");
            video.play();
            let header = document.querySelector('.header');
            header.classList.remove('bg-white');
        },
        onEnterBack: () => {
            let video = document.getElementById("strokeVideo-collab");
            video.play();
            let header = document.querySelector('.header');
            header.classList.remove('bg-white');
        },

    },
});
            
            
                        tl6.to("#subheadingCollab",
                            {
                                top: 'calc(50vh + 50px)',
                                opacity: 1,
                                duration: 0.5,
                                ease: "power2.out"
                            }, 0);
            
                            tl6.to(".student-laptop",
                                {
                                    bottom: 'calc(66.6% + 63vh)',
                                    opacity: 1,
                                    duration:0.5,
                                    ease: "power2.out"
                                }, 0);
            
            
                                tl6.to("#subheadingCollab",
                                    {
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: "power2.out"
                                    }, 1);

                                    tl6.to(".collaboration-lead-in",
                                        {
                                            opacity: 1,
                                            duration: 0.5,
                                            ease: "power2.out"
                                        }, 2);

                                        tl6.to(".collaboration-lead-in",
                                            {
                                                opacity: 0,
                                                duration: 0.5,
                                                ease: "power2.out"
                                            }, 3);
                    
                                    tl6.to(".student-laptop",
                                        {
                                            opacity: 0,
                                            duration: 0.5,
                                            ease: "power2.out"
                                        }, 3);
                                            
                                            tl6.fromTo("#clbContentWrapper", {
                                                display:"none",
                                                y: "70vh",
                                                
                                            }, {
                                                display:"flex",
                                                y: "70vh",
                                                yPercent: -100,
                                                duration:9,
                                                ease: "none"
                                            },3);
                                                    // tl6.fromTo("#clbContentWrapper", {
                                                    //     display:"none",
                                                    //     y: "70vh",
                                                    // }, {

                                                    //     top: "110px",
                                                    //     display:"flex",
                                                    //     y: "-70vh",
                                                    //     yPercent: -100,
                                                    //     duration:180,
                                                    //     opacity: 1,
                                                    //     stagger: 4
                                                    // },0.5);

                                                  
            //Leaping
            var tl7 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".leaping-forward",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                    onEnter: () => {
                        let video = document.getElementById("strokeVideo-leaping");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.add('bg-white');
                    },
                    onEnterBack: () => {
                        let video = document.getElementById("strokeVideo-leaping");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.add('bg-white');
                    },
                    duration: 1
                },
            });


            tl7.to("#subheadingLeaping",
                {
                    top: 'calc(50vh + 50px)',
                    opacity: 1,
                    duration:1,
                    ease: "power2.out"
                }, 0);

            tl7.to(".fashion-student",
                {
                    bottom: 'calc(66.6% + 63vh)',
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, 0);


            tl7.to("#subheadingLeaping",
                {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                }, 2);

            tl7.to(".leaping-lead-in",
                    {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    }, 3);

            tl7.to(".leaping-lead-in",
                        {
                            opacity: 0,
                            duration: 5,
                            ease: "power2.out"
                        }, 5);

            tl7.to(".fashion-student",
                {
                    opacity: 0,
                    duration: 5,
                    ease: "power2.out"
                }, 5);

                tl7.fromTo("#leapingContentWrapper",
                    {
                        opacity: 0,
                        y: '100vh',
                    },
                    {
                        top: "110px",
                        y: 'calc(0vh + 110px)',
                        opacity: 1,
                        duration: 9,
                        ease: "power2.out",
    
                    }, 10);


            const large = document.querySelector(".leaping-con-right");

            gsap.to(large, {
                y: () => (window.innerHeight - large.clientHeight - 150),
                ease: "none",
                scrollTrigger: {
                    trigger: ".leaping-con",
                    pin: true,
                    pinSpacing: false,
                    start: "top top",
                    end: () => `+=${large.offsetHeight+100}`,
                    scrub: 2,
                    
                    // invalidateOnRefresh: true,
                }
            });



            //Giving Back
            var tl8 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".giving-back",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                    onEnter: () => {
                        let video = document.getElementById("strokeVideo-giving");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                    onEnterBack: () => {
                        let video = document.getElementById("strokeVideo-giving");
                        video.play();
                        let header = document.querySelector('.header');
                        header.classList.remove('bg-white');
                    },
                    duration: 1
                },
            });


            tl8.to("#subheadingGiving",
                {
                    top: 'calc(50vh + 50px)',
                    opacity: 1,
                    duration: 0.3,
                    ease: "none"
                }, 0);

            tl8.to(".music-student",
                {
                    top: "28vh",
                    opacity: 1,
                    duration: 0.3,
                    ease: "none"
                }, 0);

    

            tl8.to("#subheadingGiving",
                {
                    opacity: 0,
                    duration: 0.3,
                    ease: "none"
                }, 0.5);

                tl8.to(".music-student",
                    {
                        opacity: 0,
                        duration: 0.3,
                        ease: "none"
                    }, 0.5);




            


                tl8.fromTo("#givingSlider",
                    {
                        opacity: 0,
                        y: "70vh",
                         // Start from initial horizontal position
                    },
                    {
                        y: "-70vh",
                        opacity: 1,
                        duration: 0.3,
                        ease: "none"
                    }, 0.3);

                    tl8.to(".giving-back-text",
                        { 
                            opacity: 1,
                            duration: 0.3,
                            ease: "none"
                        }, 0.8);


                        tl8.to(".giving-back-text",
                            {
                                y:-50,
                                opacity: 0,
                                duration: 0.1,
                                ease: "none"
                            }, 0.4);
                            let cardDelay=0.5
                            tl8.fromTo(".giving-card-sec",
                                {
                                    display:"flex",
                                    left: "50%",
                                    opacity: 0,
                                    duration: 0.1,
                                    ease: "none"
                                },
                                {
                                    display:"flex",
                                    left: "0%",
                                    opacity: 1,
                                    duration: 0.1,
                                    ease: "none"
                                },
                                cardDelay);
                                 cardDelay+=0.3

                                tl8.to(".giving-card-sec",
                                    {
                                       
                                        opacity: 0,
                                        duration: 0.1,
                                        ease: "none"
                                    }, cardDelay);


                                    tl8.to(".giving-back-info",
                                   
                                        {
                                            display:"flex",
                                            opacity: 1,
                                            duration: 0.1,
                                            ease: "none"
                                        }, 0.7);


                                        tl8.to(".giving-back-info",
                                   
                                            {
                                                display:"flex",
                                                opacity: 0,
                                                duration: 0.3,
                                                ease: "none"
                                            }, 1.2);


                                            tl8.to(".giving-video-sec",
                                                {
                                                   display:"block",
                                                    opacity: 1,
                                                    duration: 0.3,
                                                    ease: "none"
                                                }, 1.5)
                                                .call(()=>{
                                                    t18.scrollTrigger.pin=false
                                                })
                    
                    
        

             

                       



                   

                          

        }
    }


};

$(document).ready(function () {
    wpContent.init();
});
