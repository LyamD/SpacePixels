// MatterJS
import * as matterjs from 'matter-js';
const { Engine } = require("matter-js");
//SP imports
import { SystemManager} from "./systems/systemmanager";
import { SPWorld } from "./world";
import { ComponentManager, C_Transform } from './components/component';
import { TestSystem } from './systems/systems';


export class GameManager {

    //Le moteur de matterEngine
    matterEngine: any;
    // Nos managers
    ComponentManager: ComponentManager;
    SystemManager: SystemManager;
    //Notre monde qui contient les entitées
    SPWORLD : SPWorld;
    

    constructor() {
        //Assigner les value des managers
        this.matterEngine = matterjs.Engine.create();
        this.SPWORLD = new SPWorld();
        this.ComponentManager = new ComponentManager();
        this.SystemManager = new SystemManager(this.ComponentManager);
        
    };

    launch() {
        //On reprend une ref des variables pour setInterval
        let matterEngine = this.matterEngine;
        let SystemManager = this.SystemManager;
        let SPWorld = this.SPWORLD;

        //Appel à la fonction setup
        this.setup();

        //Loop du jeu
        setInterval(function() {

            //Loop de MatterJS
            Engine.update(matterEngine, 1000/60);

            //On appel le système manager à lancer les systèmes
            //En paramètre un Array composé de systemsIndex pour l'ordre de lancement
            SystemManager.runSystems([SystemManager.systemsIndex.TestSystem], SPWorld.ENTITIES);
           
            
        }, 1000/60);
    }

    private setup() {

        let testEnt = this.SPWORLD.addEntity();
        let testComp = new C_Transform(15,12);
        this.SystemManager.addSystem(
            new TestSystem(['C_Transform'])
        );


        this.SPWORLD.addComponentToEntity(testEnt, testComp, this.ComponentManager);
    }
     
};