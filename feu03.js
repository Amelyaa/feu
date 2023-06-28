const fs = require('fs')

const solveSudoku = (sudoku) => {
    return solveGrid(sudoku, 0, 0)
}

const solveGrid = (sudoku, row, col) => {
    if (row === 9) {
        return true
    }

    if (col === 9) {
        return solveGrid(sudoku, row + 1, 0)
    }

    if (sudoku[row][col] !== '.') {
        return solveGrid(sudoku, row, col + 1)
    }

    for (let num = 1; num <= 9; num++) {
        const numStr = String(num);
        if (isValid(sudoku, row, col, numStr)) {
            sudoku[row][col] = numStr;
            if (solveGrid(sudoku, row, col + 1)) {
                return true
            }
            sudoku[row][col] = '.'
        }
    }

    return false
}

const isValid = (sudoku, row, col, num) => {
    for (let i = 0; i < 9; i++) {
        if (
            sudoku[i][col] === num ||
            sudoku[row][i] === num ||
            sudoku[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num
        ) {
            return false
        }
    }
    return true
}

const printSudoku = (sudoku) => {
    for (let row of sudoku) {
        console.log(row.join(''))
    }
}

// Lecture du fichier Sudoku
const filename = process.argv[2]
const sudoku = []

const data = fs.readFileSync(filename, 'utf-8')
const lines = data.split('\n')

for (let line of lines) {
    sudoku.push(line.split(''))
}

// Résolution du Sudoku
if (solveSudoku(sudoku)) {
    printSudoku(sudoku)
} else {
    console.log('Impossible de résoudre le Sudoku.')
}
