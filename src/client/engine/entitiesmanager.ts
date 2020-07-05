import { Entity } from "./components/entity";
import { ComponentManager } from "./components/componentmanagerclient";
import { Component } from "./components/components";

export class EntitiesManager {

    entities : Array<Entity>;
    components : Array<Component>;

    constructor(entities : Array<Entity>, components : Array<Component>) {
        this.entities = entities;
        this.components = components;
    }

    //Update une entity de notre tableau à partir d'un objet
    updateEntity(newEntity : any) {

        //Si l'entité est nouvelle, on créer l'objet typé et on l'ajoute à nos entités
        if (this.isEntityNew(newEntity)) {
            let entity = this.anyToEntity(newEntity);
            this.entities.push(entity);

            console.log('-- Entité ajouté');
        } else {
            //Sinon, on update les valeurs de l'entité
            let entity = this.findEntity(newEntity.id);
            this.updateEntityFromAny(entity, newEntity);
        }
        
    }

    //Enlève tout les entités qui ne sont pas transmise par le serveur
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

    //Transforme un objet non typé en entité
    private anyToEntity(ent : any) : Entity {
        var entity : Entity = {
            id : ent.id,
            components: Array<Component>()
        }

        //Pour chaque component de l'objet, on créer un component Typé et on l'ajoute à l'entité
        Object.values(ent.components).forEach((comp : Component) => {
            let component = ComponentManager.createCompFromObject(comp);
            component = JSON.parse(JSON.stringify(comp));

            this.addComponentToEntity(entity, component);
        });
        return entity;
    }

    //Ajoute un composant à une entité
    addComponentToEntity(ent: Entity, comp: Component) {
        ent.components.push(comp);
        this.components.push(comp);
    }

    //Trouve une entité par son id
    private findEntity(id : number) : Entity{
        let ent = this.entities.find(entity => 
            entity.id == id
            );
        return ent
    }

    //Vérifie si une entité est présente dans notre tableau local
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

    //Update une entité à partir d'un objet non typé
    private updateEntityFromAny(entity : Entity, newEntity : any) {
        entity.components = JSON.parse(JSON.stringify(newEntity.components));
    }

    //Enlève une entité
    private removeEntity(entity : Entity) {
        let index = this.entities.indexOf(entity);

        entity.components.forEach(comp => {
            if (comp.name == "C_Renderer") {
            }
        });

        this.entities.splice(index,1);
        console.log('-- Entité removed');
    }
    
    //Renvoie la référence d'un component d'une entité voulue
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