import { System } from "./systemmanager";
import { Component, C_Transform, C_Renderer, C_Engine } from "../components/component";

export class S_Propulsion extends System {

    constructor(components: Array<string>) {
        super(components);
    }

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = this.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let propulsion : C_Engine = Components['C_Engine'];
        transform.x = transform.x + propulsion.speed;
    }
}