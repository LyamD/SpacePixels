/**
 * Documents contenant les Component basique utile au serveur & client
 * @packageDocumentation
 */

export abstract class Component {
    name : string;

    constructor() {
        this.name = this.constructor.name;
    }
}

export class C_Player extends Component {
    socketID : string;
    inputs : {
        MoveUp,
        MoveDown,
        MoveGauche,
        MoveDroite
    };

    constructor(p_id : string = '') {
        super();
        this.socketID = p_id;
        this.inputs = {
            MoveUp: false,
            MoveDown : false,
            MoveGauche: false,
            MoveDroite: false
        }
    }
}

export class C_Transform extends Component {
    x: number;
    y: number;
    rotation: number;

    constructor(p_x: number = 0, p_y: number = 0, p_rot: number = 0) {
        super();
        this.x = p_x;
        this.y = p_y;
        this.rotation = p_rot;
    }
}

export class C_Renderer extends Component {
    style: string;

    constructor(p_style : string = '') {
        super();
        this.style = p_style;
    }
}

export class C_Engine extends Component {
    speed: number;

    constructor(p_speed : number = 0) {
        super();
        this.speed = p_speed;
    }
}
