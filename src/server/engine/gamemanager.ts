// MatterJS
import * as matterjs from 'matter-js';
//Base
import { Entity } from "./components/entity";
import { System } from "./systems/system";
import { SPWorld } from "./world";

const { Engine } = require("matter-js");

export class GameManager {

    matterEngine: any;

    SPWORLD : SPWorld;
    SYSTEMS: System[] = [];

    constructor() {
        //Création MatterJS engine
        this.matterEngine = matterjs.Engine.create();
        this.SPWORLD = new SPWorld();
        this.SYSTEMS = new Array<System>();

        //Game loop
        
    };

    launch() {
        let matterEngine = this.matterEngine;
        setInterval(function() {

            //Loop de MatterJS
            Engine.update(matterEngine, 1000/60);
           
            
        }, 1000/60);
    }
     
};