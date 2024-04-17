import { player } from "../classes/player.js";
import { bonus } from "../variables/variables.js";
function getCoordinates(event) {
    if ( //@ts-ignore
    !bonus.classList.contains('bonus_active'))
        event.preventDefault();
    player.mouseX = event.clientX;
    player.mouseY = event.clientY;
}
export { getCoordinates };
