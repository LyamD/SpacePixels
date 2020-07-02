/**
 * Fichier contenant les Components basique utile au serveur & client
 * @packageDocumentation
 */

 /**
  * Classe Abstraite template de base pour les components
  * @property {string} name le nom du component générée à l'instanciation
  */
export abstract class Component {
    /**Nom du component (égale au nom de la classe, générer automatiquement) */
    name : string;

    constructor() {
        this.name = this.constructor.name;
    }
}

/**
 * La classe déterminant qu'un entité est controlé par un joueur
 * S'occupe aussi des inputs
 * @property {string} socketID l'id du socket associé à ce joueur / component
 */
export class C_Player extends Component {
    socketID : string;
    inputs : {
        MoveUp : boolean,
        MoveDown : boolean,
        MoveGauche : boolean,
        MoveDroite : boolean
    };

    constructor(p_id : string = '') {
        super();
        this.socketID = p_id;
        this.inputs = {
            MoveUp: false,
            MoveDown : false,
            MoveGauche: false,
            MoveDroite: false
        }
    }
}

/**
 * Component déterminant qu'une entité est présente dans le mode
 * @property {number} x la position de l'entité sur l'axe X
 * @property {number} y la position de l'entité sur l'axe Y
 * @property {number} rotation la rotation de l'entité en Radians
 */
export class C_Transform extends Component {
    /**la position de l'entité sur l'axe X */
    x: number;
    /**la position de l'entité sur l'axe Y */
    y: number;
    /**la rotation de l'entité en Radians */
    rotation: number;

    /**
     * Component déterminant qu'une entité est présente dans le mode
     * @param {number} x la position de l'entité sur l'axe X
     * @param {number} y la position de l'entité sur l'axe Y
     * @param {number} rotation la rotation de l'entité en Radians
     */
    constructor(p_x: number = 0, p_y: number = 0, p_rot: number = 0) {
        super();
        this.x = p_x;
        this.y = p_y;
        this.rotation = p_rot;
    }
}

/**
 * Component déterminant si une entité doit être rendu coté client
 * @property {string} style nom de l'apparence que doit avoir l'entité
 */
export class C_Renderer extends Component {
    /**Apparence que doit avoir l'entité */
    style: string;

    /**
     * Component déterminant si une entité doit être rendu coté client
     * @param {string} style nom de l'apparence que doit avoir l'entité
     */
    constructor(p_style : string = '') {
        super();
        this.style = p_style;
    }
}

/**
 * Component déterminant si dispose d'un générateur
 * @property {number} power la puissance totale du générateur
 */
export class C_Engine extends Component {
    /** La puissance maximum du générateur */
    power: number;

    /**
     * Component déterminant si dispose d'un générateur
     * @param {number} power la puissance totale du générateur
     */
    constructor(p_power : number = 0) {
        super();
        this.power = p_power;
    }
}
