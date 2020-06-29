import { PlayerSocket } from ".";

export function setupSocketManager() {
    inputManagement();
}


// ---- Input Management
function inputManagement() {

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}


var inputs = {

    38 : {
        //MoveUp
        action : 'MoveUp',
        state : false
    },

    40 : {
        //MoveDown
        action : 'MoveDown',
        state : false
    },

    37 : {
        //MoveGauche
        action : 'MoveGauche',
        state : false
    },

    39 : {
        //MoveDroite
        action : 'MoveDroite',
        state : false
    },
}

function onKeyDown(ev : KeyboardEvent) {
    keyPressed(ev.keyCode);
}

function onKeyUp(ev: KeyboardEvent) {

    try {
        inputs[ev.keyCode].state = false;
        PlayerSocket.emit('PlayerInput', {
            action : inputs[ev.keyCode].action,
            state : false
        });
    } catch (e) {
        console.log('Touche non bindée, error : ' + e);   
    }
}

function keyPressed(keyCode : string | number) {
    //Si la touche n'a pas encore été pressée
    if (!inputs[keyCode].state) {
        PlayerSocket.emit('PlayerInput', {
            action : inputs[keyCode].action,
            state : true
        });
        console.log('touche pressé : ' + inputs[keyCode].action);
        inputs[keyCode].state = true;
    }
}