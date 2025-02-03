// MIT License
// Copyright (c) 2025 Kevin Secaida

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);

    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    // Verificar si ambos lugares están limpios
    if (states[1] == "CLEAN" && states[2] == "CLEAN") {
        document.getElementById("log").innerHTML += "<br>Both locations are clean. Stopping.";
        return;
    }

    // Ensuciar aleatoriamente uno de los lugares después de un tiempo
    setTimeout(function() {
        if (Math.random() < 0.5) {
            states[1] = "DIRTY";
            document.getElementById("log").innerHTML += "<br>Location A is now DIRTY.";
        } else {
            states[2] = "DIRTY";
            document.getElementById("log").innerHTML += "<br>Location B is now DIRTY.";
        }
        setTimeout(function() { test(states); }, 1000);
    }, 1000);
}

// Iniciar el agente con el estado inicial
window.onload = function() {
    var states = ["A", "DIRTY", "DIRTY"];
    test(states);
};
