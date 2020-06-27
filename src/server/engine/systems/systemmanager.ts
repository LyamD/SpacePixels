import { ComponentManager, C_Transform, Component } from "../components/component";
import { Entity } from "../components/entity";
import { SPWorld } from "../world";


//Classe de base pour tout les systèmes
export abstract class System {

     //Tableau de string contenant le nom de tout les Component requis pour ce système
     compRequired : Array<string>;

     constructor(components : Array<string>) {
          this.compRequired = components;
     }
     
     //Lance le système pour toute les entités
     runEntities(entities : Array<Entity>, components : Array<Component>) {
          //Pour toute les entités
          entities.forEach(entity => {
               //console.log(' --------- System : ' + this.constructor.name + ' , Entity : ' + entity.id);
               this.compRequired.forEach(r => {
                    //console.log('-- required : ' + r);
               })
               //On créer un array on l'on tente de récuperer tout les component requis
               var entityComponents = new Array<Component>();
               //Pour tout les composant (S'ils existent)
               if (entity.components != null) {   
                    entity.components.forEach(comp => {
                         //Si le component est présent dans les requis il est l'ajouter à notre array de component envoyer au système
                         if (this.compRequired.includes(comp.name)) {
                              //console.log(' - entity : ' + entity.id + ' - component required : ' + comp.constructor.name);
                              //On ajoute la réf a notre array local
                              if (SPWorld.getComponentFromEntity(entity, comp) != null) {
                                   let c = SPWorld.getComponentFromEntity(entity, comp);
                                   entityComponents.push(c);
                                   //console.log("voila : " + c.constructor.name);
                              } else {
                                   //console.log('missing comp');
                              }
                              //console.log('oooof : ' + entityComponents['C_Transform'].x);
                         } else {
                              //console.log(' - entity : ' + entity.id + ' - component refused : ' + comp.constructor.name);
                         }
                    });
               }


               //Si aucun composant n'est nul && si aucun composants n'est null
               if (entityComponents.length == this.compRequired.length && entityComponents.every(this.verifyComps)) {
                    //console.log('lancement run()');
                    this.run(entityComponents);
               } else {
                    console.log('missing Comps : ' + entityComponents.length + ' / ' +  this.compRequired.length);
               }
          });
     }

     //Map les entités à un tableau avec key:value où key est le nom du component
     mapEntities(entityComponents: Array<Component>) : Array<Component> {
          let arr = new Array<Component>();
          entityComponents.forEach(comp => {
               arr[comp.name] = comp;
          })
          return arr;
     }
     
     private verifyComps(value : Component) : boolean {
          return (value != null);
     }

     //Fonction du système à définir pour chaque système
     abstract run(entityComponents: Array<Component>) : void

}

//Classe s'occupant de gérer les systèmes
export class SystemManager {
     SYSTEMS : Array<System>;
     CompManager: ComponentManager;
     systemsIndex : SystemsIndexForOrder;

     constructor(CompManager: ComponentManager) {
          this.SYSTEMS = Array<System>();
          this.CompManager = CompManager;
          this.systemsIndex = new SystemsIndexForOrder();
     }

     //Ajoute un système
     addSystem(sys: System) {
          this.SYSTEMS.push(sys);
          let i = this.SYSTEMS.indexOf(sys);
          //La position du système dans le tableau est ajouté au tableau de mapping
          this.systemsIndex[sys.constructor.name] = i;
     }

     //Lance tout les systèmes
     runSystems(order: Array<number>, entities : Array<Entity>) {
          order.forEach(systemIndex => {
              let sys : System = this.SYSTEMS[systemIndex];
              if (sys == null) {
                   console.log('error, unexistant system called');
              }
              sys.runEntities(entities, this.CompManager.COMPONENTS);
          });
  
      }
}
//Associe le nom du système à son index dans la liste SYSTEMS. Permet de changer l'ordre
// A Modifier lors du changement d'implémentations de systeme
export class SystemsIndexForOrder{
     [key: string]: any
}