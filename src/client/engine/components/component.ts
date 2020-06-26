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
    type :string;
    socket;
}

export class C_Position implements Component {
    type :string;
    x: number;
    y: number;
}

export class C_Transform implements Component, C_Position {
    type: string;
    x: number;
    y: number;
    rotation: number;

    constructor(x: number = 0, y: number = 0, rot: number = 0) {
        this.type = 'Transform'
        this.x = x;
        this.y = y;
        this.rotation = rot;
    }
}