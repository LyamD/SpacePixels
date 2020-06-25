import { Entity } from "./components/entity";

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
}