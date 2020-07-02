import { Component } from "./components";
/**
 * Fichiers reçensant les Components coté client pour les components complexes
 * Seul la structure doit être déclarer ici
 * @packageDocumentation
 * @module Components.Client
 */


/**
 * Détermine si l'entité réagit avec le monde (collision, etc...)
 */
export class C_RigidBody extends Component {
    weight : number;
    BodyID : number;

}