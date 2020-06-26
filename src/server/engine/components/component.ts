export interface Component {
    [key: string]: any;
}

export class ComponentManager {

    COMPONENTS: Array<Component>

    constructor() {
        this.COMPONENTS = Array<Component>();
    }

    addComponents(comp: Component) {
        this.COMPONENTS.push(comp);
    }

    removeComponent(comp: Component) {
        let i = this.COMPONENTS.indexOf(comp);
        if (i > -1) {
            this.COMPONENTS.splice(i, 1);
        }
    }
}

export class C_Player implements Component {
    socket;
}

export class C_Position implements Component {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class C_Transform implements Component, C_Position {
    x: number;
    y: number;
    rotation: number;

    constructor(x: number = 0, y: number = 0, rot: number = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rot;
    }
}

export class C_Renderer implements Component {
    style: string;

    constructor(style : string) {
        this.style = style;
    }
}

export class C_Engine implements Component {
    speed: number;

    constructor(p_speed : number) {
        this.speed = p_speed;
    }
}