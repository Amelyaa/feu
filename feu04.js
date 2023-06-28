const fs = require('fs');

const fillSquare = (filename) => {
    // Lecture du fichier
    const data = fs.readFileSync(filename, 'utf-8')
    const lines = data.split('\n')

    // Récupération des informations sur la carte
    const [height, emptyChar, obstacleChar, fullChar] = [...lines[0]]

    // Affichage des informations sur la carte
    console.log('height:', height)
    console.log('emptyChar:', emptyChar)
    console.log('obstacleChar:', obstacleChar)
    console.log('fullChar:', fullChar)

    // Vérification de la validité de la carte (à commenter pour que ça marche)
    if (!isValidMap(lines.slice(1), emptyChar, obstacleChar)) {
        console.log('Carte invalide.')
        return
    }

    // Construction du plateau
    const map = lines.slice(1).map((line) => line.split(''))

    // Recherche du plus grand carré et remplissage
    const squareSize = findLargestSquare(map, emptyChar, obstacleChar)
    fillMapWithSquare(map, squareSize, fullChar, emptyChar)

    // Affichage du plateau rempli
    for (let line of map) {
        console.log(line.join(''))
    }
}

const isValidMap = (map, emptyChar, obstacleChar) => {
    const width = map[0].length;

    for (let line of map) {
        if (line.length !== width) {
            return false
        }

        for (let char of line) {
            if (char !== emptyChar && char !== obstacleChar) {
                return false
            }
        }
    }

    return true
}

const findLargestSquare = (map, emptyChar) => {
    const height = map.length
    const width = map[0].length

    let maxSize = 0

    // Tableau pour stocker les tailles des carrés
    const squareSizes = Array.from(Array(height), () => Array(width).fill(0))

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (map[i][j] === emptyChar) {
                if (i === 0 || j === 0) {
                    // Première ligne ou première colonne
                    squareSizes[i][j] = 1
                } else {
                    // Cases internes
                    const minSize = Math.min(
                        squareSizes[i - 1][j],
                        squareSizes[i][j - 1],
                        squareSizes[i - 1][j - 1]
                    );
                    squareSizes[i][j] = minSize + 1
                }

                if (squareSizes[i][j] > maxSize) {
                    maxSize = squareSizes[i][j]
                }
            }
        }
    }

    return maxSize
}

const fillMapWithSquare = (map, size, fullChar, emptyChar) => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === emptyChar) {
                let canPlaceSquare = true;
                for (let k = i; k < i + size; k++) {
                    for (let l = j; l < j + size; l++) {
                        if (k >= map.length || l >= map[i].length || map[k][l] !== emptyChar) {
                            canPlaceSquare = false;
                            break
                        }
                    }
                    if (!canPlaceSquare) {
                        break
                    }
                }
                if (canPlaceSquare) {
                    for (let k = i; k < i + size; k++) {
                        for (let l = j; l < j + size; l++) {
                            map[k][l] = fullChar
                        }
                    }
                    // On sort de la boucle après avoir rempli le carré
                    return
                }
            }
        }
    }
}

// Exécution du programme avec le fichier en argument
const filename = process.argv[2]
fillSquare(filename)
