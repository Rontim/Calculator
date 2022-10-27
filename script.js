const numbers = document.querySelectorAll(".num")
let operators = document.querySelectorAll(".operation")


let screen_el = document.getElementById('screen')
let screen_arr = ""


document.querySelector(".delete").addEventListener("click", () => {
    screen_arr = screen_arr.slice(0, screen_arr.length - 1)
    screen_el.textContent = screen_arr

})


numbers.forEach(
    (number) => {
        number.addEventListener("click", () => {
            screen_arr += number.textContent

            console.log(screen_arr)
            screen_el.textContent += number.textContent
        })

    }
)
operators.forEach(
    (op) => {
        op.addEventListener("click", () => {
            screen_arr += " " + op.textContent + " "

            console.log(screen_arr)
            screen_el.textContent += " " + op.textContent + " "
        })

    }
)

function conversion(expression_string) {
    let precedence = {
        "(": 1,
        "/": 2,
        "*": 3,
        "+": 4,
        "-": 5,
    }

    let operators = []
    let postfix_list = []
    let infix_list = expression_string.split(" ")

    for (let el in infix_list) {
        if (infix_list[el].match(/^[0-9]*$/)) {
            postfix_list.push(infix_list[el])
        } else if (infix_list[el] === "(") {
            operators.push(infix_list[el])
        } else if (infix_list[el] === ")") {
            let top = operators.pop()
            while (top !== ")") {
                postfix_list.push(top)
                top = operators.pop()
            }
        } else if (infix_list[el].match(/^[/x+-]*$/)) {
            while ((operators.length >= 1) && (precedence[operators[operators.length - 1]] < precedence[infix_list[el]])) {
                postfix_list.push(operators.pop())
            }
            operators.push(infix_list[el])
        }
    }

    while (operators.length >= 1) {
        postfix_list.push(operators.pop())
    }
    let postfix_string = ""
    for (let c in postfix_list) {
        if (c > postfix_list.length - 2) {
            postfix_string += postfix_list[c]
        } else postfix_string += postfix_list[c] + " "
    }
    return postfix_string
}

function calculation(postfix_string) {

    let operand_list = []
    let token_list = postfix_string.split(" ").filter(item => item)

    for (let ch in token_list) {
        if (token_list[ch].match(/^[0-9]*$/)) {
            operand_list.push(token_list[ch])
            if (operand_list[length - 1] === " ") {
                operand_list.slice(0, operand_list.length - 2)
            }
            console.log(operand_list)
            console.log(operand_list.length)
        } else {

            let left = parseFloat(operand_list.pop())
            let right = parseFloat(operand_list.pop())
            console.log(operand_list)
            let result = calc(token_list[ch], right, left)

            operand_list.push(result)
            console.log(operand_list)

        }
    }
    console.log(operand_list)
    return operand_list.pop()
}

function calc(operator, left_op, right_op) {
    switch (operator) {
        case "x":
            return left_op * right_op
            break;
        case "/":
            return left_op / right_op
            break;
        case "-":
            return left_op - right_op
            break;
        case "+":
            return left_op + right_op
            break;

        default:
            console.log("No operator avilable")
            break;
    }
}

let answer = document.querySelector(".answer")
let equate = document.querySelector(".equals")
equate.addEventListener("click", () => {
    let exprss = conversion(screen_arr)
    console.log(screen_arr)
    console.log(exprss)
    answer.textContent = calculation(exprss)
    console.log(answer.textContent)
})
document.querySelector(".clr").addEventListener("click", () => {
    screen_el.textContent = ""
    screen_arr = ""
    answer.textContent = ""
})
document.querySelector(".clear").addEventListener("click", () => {
    screen_el.textContent = ""
    screen_arr = ""
    answer.textContent = ""
})