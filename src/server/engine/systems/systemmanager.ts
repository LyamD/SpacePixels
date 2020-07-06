import { ComponentManager } from "../components/componentmanagerserver";
import { Entity } from "../components/entity";
import { Component } from "../components/components";

/**
 * Fichier contenant la définition du systemsManager et la classe abstraite System
 * @packageDocumentation
 */

 /**
  * Définition basique d'un système
  */
export abstract class System {

     /**Tableau de string contenant le nom de tout les Component requis pour ce système */
     compRequired : Array<string>;

     constructor(components : Array<string>) {
          this.compRequired = components;
     }
     
     /**Trie les entités ayant les Componentss requis et les passe à la fonction run() */
     runEntities(entities : Array<Entity>) {
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
                    entity.components.forEach((comp : Component) => {
                         //Si le component est présent dans les requis il est l'ajouter à notre array de component envoyer au système
                         if (this.compRequired.includes(comp.name)) {
                              //console.log(' - entity : ' + entity.id + ' - component required : ' + comp.constructor.name);
                              //On ajoute la réf a notre array local
                              entityComponents.push(comp);   
                              //console.log('oooof : ' + entityComponents['C_Transform'].x);
                         } else {
                              //console.log(' - entity : ' + entity.id + ' - component refused : ' + comp.constructor.name);
                         }
                    });
               }


               //Si aucun composant n'est nul && si aucun composants n'est null && si il y a au moins 1 composants
               if (entityComponents.length == this.compRequired.length && entityComponents.every(this.verifyComps) && entityComponents.length != 0) {
                    //console.log('lancement run()');
                    this.run(entityComponents, entity.id);
               } else {
                    //console.log('missing Comps : ' + entityComponents.length + ' / ' +  this.compRequired.length);
               }
          });
     }

     /**Map les entités à un tableau avec key:value où key est le nom du component */
     static mapEntities(entityComponents: Array<Component>) : Array<Component> {
          let arr = new Array<Component>();
          entityComponents.forEach(comp => {
               arr[comp.name] = comp;
          })
          return arr;
     }
     
     /**Vérifie que le component ne soit pas vide/null */
     private verifyComps(value : Component) : boolean {
          return (value != null);
     }

     /**Lance le système avec tout les composants requis de l'entité
      * @param entityComponents les components de l'entité requis pour ce système
      * @param entityID l'id de l'entité concerné
      */
     abstract run(entityComponents: Array<Component>, entityID: number) : void

}

/**
 * S'occupe de gérer tout les systèmes
 */
export class SystemManager {
     /**La liste de tout les systèmes référencés */
     SYSTEMS : Array<System>;
     /**Une référence vers toute nos entités */
     entities :  Array<Entity>;
     /**Un mapping entre les systèmes et leur position dans la liste */
     systemsIndex : SystemsIndexForOrder;

     /**
      * @param p_CompManager Un ComponentManager contenant les components de toutes les entités à traiter 
      * @param p_entities Une liste des Entités auquel appartiennent les Components
      */
     constructor(p_entities : Array<Entity>) {
          this.SYSTEMS = Array<System>();
          this.entities = p_entities;
          this.systemsIndex = new SystemsIndexForOrder();
     }

     /**Ajoute un système au SystemManager */
     addSystem(sys: System) {
          this.SYSTEMS.push(sys);
          let i = this.SYSTEMS.indexOf(sys);
          //La position du système dans le tableau est ajouté au tableau de mapping
          this.systemsIndex[sys.constructor.name] = i;
     }

     /**
      * Lance tout les systèmes
      * @param order l'ordre dans lequel les systèmes sont lancé, mapping par {@link SystemManager#addSystem}
      */
     runSystems(order: Array<number>) {
          order.forEach(systemIndex => {
              let sys : System = this.SYSTEMS[systemIndex];
              if (sys == null) {
                   console.log('error, unexistant system called');
              } else {
              sys.runEntities(this.entities);
              }
          });
  
      }
}
/**Associe le nom du système à son index dans la liste SYSTEMS. Permet de changer l'ordre
 * gérer par {@link SystemManager#addSystem}
*/
export class SystemsIndexForOrder{
     [key: string]: any
}