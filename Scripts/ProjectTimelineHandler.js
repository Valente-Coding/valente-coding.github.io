var TimeBetweenProjects = 15000; // Time in milliseconds between automatic project changes
var PreloadedVideos = {}; // Object to store preloaded video blobs
var Projects = [ 
    {
        "ProjectName": "Venci's Adventures",
        "ProjectDescription": "Dive into the world of Vencis and tackle cybersecurity challenges where mastering complex topics becomes effortlessly engaging. Let's game, learn, and secure!",
        "ProjectTasks": ["Built UI minigames", "Created production tools", "Integrated 2D assets", "Redesigned audio system"],
        "ProjectTags": ["Internship", "Singleplayer", "eLearning"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/VencisAdventures.png",
        "ProjectVideo": "Images/VencisAdventures.mp4",
        "ProjectVideoLink": "https://www.linkedin.com/posts/emvenci_lets-game-learn-and-secure-activity-7117422051514023936-N7AB",
        "ProjectSourceLink": "https://www.emvenci.com/products/games#venci",
    },
    {
        "ProjectName": "Mar Made Sushi",
        "ProjectDescription": "Mar Made Sushi is a fun multiplayer prototype where players must work together to manage a restaurant. Collaborate with your teammates to fish for ingredients, cook delicious dishes, and host clients efficiently. Teamwork and coordination are key to keeping the restaurant running smoothly and satisfying your customers.",
        "ProjectTasks": ["Built core gameplay", "Added multiplayer support", "Created order system", "Designed fishing mechanics"],
        "ProjectTags": ["University Project", "Online Multiplayer", "Strategy"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/MarMadeSushi.png",
        "ProjectVideo": "Images/MarMadeSushi.mp4",
        "ProjectVideoLink": "https://youtu.be/4pTJCFrdATc",
        "ProjectSourceLink": "https://github.com/Valente-Coding/MarMadeSushi",
    },
    {
        "ProjectName": "Deep Anomaly",
        "ProjectDescription": "Deep Anomaly is a local multiplayer party game where players must compete to catch the most fish avoiding the ones with anomalies.",
        "ProjectTasks": ["Added local multiplayer", "Created fishing system", "Designed scoring system", "Built anomaly detection"],
        "ProjectTags": ["Game Jam", "Local Multiplayer", "Party"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/DeepAnomaly.png",
        "ProjectVideo": "Images/DeepAnomaly.mp4",
        "ProjectVideoLink": "https://kofkof.itch.io/deep-anomaly",
        "ProjectSourceLink": "https://github.com/Valente-Coding/Deep-Anomalies",
    },
    {
        "ProjectName": "Mix & Serve",
        "ProjectDescription": "In Mix & Serve you impersonate a bartender in a busy bar. You must quickly mix and serve drinks to your customers while managing your time and resources effectively. Your goal is to have enough money to pay your rent at the end of the day.",
        "ProjectTasks": ["Created mixing system", "Designed customer AI", "Built time management", "Added resource tracking"],
        "ProjectTags": ["Game Jam","Singleplayer", "Simulation"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/MixAndServe.png",
        "ProjectVideo": "Images/MixAndServeFast.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "https://kofkof.itch.io/mixserve",
    },
    {
        "ProjectName": "Comedy Showdown",
        "ProjectDescription": "Your goal is to write your own jokes to different people based on their likings. Each person has a different sense of humor, so you must choose the right joke to make them laugh. If you tell a joke that they don't like, they will get angry. If you fail at least 3 times, you lose the game.",
        "ProjectTasks": ["Created dynamic joke system", "Designed character AI", "Built humor preferences", "Added failure mechanics"],
        "ProjectTags": ["Game Jam", "Singleplayer", "Comedy"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/ComedyShowdown.png",
        "ProjectVideo": "Images/ComedyShowdown.mp4",
        "ProjectVideoLink": "https://youtu.be/CxKWM5Gb2Qs",
        "ProjectSourceLink": "https://kofkof.itch.io/comedy-showdown",
    },
    {
        "ProjectName": "Sudoku 48H",
        "ProjectDescription": "Sudoku48H is a project developed as part of a 48-hour challenge to test the developer's skills. The objective was to create a functional Sudoku game in Unity without referencing online resources. The project was completed in under 14 hours, with a significant portion of time spent refining the UI rather than the core game logic.",
        "ProjectTasks": ["Built Sudoku algorithm", "Designed user interface", "Added validation system", "Created grid generator", "Responsive UI/UX"],
        "ProjectTags": ["Challenge", "Singleplayer", "Strategy"],
        "ProjectSoftwareLogos": ["Unity"],
        "ProjectImage": "Images/Sudoku48h.png",
        "ProjectVideo": "Images/Placeholder.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "https://kofkof.itch.io/sudoku-48h",
    }
]

var CurrentDisplayedProject = -1;
var ProjectToDisplay = 0;

function LoadProjects() {
    let l_timelineContainer = document.getElementsByClassName("ProjectsTimelineList")[0];

    l_timelineContainer.innerHTML = "";

    for (let i = 0; i < Projects.length; i++) {
        let l_project = Projects[i];

        let l_card = 
        '<div class="ProjectTimelineCard" onmouseup="LoadProject(' + i + ')">'+
            '<div class="ProjectTimelineLine">'+
                '<div class="ProjectTimelineLineProgress"></div>'+
            '</div>'+

            '<div class="ProjectTimelineCardInfo">'+
                '<div class="ProjectTimelineImage" style="background-image: url(\'' + l_project.ProjectImage + '\');">' +
                    '<div class="ProjectTimelineSoftwareLogos">' + l_project.ProjectSoftwareLogos.map(logo => '<div class="SoftwareLogoContainer"><div class="SoftwareLogo" style="background-image: url(Images/' + logo + '.png);"></div></div>').join('') + '</div>'+
                '</div>'+
                '<div class="ProjectTimelineInfoContainer">'+
                    '<div class="ProjectTimelineTitle bebas-neue-regular">' + l_project.ProjectName + '</div>'+
                    '<ul class="ProjectTimelineGameTasks martel-sans-bold"><li>' + l_project.ProjectTasks.join('</li><li>') + '</li></ul>'+
                '</div>'+
            '</div>'+
        '</div>';

        l_timelineContainer.innerHTML += l_card;
    }

    l_timelineContainer.addEventListener('wheel', TransformScrollSideways);
}

function DisplayProject(p_index) {
    let l_project = Projects[p_index];

    // Update the project display section
    document.getElementsByClassName("VideoInfoTitle")[0].innerText = l_project.ProjectName;
    document.getElementsByClassName("ProjectTimelineGameTags")[0].innerHTML = l_project.ProjectTags.map(tag => '<span>' + tag + '</span>').join('');
    document.getElementsByClassName("VideoInfoDesc")[0].innerText = l_project.ProjectDescription;
    document.getElementsByClassName("VideoInfoPlayButton")[0].dataset.video = l_project.ProjectVideoLink;
    document.getElementsByClassName("VideoInfoMoreButton")[0].dataset.source = l_project.ProjectSourceLink;
    
    document.getElementsByClassName("VideoInfoPlayButton")[0].style.display = l_project.ProjectVideoLink == "" ? "none" : "grid";
    document.getElementsByClassName("VideoInfoMoreButton")[0].style.display = l_project.ProjectSourceLink == "" ? "none" : "grid";

    // Remove active class from previous active card
    document.getElementsByClassName("ActiveProjectCard")[0]?.classList.remove("ActiveProjectCard");


    // Add BeforeActiveProjectCard class to all previous cards
    let l_cards = document.getElementsByClassName("ProjectTimelineCard");
    for (let i = 0; i < Projects.length; i++) {

        if (i < p_index && !l_cards[i].classList.contains("BeforeActiveProjectCard"))
            l_cards[i].classList.add("BeforeActiveProjectCard");
        else if (i >= p_index && l_cards[i].classList.contains("BeforeActiveProjectCard"))
            l_cards[i].classList.remove("BeforeActiveProjectCard");
    }

    l_cards[p_index].classList.add("ActiveProjectCard");

    if (CurrentDisplayedProject >= 0)
        l_cards[CurrentDisplayedProject].getElementsByClassName("ProjectTimelineLineProgress")[0].removeEventListener("animationend", LoadNextProject, false); // Remove event listener from previous card
    
    l_cards[p_index].getElementsByClassName("ProjectTimelineLineProgress")[0].addEventListener("animationend", LoadNextProject, false); // Add event listener to new active card
    
    ScrollIntoViewHorizontally(document.getElementsByClassName("ProjectsTimelineList")[0], l_cards[p_index]);

    if (document.getElementsByClassName("BackgroundVideoFade")[0].classList.contains("ActiveFade"))
        document.getElementsByClassName("BackgroundVideoFade")[0].classList.remove("ActiveFade");

    // Clear any existing interval to stop auto-advancing when a card is clicked
    if (window.projectInterval) {
        clearInterval(window.projectInterval);
    }

    CurrentDisplayedProject = p_index;
}

function LoadProject(p_index) {
    let l_project = Projects[p_index];

    var l_video = document.getElementsByClassName("BackgroundVideo")[0]
    l_video.pause();
    l_video.currentTime = 0;

    if (l_video.src.includes(l_project.ProjectVideo)) {
        l_video.load();

        ReloadCurrentProject(p_index);
        return;
    }

    l_video.src = PreloadedVideos[p_index] //|| "https://valente-coding.github.io/" + l_project.ProjectVideo;

    ProjectToDisplay = p_index;
}

function CanPlayVideo() {
    if (ProjectToDisplay == CurrentDisplayedProject) return;

    var l_video = document.getElementsByClassName("BackgroundVideo")[0]

    l_video.play();
    DisplayProject(ProjectToDisplay);

    document.getElementsByClassName("WebsiteLoadingScreen")[0].classList.remove("Active");
    document.getElementsByClassName("ProjectsTimelineContainer")[0].classList.remove("Unloaded")
    document.getElementsByClassName("VideoInfoContainer")[0].classList.remove("Unloaded")
}

function LoadNextProject() {
    document.getElementsByClassName("VideoInfoContainer")[0].classList.add("Unloaded")
    document.getElementsByClassName("BackgroundVideoFade")[0].classList.add("ActiveFade");

    setTimeout(() => {
        LoadProject(CurrentDisplayedProject == Projects.length - 1 ? 0 : CurrentDisplayedProject + 1);
    }, 1000);
}

function ReloadCurrentProject(p_index) {
    var l_activeCardTimelineBar = document.getElementsByClassName("ActiveProjectCard")[0].getElementsByClassName("ProjectTimelineLineProgress")[0];
    if (!l_activeCardTimelineBar) return;

    // Restart the animation
    l_activeCardTimelineBar.style.animation = 'none';
    l_activeCardTimelineBar.offsetHeight; // Trigger a reflow, flushing the CSS changes
    l_activeCardTimelineBar.style.animation = null;

    // Clear any existing interval to stop auto-advancing when a card is clicked
    if (window.projectInterval) {
        clearInterval(window.projectInterval);
    }

    window.projectInterval = setInterval(() => {
        document.getElementsByClassName("VideoInfoContainer")[0].classList.add("Unloaded")
        document.getElementsByClassName("BackgroundVideoFade")[0].classList.add("ActiveFade");
        setTimeout(() => {
            LoadProject(p_index == Projects.length - 1 ? 0 : p_index + 1);
        }, 1000);
    }, TimeBetweenProjects);
}

function TransformScrollSideways(event) {
    if (!event.deltaY) {
        return;
    }

    event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    event.preventDefault();
}

const ScrollIntoViewHorizontally = (p_container, p_child) => {
    const l_childOffsetLeft2 = p_child.offsetLeft + p_child.offsetWidth;
    const l_containerScrollLeft2 = p_container.scrollLeft + p_container.offsetWidth;
    const l_extraMargin = parseFloat(window.getComputedStyle(document.getElementsByClassName("ProjectsTimelineList")[0], "::after").getPropertyValue("width").replace("px", ""));

    p_container.scroll({
        left: l_childOffsetLeft2 - l_containerScrollLeft2 + l_extraMargin,
        top: 0,
        behavior: 'smooth'
    })
};


function RecreateNode(l_element, l_withChildren) {
    if (l_withChildren) 
    {
        l_element.parentNode.replaceChild(l_element.cloneNode(true), l_element);
    }
    else 
    {
        var l_newEl = l_element.cloneNode(false);
        while (l_element.hasChildNodes()) l_newEl.appendChild(l_element.firstChild);
            l_element.parentNode.replaceChild(l_newEl, l_element);
    }
}

function OpenVideo() {
    let l_videoLink = document.getElementsByClassName("VideoInfoPlayButton")[0].dataset.video;

    if (l_videoLink && l_videoLink != "")
        window.open(l_videoLink, '_blank').focus();
}

function OpenMoreInfo() {
    let l_sourceLink = document.getElementsByClassName("VideoInfoMoreButton")[0].dataset.source;

    if (l_sourceLink && l_sourceLink != "")
        window.open(l_sourceLink, '_blank').focus();
}

function PreloadAllVideos() {
    document.getElementsByClassName("BackgroundVideo")[0].oncanplay = CanPlayVideo;

    PreloadVideo(0);
}

function PreloadVideo(p_Index) {
    if (p_Index >= Projects.length) {
        return;
    }

    const videoUrl = "https://valente-coding.github.io/" + Projects[p_Index].ProjectVideo;
    
    fetch(videoUrl)
        .then(response => response.blob())
        .then(blob => {
            PreloadedVideos[p_Index] = URL.createObjectURL(blob);

            if (ProjectToDisplay === p_Index) {
                LoadProject(ProjectToDisplay);
            }

            PreloadVideo(p_Index + 1);
        })
        .catch(error => {
            console.error(`Failed to preload video ${p_Index}:`, error);
        });
}

window.addEventListener("load", (event) => {
    if (window.innerWidth > 1000)
    {
        PreloadAllVideos();
        LoadProjects();
    }
});