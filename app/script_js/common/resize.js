import { backpack, backpackButton, cross, arrow, canvas, field, halfCanvas, arrayDOM } from "../variables/variables.js";
export function resizeCanvas() {
    canvas.width = document.body.offsetWidth * field.scale;
    canvas.height = document.body.offsetHeight * field.scale;
    field.sizeCell = canvas.height / 4;
    field.speed = canvas.height / 40 / 6; //for production with зарядка
    // field.speed = canvas.height / 40 / 2; //for development
    halfCanvas.w = canvas.width / 2;
    halfCanvas.h = canvas.height / 2;
    //DOM Elements--------------------------------------------------
    backpackButton.style.width = "".concat(field.sizeCell / 4, "px");
    backpackButton.style.height = "".concat(field.sizeCell / 4, "px");
    backpackButton.parentElement.style.left = "".concat(field.sizeCell / 8, "px");
    backpackButton.parentElement.style.top = "".concat(field.sizeCell / 8, "px");
    //@ts-ignore
    backpack.firstElementChild.style.width = "".concat(canvas.width / 4, "px");
    //@ts-ignore
    backpack.firstElementChild.style.height = "".concat(canvas.height / 2 * 3 / 4, "px");
    //@ts-ignore
    backpack.firstElementChild.children[2].style.top = "".concat(backpack.firstElementChild.clientHeight * 5 / 17, "px");
    //@ts-ignore
    backpack.firstElementChild.children[2].style.left = "".concat(backpack.firstElementChild.clientWidth * 3 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[2].style.width = "".concat(backpack.firstElementChild.clientWidth * 16 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[2].style.height = "".concat(backpack.firstElementChild.clientWidth * 6 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].style.top = "".concat(backpack.firstElementChild.clientHeight * 5 / 17, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].style.left = "".concat(backpack.firstElementChild.clientWidth * 3 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].style.width = "".concat(backpack.firstElementChild.clientWidth * 16 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].style.height = "".concat(backpack.firstElementChild.clientWidth * 6 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].children[1].children[0].style.height = "".concat(backpack.firstElementChild.clientWidth / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].children[1].children[1].style.height = "".concat(backpack.firstElementChild.clientWidth * 4 / 22, "px");
    //@ts-ignore
    backpack.firstElementChild.children[3].children[1].children[1].style.top = "".concat(backpack.firstElementChild.clientWidth / 22, "px");
    //@ts-ignore
    arrayDOM.items.forEach(function (item) {
        if (window.screen.width > 992) {
            item.style.width = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 20, "px");
            item.style.height = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 20, "px");
        }
        else if (window.screen.width < 992) {
            item.style.width = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 10, "px");
            item.style.height = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 10, "px");
        }
    });
    cross.style.top = "".concat(backpack.firstElementChild.clientHeight * 2 / 17, "px");
    arrow.style.top = "".concat(backpack.firstElementChild.clientHeight * 2 / 17, "px");
    cross.style.width = "".concat(backpack.firstElementChild.clientHeight * 1.5 / 17, "px");
    arrow.style.width = "".concat(backpack.firstElementChild.clientHeight * 1.5 / 17, "px");
    cross.style.height = "".concat(backpack.firstElementChild.clientHeight * 1.5 / 17, "px");
    arrow.style.height = "".concat(backpack.firstElementChild.clientHeight * 1.5 / 17, "px");
}
