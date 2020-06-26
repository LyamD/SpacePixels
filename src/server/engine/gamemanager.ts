// MatterJS
import * as matterjs from 'matter-js';
const { Engine } = require("matter-js");
//SP imports
import { SystemManager} from "./systems/systemmanager";
import { SPWorld } from "./world";
import { ComponentManager, C_Transform, C_Renderer, C_Engine } from './components/component';
import { TestSystem, S_Render, S_Propulsion } from './systems/systems';


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
            SystemManager.runSystems([SystemManager.systemsIndex.S_Render, SystemManager.systemsIndex.S_Propulsion], SPWorld.ENTITIES);
           
            
        }, 1000/60);
    }

    private setup() {

        let testEnt1 = this.SPWORLD.addEntity();
        let testEnt2 = this.SPWORLD.addEntity();
        let testComp = new C_Transform(15,12);
        let testCompB = new C_Transform(25,12);
        let testComp2 = new C_Renderer("styled");
        let testComp2B = new C_Renderer("styledkibouge");
        let testComp3 = new C_Engine(12);

        this.SystemManager.addSystem(
            new S_Render(['C_Transform', 'C_Renderer'])
        );

        this.SystemManager.addSystem(
            new S_Propulsion(['C_Transform', 'C_Engine'])
        );


        // this.SPWORLD.addComponentToEntity(testEnt1, testComp, this.ComponentManager);
        this.SPWORLD.addComponentToEntity(testEnt1, testComp2, this.ComponentManager);

        this.SPWORLD.addComponentToEntity(testEnt2, testCompB, this.ComponentManager);
        this.SPWORLD.addComponentToEntity(testEnt2, testComp2B, this.ComponentManager);
        this.SPWORLD.addComponentToEntity(testEnt2, testComp3, this.ComponentManager);
    }
     
};