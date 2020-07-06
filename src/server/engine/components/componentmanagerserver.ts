import { Component, C_Transform, C_Player, C_Renderer, C_Engine } from "./components";
import { C_RigidBody } from "./componentsserver";
import { MATTER_JS_BODIES, GameManager } from "../gamemanager";
import { World } from "matter-js";

/**
 * Contient le ComponentManager
 * @packageDocumentation
 */

/**
 * S'occupe de référencer tout les components pour faciliter le travail de {@link SystemManager}
 */
export class ComponentManager {


    /**
     * Instancie un objet Component à partir des données seulement
     * @param comp les données du composant à initialiser
     * @return la descendance de Component instancié
     */
    static createCompFromObject(comp: any) : Component{

        let component = ComponentManager.instantiateCompFromString(comp.name);

        return component;
    }

    /**
     * Instancie un Component à partir de son nom de Classe
     * @param name le nom de classe du Component
     */
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

    /**Supprime le rigidbody lié à un component dans MatterJS */
    removeRigidbody(comp : C_RigidBody) {
        let matterBody = MATTER_JS_BODIES[comp.BodyID];
        World.remove(GameManager.matterEngine.world, matterBody);
        MATTER_JS_BODIES[comp.BodyID] = null;
    }

}