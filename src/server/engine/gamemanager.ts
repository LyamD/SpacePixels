// MatterJS
import * as matterjs from 'matter-js';
const { Engine } = require("matter-js");
//SocketIO
import * as socketio from 'socket.io';
//SP imports
import { SystemManager} from "./systems/systemmanager";
import { SPWorld } from "./world";
import { ComponentManager} from './components/componentmanagerserver';
import { S_Propulsion, S_PlayerInputs } from './systems/systems';
import { C_Transform, C_Renderer, C_Engine, C_Player } from './components/components';
import { ServerIO } from '../main';
import { Entity } from './components/entity';

/** Tableau faisant le lien entre les Component {@link C_RigidBody} et Matter.JS */
export const MATTER_JS_BODIES = new Array<matterjs.Body>();


export class GameManager {

    /**Le moteur de matterEngine */
    matterEngine: matterjs.Engine;
    /**Notre monde qui contient les entitées */
    SPWORLD : SPWorld;
    /**Notre {@link SystemManager} */
    SystemManager: SystemManager;
    /**le serveur SocketIO */
    io : socketio.Server;
    
    
    /**Instancie les propriétes de notre World */
    constructor() {
        //Assigner les value des managers
        this.matterEngine = matterjs.Engine.create();
        this.SPWORLD = new SPWorld();
        this.SystemManager = new SystemManager(this.SPWORLD.componentManager, this.SPWORLD.ENTITIES);
        
    };

    /** Lance le jeu: setup + la gameloop */
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
            SystemManager.runSystems([SystemManager.systemsIndex.S_Propulsion, SystemManager.systemsIndex.S_PlayerInputs]);

            //On envoie toute les entités a tout les clients
            ServerIO.emit('state', SPWorld.ENTITIES);

            console.log('matter js bodies' + matterEngine.world.bodies);
           
            
        }, 1000/60);
    }

    /**Initialise les paramètres, entités, composants et system avant le lancer de la boucle */
    private setup() {

        let c_transform1 = new C_Transform(25,12);
        let c_transform2 = new C_Transform(15,12);
        let c_renderer1 = new C_Renderer("styled");
        let c_renderer2 = new C_Renderer("styled");
        let c_engine1 = new C_Engine(2);
        
        //let testRigibody = new C_RigidBody(this.matterEngine);

        let entity1 = new Entity([c_transform1, c_renderer1, c_engine1]);
        let entity2 = new Entity([c_transform2, c_renderer2]);

        this.SPWORLD.addEntity(entity1);
        this.SPWORLD.addEntity(entity2);

        this.SystemManager.addSystem(
            new S_Propulsion(['C_Transform', 'C_Engine'])
        );

        this.SystemManager.addSystem(
            new S_PlayerInputs(['C_Player', 'C_Transform'])
        );

        //MatterJs setup

        //On enlève la gravité
        this.matterEngine.world.gravity.y = 1;


        
    }
     
};