import { Entity } from "./components/entity";
import {ComponentManager } from "./components/componentmanagerserver";
import { Component, C_Player, C_Transform } from "./components/components";

export class SPWorld {

    // Array contenant toutes les entités
    ENTITIES : Array<Entity>;
    componentManager : ComponentManager;
    

    constructor() {
        this.ENTITIES = Array<Entity>();
        this.componentManager = new ComponentManager();
    }

    //Ajoute une entité a la liste des entités et ses components à la liste des components.
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

    getEntityFromID(p_id : number) : Entity {
        let entity = null;
        this.ENTITIES.forEach(ent => {
            if (ent.id == p_id) {
                entity = ent;
            }
        });
        return entity;
    }

    /* Ajoute un component à une entité
    *   @param ent: Entity l'entité qui recoit le component ou l'id de l'entité
    *   @param comp : Component le component qui est ajouté
    *   @param compManager : ComponentManager requis pour ajouter le component à la liste des components
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

    /* Permet de récuperer la réf d'un composant d'une entité spécifique
    *   @param ent : Entity ou son ID
    *   @param comp : Component on son nom
    * 
    *   @return : Component ou null si le component n'est pas présent.
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