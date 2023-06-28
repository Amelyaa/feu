const fs = require('fs');

const findShortestPath = (labyrinth) => {
    // Recherche de l'entrée et de la sortie du labyrinthe
    let entryRow, entryCol;
    let exitRow, exitCol;

    for (let i = 0; i < labyrinth.length; i++) {
        for (let j = 0; j < labyrinth[i].length; j++) {
            if (labyrinth[i][j] === '1') {
                entryRow = i;
                entryCol = j;
            } else if (labyrinth[i][j] === '2') {
                exitRow = i;
                exitCol = j;
            }
        }
    }

    // Création d'une file d'attente pour le parcours en largeur (BFS)
    const queue = [{ row: entryRow, col: entryCol, distance: 0 }];
    const visited = new Set(); // Ensemble pour garder une trace des positions visitées

    // Tableau pour stocker les mouvements possibles : haut, bas, gauche, droite
    const movements = [
        { row: -1, col: 0 }, // haut
        { row: 1, col: 0 },  // bas
        { row: 0, col: -1 }, // gauche
        { row: 0, col: 1 }   // droite
    ];

    // Parcours en largeur (BFS)
    while (queue.length > 0) {
        const { row, col, distance } = queue.shift();

        // Vérification si la sortie est atteinte
        if (row === exitRow && col === exitCol) {
            return distance;
        }

        // Parcours des mouvements possibles
        for (const movement of movements) {
            const newRow = row + movement.row;
            const newCol = col + movement.col;

            // Vérification des limites du labyrinthe et si la case est un chemin libre
            if (
                newRow >= 0 && newRow < labyrinth.length &&
                newCol >= 0 && newCol < labyrinth[newRow].length &&
                (labyrinth[newRow][newCol] === ' ' || labyrinth[newRow][newCol] === '2') &&
                !visited.has(`${newRow},${newCol}`) // Vérifier si la position a été visitée
            ) {
                // Marquer le chemin parcouru avec des zéros
                labyrinth[newRow][newCol] = '0';
                visited.add(`${newRow},${newCol}`);
                queue.push({ row: newRow, col: newCol, distance: distance + 1 });
            }
        }
    }

    // Si la sortie n'est pas atteignable, retourner -1
    return -1;
};

// Lecture du fichier du labyrinthe passé en argument
const filePath = process.argv[2];

if (!filePath) {
    console.log('Veuillez spécifier le fichier du labyrinthe en argument.');
    process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.log('Erreur lors de la lecture du fichier du labyrinthe :', err);
        process.exit(1);
    }

    // Analyse du contenu du fichier
    const lines = data.split('\n');
    const [size, obstacle, empty, path, entry, exit] = lines[0].split(' ');
    const [rows, cols] = size.split('x').map(Number);

    // Extraction du labyrinthe
    const labyrinth = lines.slice(1).map(line => line.split(''));

    // Résolution du labyrinthe
    const shortestPath = findShortestPath(labyrinth);

    // Affichage du résultat
    if (shortestPath !== -1) {
        console.log(`${rows}x${cols}${obstacle} ${empty}${entry}${exit}`);
        labyrinth.forEach(row => console.log(row.join('')));
        console.log(`=> SORTIE ATTEINTE EN ${shortestPath} COUPS !`);
    } else {
        console.log('La sortie n\'est pas atteignable.');
    }
});
