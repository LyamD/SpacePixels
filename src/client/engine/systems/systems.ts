import { System } from "./systemmanagerclient";
import { C_Transform, C_Renderer } from "../components/components";
import { RenderedEntities } from "../../game";
import { Graphics } from "pixi.js";
import { Component } from "../components/components";
import { pixiApp } from "../..";

export class S_Render extends System {


    constructor(components : Array<string>) {
        super(components);
    }

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = this.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let renderer : C_Renderer = Components['C_Renderer'];

        isPixiRendererCreated(entityID);

        //On tente de récuperer le Graphic liée à notre entité.
        //Si il est null, on en instancie 1 selon le style du component
        //Sinon on modifie les valeurs de celui existant;
        function isPixiRendererCreated(entityID: number) {
            let graphics : Graphics = RenderedEntities[entityID];
            if (graphics == null) {
                let graphicType = renderer.style
                let g = typeToGraphic(graphicType);

                g.x = transform.x;
                g.y = transform.y;
                g.rotation = transform.rotation;

                pixiApp.stage.addChild(g);
                console.log('Nouveau Graphics ' )
                RenderedEntities[entityID] = g;
            } else {
                graphics.x = transform.x;
                graphics.y = transform.y;
                graphics.rotation = transform.rotation;
            }
        }

        function typeToGraphic(type:string) : Graphics{
            switch (type) {
                case 'styled':
                    let g = new Graphics();
                    g.lineStyle(4, 0xFF3300, 1);
                    g.beginFill(0x66CCFF);
                    g.drawRect(0, 0, 64, 64);
                    g.endFill();
                    return g;

                case 'player':
                    let g1 = new Graphics();
                    g1.lineStyle(4, 0x000000, 1);
                    g1.beginFill(0xBC8822);
                    g1.drawRect(0, 0, 64, 64);
                    g1.endFill();
                    return g1;
            
                default: 
                    let gNoStyle = new Graphics();
                    g.beginFill(0x000000);
                    g.drawRect(0, 0, 64, 64);
                    g.endFill();
                    return gNoStyle;
            }
        }


    }
}