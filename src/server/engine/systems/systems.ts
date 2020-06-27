import { System } from "./systemmanager";
import { Component, C_Transform, C_Renderer, C_Engine } from "../components/component";

export class TestSystem extends System {

    constructor(components : Array<string>) {
        super(components);
   }

    run(entities : Array<Component>) {
        let transform : C_Transform = entities['C_Transform'];
        
        transform.x = transform.x + 1;
        console.log(transform.x);
    }

}

export class S_Render extends System {

    constructor(components : Array<string>) {
        super(components);
    }

    run(entityComponents : Array<Component>) {
        let Components = this.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let renderer : C_Renderer = Components['C_Renderer'];
        //console.log('entity rendered at :' + transform.x + ' ; ' + transform.y + ' with value : ' + renderer.style);
    }
}

export class S_Propulsion extends System {

    constructor(components: Array<string>) {
        super(components);
    }

    run(entityComponents : Array<Component>) {
        let Components = this.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let propulsion : C_Engine = Components['C_Engine'];
        transform.x = transform.x + propulsion.speed;
    }
}