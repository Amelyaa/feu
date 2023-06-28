const displayError = (args, width, height) => {
    if (args.length !== 2) {
        console.log("Erreur : Le programme nécessite deux arguments (largeur et hauteur du rectangle).")
    }

    if (isNaN(width) || isNaN(height) || width < 1 || height < 1) {
        console.log("Erreur : Les dimensions du rectangle doivent être des nombres entiers positifs.")
        process.exit(1)
    }
}

const drawRectangle = (width, height) => {
    const horizontalLine = width === 1 ? "o" : "o" + "-".repeat(width - 2) + "o"
    const verticalLine = width === 1 ? "|" : "|" + " ".repeat(width - 2) + "|"


    console.log(horizontalLine)
    for (let i = 0; i < height - 2; i++) {
        console.log(verticalLine)
    }
    if (height > 1) {
        console.log(horizontalLine)
    }
}

const args = process.argv.slice(2)

const width = parseInt(args[0])
const height = parseInt(args[1])

displayError(args, width, height)
drawRectangle(width, height)
