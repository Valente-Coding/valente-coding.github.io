const PageTags = ["HomePageContainer", "ResumePageContainer"];
var TopBarContainer = undefined;

function ShowPage(p_selectedTopBarButton, p_pageTag) {
    PageTags.forEach(l_tag => {
        const l_element = document.getElementsByClassName(l_tag)[0];
        if (l_element) {
            l_element.style.display = l_tag === p_pageTag ? 'block' : 'none';
        }
    });

    TopBarContainer.getElementsByClassName("Selected")[0].classList.remove("Selected");
    p_selectedTopBarButton.classList.add("Selected");
}

window.addEventListener("load", (p_event) => {
    TopBarContainer = document.getElementsByClassName("TopBarContainer")[0];
});