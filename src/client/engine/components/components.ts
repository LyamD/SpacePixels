export abstract class Component {
    name : string;
    [key: string]: any;

    constructor() {
        this.name = this.constructor.name;
    }
}

export class C_Player extends Component {
    socketID : string;

    constructor(p_id : string = '') {
        super();
        this.socketID = p_id;
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

export class C_RigidBody extends Component {

    weight : number;

    constructor(p_weight : number = 1) {
        super();
        this.weight = p_weight;
    }
}