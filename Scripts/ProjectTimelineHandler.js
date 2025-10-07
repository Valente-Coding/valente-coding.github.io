var TimeBetweenProjects = 15000; // Time in milliseconds between automatic project changes
var Projects = [ 
    {
        "ProjectName": "Venci's Adventures",
        "ProjectDescription": "Dive into the world of Vencis and tackle cybersecurity challenges where mastering complex topics becomes effortlessly engaging. Let's game, learn, and secure!",
        "ProjectTags": ["Singleplayer", "eLearning", "Unity", "Internship"],
        "ProjectImage": "Images/VencisAdventures.png",
        "ProjectVideo": "Images/VencisAdventures.mp4",
        "ProjectVideoLink": "https://www.linkedin.com/posts/emvenci_lets-game-learn-and-secure-activity-7117422051514023936-N7AB",
        "ProjectSourceLink": "https://www.emvenci.com/products/games#venci",
    },
    {
        "ProjectName": "Mar Made Sushi",
        "ProjectDescription": "Mar Made Sushi is a fun multiplayer prototype where players must work together to manage a restaurant. Collaborate with your teammates to fish for ingredients, cook delicious dishes, and host clients efficiently. Teamwork and coordination are key to keeping the restaurant running smoothly and satisfying your customers.",
        "ProjectTags": ["Multiplayer", "Strategy", "Unity", "University Project"],
        "ProjectImage": "Images/MarMadeSushi.png",
        "ProjectVideo": "Images/MarMadeSushi.mp4",
        "ProjectVideoLink": "https://youtu.be/4pTJCFrdATc",
        "ProjectSourceLink": "",
    },
    {
        "ProjectName": "Deep Anomaly",
        "ProjectDescription": "Deep Anomaly is a local multiplayer party game where players must compete to catch the most fish avoiding the ones with anomalies.",
        "ProjectTags": ["Local Multiplayer", "Party", "Unity", "Game Jam"],
        "ProjectImage": "Images/DeepAnomaly.png",
        "ProjectVideo": "Images/DeepAnomaly.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "",
    },
    {
        "ProjectName": "Mix & Serve",
        "ProjectDescription": "In Mix & Serve you impersonate a bartender in a busy bar. You must quickly mix and serve drinks to your customers while managing your time and resources effectively. Your goal is to have enough money to pay your rent at the end of the day.",
        "ProjectTags": ["Singleplayer", "Simulation", "Unity", "Game Jam"],
        "ProjectImage": "Images/MixAndServe.png",
        "ProjectVideo": "Images/MixAndServeFast.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "",
    },
    {
        "ProjectName": "Comedy Showdown",
        "ProjectDescription": "Your goal is to write your own jokes to different people based on their likings. Each person has a different sense of humor, so you must choose the right joke to make them laugh. If you tell a joke that they don't like, they will get angry. If you fail at least 3 times, you lose the game.",
        "ProjectTags": ["Singleplayer", "Comedy", "Unity", "Game Jam"],
        "ProjectImage": "Images/ComedyShowdown.png",
        "ProjectVideo": "Images/ComedyShowdown.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "",
    },
    {
        "ProjectName": "Sudoku 48H",
        "ProjectDescription": "Sudoku48H is a project developed as part of a 48-hour challenge to test the developer's skills. The objective was to create a functional Sudoku game in Unity without referencing online resources. The project was completed in under 14 hours, with a significant portion of time spent refining the UI rather than the core game logic.",
        "ProjectTags": ["Singleplayer", "Strategy", "Unity", "Challenge"],
        "ProjectImage": "Images/Sudoku48h.png",
        "ProjectVideo": "Images/Placeholder.mp4",
        "ProjectVideoLink": "",
        "ProjectSourceLink": "",
    }
]

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
                '<div class="ProjectTimelineImage" style="background-image: url(\'' + l_project.ProjectImage + '\');"></div>'+
                '<div class="ProjectTimelineInfoContainer">'+
                    '<div class="ProjectTimelineTitle bebas-neue-regular">' + l_project.ProjectName + '</div>'+
                    '<div class="ProjectTimelineGameTags martel-sans-bold">' + l_project.ProjectTags.join('</br>') + '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

        l_timelineContainer.innerHTML += l_card;
    }

    l_timelineContainer.addEventListener('wheel', TransformScrollSideways);

    LoadProject(0);
}

function DisplayProject(p_index) {
    let l_project = Projects[p_index];

    // Update the project display section
    document.getElementsByClassName("VideoInfoTitle")[0].innerText = l_project.ProjectName;
    document.getElementsByClassName("VideoInfoDesc")[0].innerText = l_project.ProjectDescription;
    document.getElementsByClassName("VideoInfoPlayButton")[0].dataset.video = l_project.ProjectVideoLink;
    document.getElementsByClassName("VideoInfoMoreButton")[0].dataset.source = l_project.ProjectSourceLink;

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
    
    ScrollIntoViewHorizontally(document.getElementsByClassName("ProjectsTimelineList")[0], l_cards[p_index]);

    if (document.getElementsByClassName("BackgroundVideoFade")[0].classList.contains("ActiveFade"))
        document.getElementsByClassName("BackgroundVideoFade")[0].classList.remove("ActiveFade");

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

    l_video.src = "https://valente-coding.github.io/" + l_project.ProjectVideo;
    l_video.load();

    RecreateNode(l_video);

    l_video.addEventListener('loadeddata', function() {
        document.getElementsByClassName("WebsiteLoadingScreen")[0].classList.remove("Active");
        document.getElementsByClassName("ProjectsTimelineContainer")[0].classList.remove("Unloaded")
        document.getElementsByClassName("VideoInfoContainer")[0].classList.remove("Unloaded")
        DisplayProject(p_index);
    }, false); 
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

window.addEventListener("load", (event) => {
    LoadProjects();
});

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