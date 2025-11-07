var AboutMeTitles = ["Hello, I'm Valente", "Olá, eu sou o Valente", "Hola, soy Valente", "Bonjour, je suis Valente", "Hallo, ich bin Valente", "Ciao, sono Valente"];
var AboutMeTitleElement;

function PlaceTitleLetters(p_Index, p_Direction = 1) {
    var l_FullTitle = AboutMeTitles[p_Index];
    var l_CurrentCharIndex = p_Direction === 1 ? 0 : l_FullTitle.length;
    var l_IntervalID = setInterval(() => {
        if ((p_Direction === 1 && l_CurrentCharIndex < l_FullTitle.length) || (p_Direction === -1 && l_CurrentCharIndex > 0)) {
            AboutMeTitleElement.innerText = l_FullTitle.substring(0, p_Direction === 1 ? l_CurrentCharIndex + 1 : l_CurrentCharIndex - 1);
            l_CurrentCharIndex = p_Direction === 1 ? l_CurrentCharIndex + 1 : l_CurrentCharIndex - 1;
        } else {
            clearInterval(l_IntervalID);

            if (p_Direction === 1)
            {
                setTimeout(() => {
                    PlaceTitleLetters(p_Index, -1);
                }, 2000);
            }
            else
            {
                p_Index++;
                if (p_Index >= AboutMeTitles.length)
                    p_Index = 0;

                PlaceTitleLetters(p_Index, 1);
            }
        }
    }, p_Direction === 1 ? 100 : 50);
}

window.addEventListener("load", (event) => {
    AboutMeTitleElement = document.getElementsByClassName("AboutMeTitle")[0];
    AboutMeTitleElement.innerText = "";

    var l_CurrentTitleIndex = 0;
    PlaceTitleLetters(l_CurrentTitleIndex);
});