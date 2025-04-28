async function fetchMonsters() {
    const response = await fetch('https://mhw-db.com/monsters');
    const monsters = await response.json();
    
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
                    <li>Éléments : ${monster.elements.join(', ')}</li>
                    <li>Faiblesses : ${monster.weaknesses.map(w => w.element).join(', ')}</li>
                </ul>
            `;
            // On ajoute la div card dans la div container
            container.appendChild(card);
    }
    });
  }
  
fetchMonsters();