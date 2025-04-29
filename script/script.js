// Fonction pour consommer l'API
async function fetchMonsters(number) {
    //On crée une réponse à l'appel de l'API
    const response = await fetch('https://mhw-db.com/monsters');
    //On crée un tableau de number-monstres
    const monstersList = await response.json();
    //On conserve que les number-premiers éléments
    const monsterListWanted =[];
    for (let i=0; i<number; i++){
        monsterListWanted.push(monstersList[i]);
    }
    console.log(monsterListWanted);
    return monsterListWanted;
}

    
function displayFeed (monsters) {
    //On lie la div "monster-feed" à la fonction
    const container = document.getElementById('monster-feed');

    //Pour chaque monstre dans le fichier json
    monsters.forEach(monster => {
        // Afin de limiter le nombre de réponses, on exclut les petits monstres sans intérêt
        if (`${monster.type}`!="small") {
            //On crée une div pour afficher les données choisies
            const card = document.createElement('div');
            //On donne une classe à la div (utile pour le fichier css)
            card.className = 'monster-card';
            //On modifie le texte à l'intérieur
            card.innerHTML = `
                <h2>${monster.name}</h2> 
                <h4>${monster.species}</h4>
                <p>${monster.description}</p>
                <ul>
                    <li>Elements : ${monster.elements.join(', ')}</li>
                    <li>Locations : ${monster.locations.map(w => w.name).join(', ')}</li>
                </ul>
            `;
            // On ajoute la div card dans la div container
            container.appendChild(card);
    }
    });
  }
  
fetchMonsters(30).then(monsters => {
    displayFeed(monsters);
});



//Déclaration de variables pour le menu DropDown
const dropDownMenu = document.getElementById('dropDowmMenu');
const buttonMenu = document.getElementById('menuButton');
let buttonIndex;
let buttonGallery;
let buttonGames;
let isDisplayed = false;

//Ecoute de l'événement click sur le bouton menu
buttonMenu.addEventListener('click', () => {
    console.log(isDisplayed);
    if (!isDisplayed) {
        showMenu();
    }
    else if (isDisplayed) {
        hideMenu();
    }
})

//Fonction pour afficher le menu
function showMenu () {
    buttonIndex = document.createElement("button");
    buttonIndex.className = "dropDownButton";
    buttonIndex.innerHTML = '<a href = "index.html">Index</a>';
    buttonIndex.style.top = '34.38px';
    dropDownMenu.appendChild(buttonIndex);
    buttonGallery = document.createElement("button");
    buttonGallery.className = "dropDownButton";
    buttonGallery.innerHTML = '<a href = "gallery.html">Galerie</a>';
    buttonGallery.style.top = '68.76px';
    dropDownMenu.appendChild(buttonGallery);
    buttonGames = document.createElement("button");
    buttonGames.className = "dropDownButton";
    buttonGames.innerHTML = '<a href = "games.html">Jeux</a>';
    buttonGames.style.top = '103.14px';
    dropDownMenu.appendChild(buttonGames);
    isDisplayed = true;
    console.log(isDisplayed);
}

//Fonction pour cacher le menu
function hideMenu () {
    buttonIndex.remove();
    buttonGallery.remove();
    buttonGames.remove();
    isDisplayed = false;
}