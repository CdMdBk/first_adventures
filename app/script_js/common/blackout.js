import { canvas, ctx, field } from "../variables/variables.js";
import { player } from "../classes/player.js";
var blackout = new Image();
blackout.src = './images/blackout/blackout.png';
var blackoutCenter = new Image();
blackoutCenter.src = './images/blackout/blackout-center.png';
var blackoutFrame = new Image();
blackoutFrame.src = './images/blackout/blackout-frame.png';
var blackoutDamage = new Image();
blackoutDamage.src = './images/blackout/blackout-damage.png';
function renderingBlackout(type) {
    switch (type) {
        case "center":
            ctx.drawImage(blackoutCenter, player.x + player.width / 2 - field.sizeCell * 1.5, player.y + player.height / 2 - field.sizeCell * 1.5, field.sizeCell * 3, field.sizeCell * 3);
            ctx.drawImage(blackout, 0, 0, 400, 400, 0, 0, player.x + player.width / 2 - field.sizeCell * 1.5 + 2, canvas.height);
            ctx.drawImage(blackout, 0, 0, 400, 400, player.x + player.width / 2 - field.sizeCell * 1.5, 0, canvas.width - (player.x + player.width / 2 - field.sizeCell * 1.5), player.y + player.height / 2 - field.sizeCell * 1.5 + 1);
            ctx.drawImage(blackout, 0, 0, 400, 400, player.x + player.width / 2 + field.sizeCell * 1.5 - 1, player.y + player.height / 2 - field.sizeCell * 1.5, canvas.width - (player.x + player.width / 2 + field.sizeCell * 1.5 - 1), canvas.height - (player.y + player.height / 2 - field.sizeCell * 1.5));
            ctx.drawImage(blackout, 0, 0, 400, 400, player.x + player.width / 2 - field.sizeCell * 1.5, player.y + player.height / 2 + field.sizeCell * 1.5 - 1, (player.x + player.width / 2 + field.sizeCell * 1.5) - (player.x + player.width / 2 - field.sizeCell * 1.5) + 10, canvas.height - (player.y + player.height / 2 + field.sizeCell * 1.5) + 10);
            break;
        case "window":
            ctx.drawImage(blackoutFrame, 0, 0, canvas.width, canvas.height);
            break;
        case "damage":
            ctx.drawImage(blackoutDamage, 0, 0, canvas.width, canvas.height);
    }
}
export { renderingBlackout };
