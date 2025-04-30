document.addEventListener('DOMContentLoaded', () => {
    //Si la page est 'index.html'
    if(document.getElementById('index')) {
        //Déclaration de variables globales depuis la page 'index.html'
        const addCardButton = document.getElementById('addCardButton');
        const addForm = document.getElementById('addForm');
        addForm.hidden = true;

        //Appel des fonctions du fichier 'script.js'
        fetchMonsters(30).then(monsters => {
            displayFeed(monsters);
        });
        
        //Ecoute de l'événement de click sur le bouton addCardButton
        addCardButton.addEventListener('click', () => {
            if (!isAddDisplayed) {
                displayForm();
            }
        })
    }

    if(document.getElementById('gallery')) {
        //Déclaration de variables globales depuis la page 'gallery.html'
        const changeDisplayPictures = document.getElementById('changeDisplayPictures');

        //Appel de la fonction pour afficher les images
        displayGallery(picturesFoler);

        //Ecoute de l'événement de click sur le bouton changeDisplayPictures
        changeDisplayPictures.addEventListener('click', function() {
            switchDisplay ();
        })
    }
})