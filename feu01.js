const displayError = (args) => {
    if (args.length !== 1) {
        console.log("Erreur : Le programme nécessite une expression arithmétique en argument.")
        process.exit(1)
    }
}

const evaluateExpression = (expression) => {
    return eval(expression)
}

const args = process.argv.slice(2)

displayError(args)

const expression = args[0]
const result = evaluateExpression(expression)
console.log(result)
