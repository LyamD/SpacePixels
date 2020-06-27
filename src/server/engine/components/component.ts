export abstract class Component {
    name : string;
    [key: string]: any;

    constructor() {
        this.name = this.constructor.name;
    }
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

    static createCompFromObject(comp: any) : Component{

        function instantiateCompFromString(name: string) : Component {
            switch (name) {
                case 'C_Transform':
                    return new C_Transform();
                    break;
                case 'C_Player':
                    return new C_Player();
                    break;
                case 'C_Renderer':
                    return new C_Renderer();
                    break;
                case 'C_Engine':
                    return new C_Engine();
                    break;
                        
                default: return null;
                    break;
            }
        }

        let component = instantiateCompFromString(comp.name);

        return component;
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