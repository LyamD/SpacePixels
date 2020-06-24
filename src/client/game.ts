export function run(socket: any) {
    playerInputs(socket);
}

function playerInputs(socket : any) {

    let keyArrowUp = false;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e:any) {
        if (e.key == 'ArrowUp' && !keyArrowUp) {
            keyArrowUp = true;
            socket.emit('keyDown', 'up');
        }
    }

    function keyUpHandler(e:any) {
        if (e.key == 'ArrowUp') {
            keyArrowUp = false;
            socket.emit('keyUp', 'up');
        }
    }


}
