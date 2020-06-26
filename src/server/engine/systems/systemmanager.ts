import { ComponentManager, C_Transform, Component } from "../components/component";
import { Entity } from "../components/entity";
import { SPWorld } from "../world";



export abstract class System {

     compRequired : Array<string>;

     constructor(components : Array<string>) {
          this.compRequired = components;
     }
     
     runEntities(entities : Array<Entity>, components : Array<Component>) {
          //Pour toute les entités
          entities.forEach(entity => {
               //On créer un array on l'on tente de récuperer tout les component requis
               var comps = new Array<Component>();
               //Pour tout les composant requis
               components.forEach(comp => {
                    //Si le component est présent dans les requis il est l'ajouter à comps
                    if (this.compRequired.includes(comp.constructor.name)) {
                         //On ajoute la réf a notre array local
                         comps[comp.constructor.name] = SPWorld.getComponentFromEntity(entity, comp);
                    }
               });

               //Si aucun composant n'est nul
               if (comps.every(this.verifyComps)) {
                    this.run(comps);
               }
          });
     }
     
     private verifyComps(value : Component) : boolean {
          return (value != null);
     }

     
     abstract run(components: Array<Component>) : void

}

export class SystemManager {
     SYSTEMS : Array<System>;
     CompManager: ComponentManager;
     systemsIndex : SystemsIndexForOrder;
     //[key: string]: any;

     constructor(CompManager: ComponentManager) {
          this.SYSTEMS = Array<System>();
          this.CompManager = CompManager;
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
              sys.runEntities(entities, this.CompManager.COMPONENTS);
          });
  
      }
}
//Associe le nom du système à son index dans la liste SYSTEMS. Permet de changer l'ordre
// A Modifier lors du changement d'implémentations de systeme
export class SystemsIndexForOrder{
     [key: string]: any
}