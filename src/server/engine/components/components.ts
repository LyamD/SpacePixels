export abstract class Component {
    name : string;
    [key: string]: any;

    constructor() {
        this.name = this.constructor.name;
    }
}

export class C_Player extends Component {
    socket;
}

export class C_Transform extends Component {
    x: number;
    y: number;
    rotation: number;

    constructor(x: number = 0, y: number = 0, rot: number = 0) {
        super();
        this.x = x;
        this.y = y;
        this.rotation = rot;
    }
}

export class C_Renderer extends Component {
    style: string;

    constructor(style : string = '') {
        super();
        this.style = style;
    }
}

export class C_Engine extends Component {
    speed: number;

    constructor(p_speed : number = 0) {
        super();
        this.speed = p_speed;
    }
}