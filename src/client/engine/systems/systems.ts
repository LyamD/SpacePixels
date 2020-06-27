import { System } from "./systemmanagerclient";
import { Component, C_Transform, C_Renderer } from "../components/component";

export class S_Render extends System {

    constructor(components : Array<string>) {
        super(components);
    }

    run(entityComponents : Array<Component>) {
        console.log('- run S_Render')
        console.log('components passé : ' + JSON.stringify(entityComponents))
        let Components = this.mapEntities(entityComponents);
        console.log('components après mapping : ' + JSON.stringify(Components))
        let transform : C_Transform = Components['C_Transform'];
        let renderer : C_Renderer = Components['C_Renderer'];
        console.log('entity rendered at :' + transform.x + ' ; ' + transform.y + ' with value : ' + renderer.style);
    }
}