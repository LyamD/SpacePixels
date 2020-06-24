const { Engine } = require("matter-js");

export function main(engine : any) {

    setInterval(function() {
        Engine.update(engine, 1000/60);
    }, 1000/60);
};