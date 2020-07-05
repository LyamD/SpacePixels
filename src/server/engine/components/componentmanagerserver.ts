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

    /**La liste de tout les components */
    COMPONENTS: Array<Component>

    constructor() {
        this.COMPONENTS = Array<Component>();
    }

    /**Ajoute un Component */
    addComponents(comp: Component) {
        this.COMPONENTS.push(comp);
    }

    /**
     * Enlève la référence vers un component
     * @param comp le component à supprimer
     */
    removeComponent(comp: Component) {
        let i = this.COMPONENTS.indexOf(comp);

        if (comp.name == "C_RigidBody") {
            this.removeRigidbody(comp)
        }
        if (i > -1) {
            this.COMPONENTS.splice(i, 1);
        }
    }

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

    removeRigidbody(comp : any) {
        let matterBody = MATTER_JS_BODIES[comp.BodyID];
        World.remove(GameManager.matterEngine.world, matterBody);
        MATTER_JS_BODIES.splice(comp.BodyID, 1);
    }

}