export interface Component {

}

export class C_Player implements Component {
    socket;
}

export class C_Position implements Component {
    x: number;
    y: number;
}

export class C_Transform implements Component, C_Position {
    x: number;
    y: number;
    rotation: number;
}