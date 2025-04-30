// Fonction pour consommer l'API
async function fetchMonsters(number) {
    //On crée une réponse à l'appel de l'API
    const response = await fetch('https://mhw-db.com/monsters');
    //On crée un tableau de number-monstres
    const monstersList = await response.json();
    //On conserve que les number-premiers éléments
    const monsterListWanted = [];
    for (let i = 0; i < number; i++) {
        monsterListWanted.push(monstersList[i]);
    }
    return monsterListWanted;
}


function displayFeed(monsters) {
    const container = document.getElementById('monster-feed');
    //Pour chaque monstre dans le fichier json
    monsters.forEach(monster => {
        // Afin de limiter le nombre de réponses, on exclut les petits monstres sans intérêt
        if (`${monster.type}` != "small") {
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


//Menu DropDown
//Déclaration de variables pour le menu DropDown
const dropDownMenu = document.getElementById('dropDowmMenu');
const buttonMenu = document.getElementById('menuButton');
let buttonIndex;
let buttonGallery;
let buttonGames;
let isMenuDisplayed = false;

//Ecoute de l'événement click sur le bouton menu
buttonMenu.addEventListener('click', () => {
    if (!isMenuDisplayed) {
        showMenu();
    }
    else if (isMenuDisplayed) {
        hideMenu();
    }
})

//Fonction pour afficher le menu
function showMenu() {
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
    isMenuDisplayed = true;
}

//Fonction pour cacher le menu
function hideMenu() {
    buttonIndex.remove();
    buttonGallery.remove();
    buttonGames.remove();
    isMenuDisplayed = false;
}

//Formulaire d'ajout dans le feed
//Déclaration de variables pour le formulaire d'ajout dans le feed
let form;
let buttonSubmit;
let isAddDisplayed = false;

//Fonction pour cacher le formulaire
function hideForm() {
    form.remove();
    addForm.hidden = true;
    isAddDisplayed = false;
}

//Fonction pour afficher le formulaire
function displayForm() {
    //On modifie le booléen pour empêcher d'afficher 2 fois le formulaire
    isAddDisplayed = true;
    //On affiche la div 'addForm'
    addForm.hidden = false;
    form = document.createElement('form');
    //On ajoute le code HTML dans le formulaire
    form.innerHTML = `
    <legend> Your monster's observations
    <fieldset>
            <div>
                <label for="name">Name :</label>
                <input type="text" id="name" name="name" required/>
            </div>
            <div>
                <label for="species">Species :</label>
                <input type="text" id="species" name="species" required/>
            </div>
            <div>
                <label for="description">Description :</label>
                <textarea id="description" name="description" rows="5" cols="33">Description of your monster.</textarea>
            </div>
        <fieldset>
            <legend>Choose your monster's elements:</legend>
            <div>
                <input type="checkbox" id="water" name="element" value="water">
                <label for="water">Water</label>
            </div>
            <div>
                <input type="checkbox" id="thunder" name="element" value ="thunder">
                <label for="thunder">Thunder</label>
            </div>
            <div>
                <input type="checkbox" id="fire" name="element" value ="fire">
                <label for="fire">Fire</label>
            </div>
            <div>
                <input type="checkbox" id="dragon" name="element" value="dragon">
                <label for="dragon">Dragon</label>
            </div>
        </fieldset>
        <fieldset>
            <legend>Choose your monster's locations:</legend>
            <div>
                <input type="checkbox" id="ancientForest" name="location" value="Ancient Forest">
                <label for="ancientForest">Ancient Forest</label>
            </div>
            <div>
                <input type="checkbox" id="wildspireWaste" name="location" value="Wildspire Waste">
                <label for="wildspireWaste">Wildspire Waste</label>
            </div>
            <div>
                <input type="checkbox" id="eldersRecess" name="location" value="Elder's Recess">
                <label for="eldersRecess">Elder's Recess</label>
            </div>
            <div>
                <input type="checkbox" id="coralHighlands" name="location" value="Coral Highlands">
                <label for="coralHighlands">Coral Highlands</label>
            </div>
            <div>
                <input type="checkbox" id="rottenVale" name="location" value="Rotten Vale">
                <label for="rottenVale">Rotten Vale</label>
            </div>
        </fieldset>
        <div>
            <button type="submit" id="buttonSubmit">Poster</button>
        </div>
    </fieldset>`
    //On fait apparaitre la div form dans la div addForm
    addForm.appendChild(form);
    //On lie le bouton Submit au script
    buttonSubmit = document.getElementById('buttonSubmit');
    //On gère le'event de clic sur le bouton
    buttonSubmit.addEventListener('click', (event) => {
        //On empêche le rechergement de la page
        event.preventDefault();
        getDataUser();
        createUserCard ();
        //On appelle la fonction pour cacher le formulaire (à faire en dernier)
        hideForm();
    })
}

//Partie logique du formulaire
//Déclaration de variables
let monsterName;
let monsterSpecies;
let monsterDescription;
let monsterElements =[];
let monsterLocations = [];

//Fonction pour obtenir les données saisies par l'utilisateur
function getDataUser () {
    monsterName = document.getElementById('name').value;
    monsterSpecies = document.getElementById('species').value;
    monsterDescription = document.getElementById('description').value;
    const checkedElements = document.querySelectorAll('input[name="element"]:checked');
    monsterElements = Array.from(checkedElements).map(checkbox => checkbox.value);
    const checkedLocations = document.querySelectorAll('input[name="location"]:checked')
    monsterLocations = Array.from(checkedLocations).map(checkbox => checkbox.value);
}

//Fonction pour ajouter un nouvel article au feed
function createUserCard () {
    const container = document.getElementById('monster-feed');
    //On crée une div pour afficher les données choisies
    const cardUser = document.createElement('div');
    //On donne une classe à la div (utile pour le fichier css)
    cardUser.className = 'monster-card';
    //On modifie le texte à l'intérieur
    cardUser.innerHTML = `
        <h2>${monsterName}</h2> 
        <h4>${monsterSpecies}</h4>
        <p>${monsterDescription}</p>
        <ul>
            <li>Elements : ${monsterElements.join(', ')}</li>
            <li>Locations : ${monsterLocations.join(', ')}</li>
        </ul>
    `;
    // On ajoute la div card dans la div container
    container.insertBefore(cardUser, card);
}


//Ancienne fonction, non optimisée :
/*Fonction pour afficher le formulaire
function displayForm() {
    //On affiche la div 'addForm'
    addForm.hidden = false;
    form = document.createElement('form');
    //Code pour le input du nom
    inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'monster.name';
    inputName.placeholder = 'Monster name';
    form.appendChild(inputName);
    //Code pour le input de l'espèce
    inputSpecies = document.createElement('input');
    inputSpecies.type = 'text';
    inputSpecies.name = 'monster.species';
    inputSpecies.placeholder = 'Monster species';
    form.appendChild(inputSpecies);
    //Code pour la zone de texte de despription
    textareaDescription = document.createElement('textarea');
    textareaDescription.name = 'monster.description';
    textareaDescription.placeholder = 'Monster description';
    form.appendChild(textareaDescription);
    //Code pour les checkbox des éléments
    checkboxElements = document.createElement('input');
    checkboxElements.type = 'checkbox';
    checkboxElements.name = 'monster.elements'
    form.appendChild(checkboxElements);
    //Code pour les checkbox des localisations

    //Code pour le bouton de submit
    buttonSubmit = document.createElement('input');
    buttonSubmit.type = 'submit';
    form.appendChild(buttonSubmit);
    addForm.appendChild(form);
    buttonSubmit.addEventListener('click', () => {
        preventDefault();
        hideForm();
    })
}*/


//Fonctions pour la page gallery
//Déclaration de variables

//Déclaration de fonctions
function displayGallery(picturesFoler) {
    const container = document.getElementById('picture-feed');
    picturesFoler.forEach(picture => {
        const pictureCard = document.createElement('div');
        pictureCard.className = 'picture-card';
        const img = document.createElement('img');
        img.src = picture;
        img.alt = 'picture of the gallery';
        img.className ='gallery_img';
        container.appendChild(pictureCard);
        pictureCard.appendChild(img);
    }) 
}

