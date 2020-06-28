import { Client } from "socket.io";
import { PlayerSocket } from ".";

export function setupSocketManager() {

    PlayerSocket

}

export function inputManagement(socket: any) {

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

interface InputsType {
    action : string;
    state : boolean;
}

var inputs = {
    37 : {
        action : 'moveGauche',
        state : false,
    },
    38 : {
        action : 'moveUp',
        state : false,
    },
    39 : {
        action : 'moveDroite',
        state : false,
    },
    40 : {
        action : 'moveDown',
        state : false,
    },
}

function onKeyDown(env : KeyboardEvent) {
    
}

function onKeyUp(socket: any) {

}