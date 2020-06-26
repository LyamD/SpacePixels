// MatterJS
import * as matterjs from 'matter-js';
//Base
import { System, SystemsIndexForOrder, SystemManager, S_TestSystem } from "./systems/system";
import { SPWorld } from "./world";
import { ComponentManager, C_Transform, C_Position } from './components/component';

const { Engine } = require("matter-js");

export class GameManager {

    matterEngine: any;
    ComponentManager: ComponentManager;
    SystemManager: SystemManager;

    SPWORLD : SPWorld;
    

    constructor() {
        //Création MatterJS engine
        this.matterEngine = matterjs.Engine.create();
        this.SPWORLD = new SPWorld();
        this.ComponentManager = new ComponentManager();
        this.SystemManager = new SystemManager(this.ComponentManager);
        
    };

    launch() {
        let matterEngine = this.matterEngine;
        let SystemManager = this.SystemManager;
        let SPWorld = this.SPWORLD

        let testEnt = this.SPWORLD.addEntity();
        let testComp = new C_Transform(15,12);
        this.SystemManager.addSystem(
            new S_TestSystem()
        );

        this.SPWORLD.addComponentToEntity(testEnt, testComp, this.ComponentManager);

        setInterval(function() {

            //Loop de MatterJS
            Engine.update(matterEngine, 1000/60);

            SystemManager.runSystems([SystemManager.systemsIndex.S_TestSystem]);

            // this.runSystems([
            //     SystemsIndexForOrder.systemA,
            //     SystemsIndexForOrder.systemD,
            //     SystemsIndexForOrder.systemB
            // ]);
           
            
        }, 1000/60);
    }
     
};