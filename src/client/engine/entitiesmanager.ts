import { Entity } from "./components/entity";
import { Component, ComponentManager } from "./components/component";

export class EntitiesManager {

    entities : Array<Entity>;
    components : Array<Component>;

    constructor(entities : Array<Entity>, components : Array<Component>) {
        this.entities = entities;
        this.components = components;
    }


    updateEntity(newEntity : any) {

        if (this.isEntityNew(newEntity)) {
            let entity = this.anyToEntity(newEntity);
            this.entities.push(entity);

            console.log('-- Entité ajouté');
        } else {
            let entity = this.findEntity(newEntity.id);
            this.updateEntityFromAny(entity, newEntity);
        }
        
    }

    cleanEntities(data : Array<any>) {
        this.entities.forEach(entity => {

            let newEntity = data.find(newEnt =>
                newEnt.id == entity.id    
            );

            if (newEntity == null) {
                this.removeEntity(entity);
            }
        });

    }

    private anyToEntity(ent : any) : Entity {
        var entity : Entity = {
            id : ent.id,
            components: Array<Component>()
        }

        Object.values(ent.components).forEach((comp : Component) => {
            let component = ComponentManager.createCompFromObject(comp);
            component = JSON.parse(JSON.stringify(comp));

            this.addComponentToEntity(entity, component);
        });
        console.log('oui : ' + entity.components);
        return entity;
    }

    addComponentToEntity(ent: Entity, comp: Component) {
        ent.components.push(comp);
        this.components.push(comp);
    }

    private findEntity(id : number) : Entity{
        let ent = this.entities.find(entity => 
            entity.id == id
            );
        return ent
    }

    private isEntityNew(newEnt: any) : boolean {

        let ent = this.entities.find(entity => 
            entity.id == newEnt.id
            );

        if (ent == null) {
            return true
        } else {
            return false
        }
    }

    private updateEntityFromAny(entity : Entity, newEntity : any) {
        entity.components = JSON.parse(JSON.stringify(newEntity.components));
    }

    private removeEntity(entity : Entity) {
        let index = this.entities.indexOf(entity);
        this.entities.slice(index,index);

        console.log('-- Entité removed');
    }
    

    static getComponentFromEntity(ent: Entity, comp: Component) : Component {
        let component = null;
        ent.components.forEach(c => {
            if (c.name == comp.name) {
                component = c;
            }
        });
        return component;
    }

}