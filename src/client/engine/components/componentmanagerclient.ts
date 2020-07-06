import { Component, C_Transform, C_Player, C_Renderer, C_Engine } from "./components";
import { C_RigidBody } from "./componentsclient";

export class ComponentManager { 


    static createCompFromObject(comp: any) : Component{

        let component = ComponentManager.instantiateCompFromString(comp.name);

        return component;
    }

    static instantiateCompFromString(name: string) : Component {
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
            case 'C_RigidBody':
                return new C_RigidBody();
                break;
                    
            default: return null;
                break;
        }
    }

}