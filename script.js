// Récupérer les éléments de la calculatrice
var result = document.getElementById("result");
var buttons = Array.from(document.querySelectorAll(".grid input[type='button']"));

// Fonction pour évaluer l'expression mathématique
function evaluateExpression() {
  var expression = result.value;

  try {
    // Évaluation des fonctions trigonométriques
    expression = expression.replace(/sin\(/g, "Math.sin(");
    expression = expression.replace(/cos\(/g, "Math.cos(");
    expression = expression.replace(/tan\(/g, "Math.tan(");
    expression = expression.replace(/arcsin\(/g, "Math.asin(");
    expression = expression.replace(/arccos\(/g, "Math.acos(");
    expression = expression.replace(/arctan\(/g, "Math.atan(");

    // Évaluation des fonctions logarithmiques
    expression = expression.replace(/log\(/g, "Math.log(");
    expression = expression.replace(/ln\(/g, "Math.log(");

    // Évaluation de la racine carrée
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    // Évaluation de l'opérateur exponentiel ^
    expression = expression.replace(/\^/g, "**");

    var evaluated = eval(expression);
    result.value = evaluated;
  } catch (error) {
    result.value = "Erreur";
  }
}

// Fonctions trigonométriques
function insertFunction(functionName) {
  result.value += functionName + "(";
}

// Fonctions logarithmiques
function insertLogarithm(base) {
  result.value += "log(" + base + ",";
}

// Racine carrée
function insertSquareRoot() {
  result.value += "sqrt(";
}

// Inversion (1/x)
function invertNumber() {
  result.value = 1 / parseFloat(result.value);
}

// Insérer la valeur de pi (π)
function insertPi() {
  result.value += Math.PI;
}

// Effacer l'écran
function clearScreen() {
  result.value = "";
}

// Associer les fonctions aux boutons correspondants
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var value = button.value;

    if (value === "=") {
      evaluateExpression();
    } else if (value === "clear") {
      clearScreen();
    } else if (value === "sin" || value === "cos" || value === "tan" || value === "arcsin" || value === "arccos" || value === "arctan") {
      insertFunction(value);
    } else if (value === "log2" || value === "log10") {
      insertLogarithm(value.slice(3));
    } else if (value === "sqrt") {
      insertSquareRoot();
    } else if (value === "1/x") {
      invertNumber();
    } else if (value === "π") {
      insertPi();
    } else {
      result.value += value;
    }
  });
});
