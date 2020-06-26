import { ComponentManager, C_Transform, Component } from "../components/component";

export interface System {
     run(entities : Array<Component>) : void;
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

     runSystems(order: Array<number>) {
          order.forEach(systemIndex => {
              let sys = this.SYSTEMS[systemIndex];
              sys.run(this.CompManager.COMPONENTS)
              
              //this.SYSTEMS[systemIndex].run();
          });
  
      }
}

export class S_TestSystem implements System {
     run(components: Array<Component>) {
          //On regarde chacun de leur composant et on enregistre ceux dont on a besoin
          components.forEach(comp => {
               if(comp instanceof C_Transform) {
                    this.Move(comp as C_Transform);
               }
          })
     }

     Move(comp: C_Transform) {
          comp.x = comp.x+1;
     }
}

//Associe le nom du système à son index dans la liste SYSTEMS. Permet de changer l'ordre
// A Modifier lors du changement d'implémentations de systeme
export class SystemsIndexForOrder{
     [key: string]: any
}