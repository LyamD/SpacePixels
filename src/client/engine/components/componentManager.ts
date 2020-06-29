import { Component, C_Transform, C_Player, C_Renderer, C_Engine } from "./components";

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