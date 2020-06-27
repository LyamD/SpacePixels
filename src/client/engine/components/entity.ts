import { Component } from "./component";



export interface Entity {
    id : number;
    components? : Array<Component>;
}

export function createEntity() {
    
}

