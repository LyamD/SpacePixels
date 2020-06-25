import { Component } from "./component";



export interface Entity {
    id : number|string;
    components? : Array<Component>;
}

export function createEntity() {
    
}

