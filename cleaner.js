// MIT License
// Copyright (c) 2025 Kevin Secaida

let contadorEstados = 0;

function reflex_agent(location, state) {
    if (state == "SUCIO") return "LIMPIO";
    else if (location == "A") return "DERECHA";
    else if (location == "B") return "IZQUIERDA";
}

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    contadorEstados++;
    document.getElementById("log").innerHTML += "<br>Estado #".concat(contadorEstados).concat(" | UBICACIÓN: ").concat(location).concat(" | ACCIÓN: ").concat(action_result);

    if (action_result == "LIMPIO") {
        if (location == "A") states[1] = "LIMPIO";
        else if (location == "B") states[2] = "LIMPIO";
    } else if (action_result == "DERECHA") states[0] = "B";
    else if (action_result == "IZQUIERDA") states[0] = "A";

    // Verificar si ambos lugares están limpios
    if (states[1] == "LIMPIO" && states[2] == "LIMPIO") {
        document.getElementById("log").innerHTML += "<br>Todo está limpio. Deteniendo...";
        return;
    }

    // Ensuciar aleatoriamente uno de los lugares después de un tiempo
    setTimeout(function() {
        if (Math.random() < 0.5) {
            states[1] = "SUCIO";
            document.getElementById("log").innerHTML += "<br>La posición A está sucia.";
        } else {
            states[2] = "SUCIO";
            document.getElementById("log").innerHTML += "<br>La posición B está sucia.";
        }
        setTimeout(function() { test(states); }, 1000);
    }, 1000);
}

// Iniciar el agente con el estado inicial
window.onload = function() {
    var states = ["A", "SUCIO", "SUCIO"];
    test(states);
};

