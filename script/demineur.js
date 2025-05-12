/* 4.4 Démineur en ligne - Parcours */
let boardMine;
let sizeBoard = 12;
let mineNumber = 17;
function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('gameZone');
    background(56, 4, 75); /*Initialisation du tableau */
    initBoard(sizeBoard, mineNumber); /*Placement des mines et des chiffres*/
    for (let sizeBoardX = 0; sizeBoardX < sizeBoard; sizeBoardX++) {
        for (let sizeBoardY = 0; sizeBoardY < sizeBoard; sizeBoardY++) {
            designGrid(sizeBoardX, sizeBoardY); // Permet de dessiner le démineur
        }
    }
    canvas.elt.addEventListener('contextmenu', (e) => {
        e.preventDefault();  // Empêche l'apparition du menu contextuel
    });
}

function draw() {}
function mousePressed() {
    console.log("Clic détecté à", mouseX, mouseY);
    if (mouseButton === LEFT) {
        let clickBoardX = mouseX;
        let clickBoardY = mouseY;
        showCase(clickBoardX, clickBoardY);
        clearSafe(clickBoardX, clickBoardY);
    }
    if (mouseButton === RIGHT) {
        console.log("Clic détecté droit à", mouseX, mouseY);
        let clickBoardX = mouseX;
        let clickBoardY = mouseY;
        verrouMine(clickBoardX, clickBoardY);
        victory();
    }
}



function initBoard(sizeBoard, mineNumber) {
    boardMine = Array.from({ length: sizeBoard }, () => Array(sizeBoard).fill(0));
    /* Dépose une mine */
    boardMine[int(random(sizeBoard))][int(random(sizeBoard - 1))] = 99;
    for (let i = 0; i < mineNumber - 1; i++) {
        let mineIndexX = int(random(sizeBoard));
        let mineIndexY = int(
            random(sizeBoard)
        ); /* Si la case est déjà minée, on reboucle */
        if (boardMine[mineIndexX][mineIndexY] == 99) {
            mineNumber++;
        } /* Sinon, on pose une mine) */ else {
            boardMine[mineIndexX][mineIndexY] = 99;
        }
    }
}
function isAMine(mineIndexX, mineIndexY) {
    if (boardMine[mineIndexX][mineIndexY] == 99) {
        return true;
    } else {
        return false;
    }
}
function getMines(mineIndexX, mineIndexY) {
    let nearMines = 0; /* Pour tester les cases à gauche */
    if (
        mineIndexX > 0 &&
        (boardMine[mineIndexX - 1][mineIndexY] == 99 ||
            boardMine[mineIndexX - 1][mineIndexY] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en bas à gauche */
    if (
        mineIndexX > 0 &&
        mineIndexY < boardMine.length - 1 &&
        (boardMine[mineIndexX - 1][mineIndexY + 1] == 99 ||
            boardMine[mineIndexX - 1][mineIndexY + 1] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en bas */
    if (
        mineIndexY < boardMine.length - 1 &&
        (boardMine[mineIndexX][mineIndexY + 1] == 99 ||
            boardMine[mineIndexX][mineIndexY + 1] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en bas à droite */
    if (
        mineIndexX < boardMine.length - 1 &&
        mineIndexY < boardMine.length - 1 &&
        (boardMine[mineIndexX + 1][mineIndexY + 1] == 99 ||
            boardMine[mineIndexX + 1][mineIndexY + 1] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases à droite */
    if (
        mineIndexX < boardMine.length - 1 &&
        (boardMine[mineIndexX + 1][mineIndexY] == 99 ||
            boardMine[mineIndexX + 1][mineIndexY] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en haut à droite */
    if (
        mineIndexX < boardMine.length - 1 &&
        mineIndexY > 0 &&
        (boardMine[mineIndexX + 1][mineIndexY - 1] == 99 ||
            boardMine[mineIndexX + 1][mineIndexY - 1] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en haut */
    if (
        mineIndexY > 0 &&
        (boardMine[mineIndexX][mineIndexY - 1] == 99 ||
            boardMine[mineIndexX][mineIndexY - 1] == 90)
    ) {
        nearMines++;
    } /* Pour tester les cases en haut à gauche */
    if (
        mineIndexX > 0 &&
        mineIndexY > 0 &&
        (boardMine[mineIndexX - 1][mineIndexY - 1] == 99 ||
            boardMine[mineIndexX - 1][mineIndexY - 1] == 90)
    ) {
        nearMines++;
    }
    return nearMines;
} /* Fonction pour vérifier la création du tableau dans la console
 void printBoard() {
 for (int i = 0; i < boardMine.length; i++) {
 for (int j = 0; j < boardMine[i].length; j++) {
 print(boardMine[i][j] + "\t");  /* \t pour tabulation (alignement)
 }
 println();  /* retour à la ligne après chaque ligne du tableau
 }
 } */
/* Dessin de la grille */
function designGrid(sizeBoardX, sizeBoardY) {
    fill(149, 250, 149);
    rect(sizeBoardX * 25 + 25, sizeBoardY * 25 + 25, 24, 24);
    fill(120, 191, 252);
    textSize(20);
    text("Nombre de mines : " + mineNumber, 20, 20);
}
function showCase(clickBoardX, clickBoardY) {
    /* On convertit les coodonnées en entier pour retrouver l'index du tableau */
    let sizeBoardX = int(clickBoardY / 25 - 1);
    let sizeBoardY = int(clickBoardX / 25 - 1);
    
    if (boardMine[sizeBoardX][sizeBoardY] == 99) {
        console.log("MINE !");
        fill(72, 3, 12);
        stroke(240, 2, 30);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
        fill(245, 10, 41);
        textSize(18);
        text("X", (sizeBoardY + 1.3) * 25, (sizeBoardX + 1.7) * 25);
        text("PERDU !", 50, sizeBoard * 29);
    }
    if (boardMine[sizeBoardX][sizeBoardY] == 0) {
        console.log("not a mine");
        fill(5, 245, 171);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
        fill(5, 5, 5);
        textSize(18);
        text(
            getMines(sizeBoardX, sizeBoardY),
            (sizeBoardY + 1.3) * 25,
            (sizeBoardX + 1.7) * 25
        );
    } else {
        return;
    }
}
function clearSafe(clickBoardX, clickBoardY) {
    /* On convertit les coodonnées en entier pour retrouver l'index du tableau */
    let mineIndexX = int(clickBoardY / 25 - 1);
    let mineIndexY = int(clickBoardX / 25 - 1);
    if (getMines(mineIndexX, mineIndexY) == 0) {
        // On teste ls cases adjacentes au 0 découvert
        for (let k = mineIndexX - 1; k < mineIndexX + 2; k++) {
            for (let l = mineIndexY - 1; l < mineIndexY + 2; l++) {
                // Pour tester uniquement les cases du tableau
                if (
                    k >= 0 &&
                    k + 1 <= sizeBoard &&
                    l >= 0 &&
                    l + 1 <= sizeBoard
                ) {
                    showCase((l + 1) * 25, (k + 1) * 25);
                }
            }
        }
    }
}
function verrouMine(clickBoardX, clickBoardY) {
    /* On convertit les coodonnées en entier pour retrouver l'index du tableau */
    let sizeBoardX = int(clickBoardY / 25 - 1);
    let sizeBoardY = int(clickBoardX / 25 - 1);
    if (boardMine[sizeBoardX][sizeBoardY] == 99) {
        boardMine[sizeBoardX][sizeBoardY] = 90; // Ajout d'une nouvelle valeur au tableau
        fill(198, 163, 18);
        stroke(0, 0, 0);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
        fill(245, 10, 41);
        textSize(18);
        text("#", (sizeBoardY + 1.3) * 25, (sizeBoardX + 1.7) * 25);
    } else if (boardMine[sizeBoardX][sizeBoardY] == 0) {
        boardMine[sizeBoardX][sizeBoardY] = 10; // Ajout d'une nouvelle valeur au tableau
        fill(198, 163, 18);
        stroke(0, 0, 0);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
        fill(245, 10, 41);
        textSize(18);
        text("#", (sizeBoardY + 1.3) * 25, (sizeBoardX + 1.7) * 25);
    } else if (boardMine[sizeBoardX][sizeBoardY] == 10) {
        boardMine[sizeBoardX][sizeBoardY] = 0; // Retour à la valeur de base
        fill(149, 250, 149);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
    } else if (boardMine[sizeBoardX][sizeBoardY] == 90) {
        boardMine[sizeBoardX][sizeBoardY] = 99; // Retour à la valeur de base
        fill(149, 250, 149);
        rect(sizeBoardY * 25 + 25, sizeBoardX * 25 + 25, 24, 24);
    }
}
function victory() {
    let victory = true;
    for (let sizeBoardX = 0; sizeBoardX < sizeBoard; sizeBoardX++) {
        for (let sizeBoardY = 0; sizeBoardY < sizeBoard; sizeBoardY++) {
            if (boardMine[sizeBoardX][sizeBoardY] == 99) {
                victory = false;
                break;
            }
        }
        if (!victory) break;
    }
    if (victory) {
        text("VICTOIRE !", 50, sizeBoard * 29);
    }
}
