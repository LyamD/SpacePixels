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
    /** Tableau contenant les id des entités à détruire */
    ENTITYTODESTROY : Array<number>;
    

    constructor() {
        this.ENTITIES = Array<Entity>();
        this.componentManager = new ComponentManager();
        this.ENTITYTODESTROY = new Array<number>();
    }

    /**
     * Ajoute une entité a la liste des entités
     * @param entity l'entité à ajouter
     */
    addEntity(entity : Entity) {
        
        if (entity.components == null) {
            entity.components = new Array<Component>();
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
        let entity = this.isEntityID(p_entity);

        entity.components.push(p_component);
    }

    /**
     * Renvoie le component d'une entité
     * @param p_entity l'entité ou son id
     * @param p_component le nom du component désiré
     */
    getComponentFromEntity(p_entity: Entity | number, p_component: string) {
        let component = null;
        let entity = this.isEntityID(p_entity);

        entity.components.forEach(c => {
                if (c.name == p_component) {
                    component = c;
                }
            
        });
        return component;
    }

    /**Ajoute une entité à la liste des entités à détruire */
    addEntityToGarbage(entityID : number) {
        this.ENTITYTODESTROY.push(entityID);
    }

    /**Supprime toute les entités qui doivent l'être */
    cleanEntity() {

        this.ENTITYTODESTROY.forEach(entityid => {

            let entity = this.isEntityID(entityid);

            for (let i = entity.components.length-1; i >= 0; i--) {
                let comp = entity.components[i];
                console.log("removeComp : " + comp.name);
                this.removeComponentFromEntity(entity, comp.name);
            }

            let i = this.ENTITIES.indexOf(entity)
            if (i > -1) {
                this.ENTITIES.splice(i, 1);
            }
        })

        this.ENTITYTODESTROY = [];
    }

    /**
     * Enlève un Component d'une entité
     */
    removeComponentFromEntity(p_entity : Entity | number, p_comp : string) {
        let entity = this.isEntityID(p_entity);
        let comp = this.getComponentFromEntity(entity, p_comp);

        if (comp.name == "C_RigidBody") {
            this.componentManager.removeRigidbody(comp);
        }

        let i = entity.components.indexOf(comp);
        if (i > -1) {
            console.log("component spliced from entity");
            entity.components.splice(i, 1);
        }

    }

    /**
     * Retourne forcément une entité même si l'id est passé
     */
    private isEntityID(p_entity : Entity | number) : Entity {
        let entity;
        if (typeof p_entity === "number") {
            entity = this.getEntityFromID(p_entity);
        } else {
            entity = p_entity;
        }
        return entity
    }
}