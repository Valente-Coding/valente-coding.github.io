const pageTags = ["HomePageContainer", "ResumePageContainer"];
var topBarContainer = undefined;

function ShowPage(selectedTopBarButton, pageTag) {
    pageTags.forEach(tag => {
        const element = document.getElementsByClassName(tag)[0];
        if (element) {
            element.style.display = tag === pageTag ? 'block' : 'none';
        }
    });

    topBarContainer.getElementsByClassName("Selected")[0].classList.remove("Selected");
    selectedTopBarButton.classList.add("Selected");
}

window.addEventListener("load", (event) => {
    topBarContainer = document.getElementsByClassName("TopBarContainer")[0];
});