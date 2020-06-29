import { Component } from "./components";



export interface Entity {
    id : number;
    components? : Array<Component>;
}

export function createEntity() {
    
}

