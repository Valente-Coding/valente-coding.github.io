let canAnimate = true;
let CVCardMarginTop = 5;
let CVCardMarginTopMin = 5;
let CVCardMarginTopMax = -60;

window.addEventListener("load", (event) => {
    const CVImageContainer = document.getElementsByClassName("ResumeImageContainer")[0];
    const CVImageCard = CVImageContainer.getElementsByClassName("ResumeImageCard")[0];

    CVImageContainer.addEventListener("mousemove", (e) => {
        const l_rect = CVImageContainer.getBoundingClientRect();
        const l_x = e.clientX - l_rect.left; // x position within the element.
        const l_y = e.clientY - l_rect.top;  // y position within the element.

        const l_centerX = l_rect.width / 2;
        const l_centerY = l_rect.height / 2;
        const l_deltaX = l_x - l_centerX;
        const l_deltaY = l_y - l_centerY;
        const l_rotateX = (-l_deltaY / l_centerY) * 25; // Max rotation of 25 degrees
        const l_rotateY = (-l_deltaX / l_centerX) * -25; // Max rotation of 25 degrees

        if (canAnimate) {
            CVImageCard.style.transform = `rotateX(${l_rotateX}deg) rotateY(${l_rotateY}deg)`;
        }
    });

    //CVImageContainer.addEventListener("mouseleave", (e) => {
        //CVImageCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    //});

    CVImageCard.addEventListener("mouseenter", (e) => {
        canAnimate = false;
        CVImageCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        
        CVCardMarginTop = 5;
        CVImageCard.style.marginTop = `${CVCardMarginTop}vh`;
    });

    CVImageCard.addEventListener("mouseleave", (e) => {
        canAnimate = true;
        CVImageCard.style.marginTop = `0vh`;
    });

    CVImageCard.addEventListener("wheel", (event) => {
        event.preventDefault();

        CVCardMarginTop += event.deltaY * -0.05;
        CVCardMarginTop = Math.min(Math.max(CVCardMarginTop, CVCardMarginTopMax), CVCardMarginTopMin);
        CVImageCard.style.marginTop = `${CVCardMarginTop}vh`;
    })
});