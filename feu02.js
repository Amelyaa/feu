const fs = require('fs')

const displayError = (args) => {
    if (args.length !== 2) {
        console.log('Erreur : Le programme nécessite deux fichiers en argument.')
        process.exit(1)
    }
}

const findShapeInBoard = (boardFile, shapeFile) => {
    const board = fs.readFileSync(boardFile, 'utf-8').trim().split('\n')
    const shape = fs.readFileSync(shapeFile, 'utf-8').trim().split('\n')

    const boardHeight = board.length
    const boardWidth = board[0].length
    const shapeHeight = shape.length
    const shapeWidth = shape[0].length

    for (let row = 0; row <= boardHeight - shapeHeight; row++) {
        for (let col = 0; col <= boardWidth - shapeWidth; col++) {
            let found = true
            for (let i = 0; i < shapeHeight; i++) {
                for (let j = 0; j < shapeWidth; j++) {
                    if (shape[i][j] !== ' ' && shape[i][j] !== board[row + i][col + j]) {
                        found = false
                        break
                    }
                }
                if (!found) {
                    break
                }
            }
            if (found) {
                console.log('Trouvé !')
                console.log(`Coordonnées : ${row + 1},${col + 1}`)
                return
            }
        }
    }

    console.log('Introuvable')
}

const args = process.argv.slice(2)

displayError(args)

const boardFile = args[0]
const shapeFile = args[1]

findShapeInBoard(boardFile, shapeFile)
