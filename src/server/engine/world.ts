import { Entity } from "./components/entity";
import {ComponentManager } from "./components/componentmanagerserver";
import { Component } from "./components/components";

/**
 * Définition d'un World SpacePixels, faisant le lien entre toutes les entités et leur Component
 * @packageDocumentation
 */

 /**
  * Monde (World) de Space pixels, contenant toutes les entités et leur composants
  */
export class SPWorld {

    /**Contient toutes les entités de ce monde */
    ENTITIES : Array<Entity>;
    /**Référence vers le Component Manager, voir {@link ComponentManager} */
    componentManager : ComponentManager;
    

    constructor() {
        this.ENTITIES = Array<Entity>();
        this.componentManager = new ComponentManager();
    }

    /**
     * Ajoute une entité a la liste des entités et ses components à la liste des components.
     * @param entity l'entité à ajouter
     */
    addEntity(entity : Entity) {
        
        if (entity.components == null) {
            entity.components = new Array<Component>();
        } else {
            entity.components.forEach(component => {
                this.componentManager.COMPONENTS.push(component);
            })
        }
        //ajoute l'entité a l'Array
        this.ENTITIES.push(entity);
    };

    /**
     * Renvoie une entité
     * @param p_id l'id de l'entité
     */
    getEntityFromID(p_id : number) : Entity {
        let entity = null;
        this.ENTITIES.forEach(ent => {
            if (ent.id == p_id) {
                entity = ent;
            }
        });
        return entity;
    }

    /**
     * Ajoute un component à une entité et à la liste des components
     * @param p_entity l'entité qui recoit le Component
     * @param p_component Le Component à ajouter
     */
    addComponentToEntity(p_entity: Entity | number, p_component: Component) {
        //Si c'est l'id qui est passé
        var entity : Entity;
        if (typeof p_entity === "number") {
            entity = this.getEntityFromID(p_entity);
        } else {
            entity = p_entity;
        }

        entity.components.push(p_component);
        this.componentManager.COMPONENTS.push(p_component);
    }

    // newPlayer(socket : SocketIO.EngineSocket) {
    //     let player = this.addEntity();
    //     let playerComp = new C_Player(socket.id);
    //     let transformComp = new C_Transform(50,50);

        
    // }

    /**
     * Renvoie le component d'une entité
     * @param p_entity l'entité ou son id
     * @param p_component le nom du component désiré
     */
    getComponentFromEntity(p_entity: Entity | number, p_component: string) {
        let component = null;
        let entity;
        if (typeof p_entity === "number") {
            entity = this.getEntityFromID(p_entity);
        } else {
            entity = p_entity;
        }

        entity.components.forEach(c => {
                console.log('foreach comp : ' + c.name);
                if (c.name == p_component) {
                    console.log('trouvay');
                    component = c;
                }
            
        });
        return component;
    }
}