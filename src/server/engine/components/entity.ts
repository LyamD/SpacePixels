import { Component } from "./components";



export class Entity {
    id : number;
    components? : Array<Component>;

    constructor(p_components? : Array<Component>) {
        this.id = +Math.random().toString().substr(2,9);
        //Might bug ?
        this.components = p_components;
    }
}


