import { System } from "./system";
import { Component, C_Transform } from "../components/component";

export class TestSystem extends System {

    run(entities : Array<Component>) {
        let transform : C_Transform = entities['C_Transform'];
        
        transform.x = transform.x + 1;
    }

}