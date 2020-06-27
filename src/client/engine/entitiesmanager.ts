import { Entity } from "./components/entity";

export class EntitiesManager {

    entities : Array<Entity>;

    constructor(entities : Array<Entity>) {
        this.entities = entities;
    }


    updateEntity(newEntity : any) {

        if (this.isEntityNew(newEntity)) {
            let entity = this.anyToEntity(newEntity);
            this.entities.push(entity);

            console.log('-- Entité ajouté');
        } else {
            let entity = this.findEntity(newEntity.id);
            this.updateEntityFromAny(entity, newEntity);

            console.log('-- entité update');
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
            components: ent.components
        }
        return entity;
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
    }
    

}