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
        const l_rotateX = (l_deltaY / l_centerY) * 25; // Max rotation of 25 degrees
        const l_rotateY = (l_deltaX / l_centerX) * -25; // Max rotation of 25 degrees
        CVImageCard.style.transform = `rotateX(${l_rotateX}deg) rotateY(${l_rotateY}deg)`;
    });

    CVImageContainer.addEventListener("mouseleave", (e) => {
        CVImageCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});