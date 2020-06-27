import { Entity } from "./components/entity";
import { Component, ComponentManager } from "./components/component";

export class SPWorld {

    // Array contenant toutes les entités
    ENTITIES : Array<Entity>;
    

    constructor() {
        this.ENTITIES = Array<Entity>();
    }

    // créer une entité, lui assigne un id random et l'ajoute à la liste des entités
    addEntity() : Entity {
        //Génère l'id aléatoire
        let id = Math.random().toString().substr(2,9);
        let entity : Entity = {
            id: id
        }
        //ajoute l'entité a l'Array
        this.ENTITIES.push(entity);

        return entity;
    };

    /* Ajoute un component à une entité
    *   @param ent: Entity l'entité qui recoit le component
    *   @param comp : Component le component qui est ajouté
    *   @param compManager : ComponentManager requis pour ajouter le component à la liste des components
    */
    addComponentToEntity(ent: Entity, comp: Component, compManager: ComponentManager) {
        //Si c'est le premier component on créer l'array
        if (ent.components == null) {
            ent.components = new Array<Component>();
        }
        //On ajoute le component à l'array de l'entité et à celui du compManager
        ent.components.push(comp);
        compManager.COMPONENTS.push(comp);

        // console.log('AddToEntity : ' + ent.id + ' ,component : ' + comp.constructor.name);

    }

    /* Permet de récuperer la réf d'un composant d'une entité spécifique
    *   @param ent : Entity 
    *   @param comp : Component
    * 
    *   @return : Component ou null si le component n'est pas présent.
    */
    static getComponentFromEntity(ent: Entity, comp: Component) : Component {
        let component = null;
        ent.components.forEach(c => {
            if (c.constructor.name == comp.constructor.name) {
                component = c;
            }
        });

        //console.log('getCompFromEntity returned : ' + component.constructor.name + ' from ent : ' + ent.id);

        return component;
    }
}