import { ComponentManager, C_Transform, Component } from "../components/component";
import { Entity } from "../components/entity";
import { EntitiesManager } from "../entitiesmanager";



export abstract class System {

     compRequired : Array<string>;

     constructor(components : Array<string>) {
          this.compRequired = components;
     }
     
     runEntities(entities : Array<Entity>, components : Array<Component>) {
          //Pour toute les entités
          entities.forEach(entity => {
               console.log(' --------- System : ' + this.constructor.name + ' , Entity : ' + entity.id);
               this.compRequired.forEach(r => {
                    console.log('-- required : ' + r);
               })
               //On créer un array on l'on tente de récuperer tout les component requis
               var entityComponents = new Array<Component>();
               //Pour tout les composant (S'ils existent)
               if (entity.components != null) {   
                    entity.components.forEach(comp => {
                         //Si le component est présent dans les requis il est l'ajouter à comps
                         if (this.compRequired.includes(comp.name)) {
                              console.log(' - entity : ' + entity.id + ' - component required : ' + comp.name);
                              //On ajoute la réf a notre array local
                              if (EntitiesManager.getComponentFromEntity(entity, comp) != null) {
                                   let c = EntitiesManager.getComponentFromEntity(entity, comp);
                                   entityComponents.push(c);
                                   //console.log("voila : " + c.name + 'd\'entité  : ' + entity.id);
                              } else {
                                   console.log('missing comp');
                              }
                              //console.log('oooof : ' + entityComponents['C_Transform'].x);
                         } else {
                              console.log(' - entity : ' + entity.id + ' - component refused : ' + comp.name);
                         }
                    });
               }


               //Si aucun composant n'est nul
               if (entityComponents.length == this.compRequired.length && entityComponents.every(this.verifyComps)) {
                    this.run(entityComponents);
               } else {
                    console.log('missing Comps : ' + entityComponents.length + ' / ' +  this.compRequired.length);
               }
          });
     }

     mapEntities(entityComponents: Array<Component>) : Array<Component> {
          var arr = new Array<Component>();
          entityComponents.forEach(comp => {
               arr[comp.name] = comp;
          })
          return arr;
     }
     
     private verifyComps(value : Component) : boolean {
          return (value != null);
     }

     
     abstract run(entityComponents: Array<Component>) : void

}

export class SystemManager {
     SYSTEMS : Array<System>;
     COMPONENTS: Array<Component>;
     systemsIndex : SystemsIndexForOrder;
     //[key: string]: any;

     constructor(components: Array<Component>) {
          this.SYSTEMS = Array<System>();
          this.COMPONENTS = components;
          this.systemsIndex = new SystemsIndexForOrder();
     }

     addSystem(sys: System) {
          this.SYSTEMS.push(sys);
          let i = this.SYSTEMS.indexOf(sys);
          this.systemsIndex[sys.constructor.name] = i;
     }

     runSystems(order: Array<number>, entities : Array<Entity>) {
          order.forEach(systemIndex => {
               let sys : System = this.SYSTEMS[systemIndex];
               sys.runEntities(entities, this.COMPONENTS);
          });
  
      }
}
//Associe le nom du système à son index dans la liste SYSTEMS. Permet de changer l'ordre
// A Modifier lors du changement d'implémentations de systeme
export class SystemsIndexForOrder{
     [key: string]: any
}