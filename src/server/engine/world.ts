import { Entity } from "./components/entity";
import { Component, ComponentManager } from "./components/component";

export class SPWorld {

    ENTITIES : Array<Entity>;
    

    constructor() {
        this.ENTITIES = Array<Entity>();
    }

    addEntity() : Entity {

        let id = Math.random().toString().substr(2,9);
        let entity : Entity = {
            id: id
        }

        this.ENTITIES.push(entity);
        return entity;

    };

    addComponentToEntity(ent: Entity, comp: Component, compManager: ComponentManager) {
        if (ent.components == null) {
            ent.components = new Array<Component>();
        }

        ent.components.push(comp);
        compManager.COMPONENTS.push(comp);

    }

    getComponentFromEntity(ent: Entity, comp: Component) : Component {
        let component = null;
        ent.components.forEach(c => {
            if (typeof c === typeof comp) {
                component = c;
            }
        });
        return component;
    }
}