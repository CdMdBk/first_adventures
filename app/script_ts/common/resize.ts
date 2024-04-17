import {backpack, backpackButton, cross, arrow, canvas, field, halfCanvas, arrayDOM} from "../variables/variables.js";

export function resizeCanvas():void {
  canvas.width = document.body.offsetWidth * field.scale;
  canvas.height = document.body.offsetHeight * field.scale;

  field.sizeCell = canvas.height/4;
  field.speed = canvas.height / 40 / 6; //for production with зарядка
  // field.speed = canvas.height / 40 / 2; //for development

  halfCanvas.w = canvas.width/2;
  halfCanvas.h = canvas.height/2;

  //DOM Elements--------------------------------------------------

  backpackButton.style.width = `${field.sizeCell / 4}px`;
  backpackButton.style.height = `${field.sizeCell / 4}px`;
  backpackButton.parentElement.style.left = `${field.sizeCell / 8}px`;
  backpackButton.parentElement.style.top = `${field.sizeCell / 8}px`;

  //@ts-ignore
  backpack.firstElementChild.style.width = `${canvas.width / 4}px`;
  //@ts-ignore
  backpack.firstElementChild.style.height = `${canvas.height / 2 * 3/4}px`;

  //@ts-ignore
  backpack.firstElementChild.children[2].style.top = `${backpack.firstElementChild.clientHeight * 5/17}px`;
  //@ts-ignore
  backpack.firstElementChild.children[2].style.left = `${backpack.firstElementChild.clientWidth * 3/22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[2].style.width = `${backpack.firstElementChild.clientWidth * 16/22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[2].style.height = `${backpack.firstElementChild.clientWidth * 6/22}px`;

  //@ts-ignore
  backpack.firstElementChild.children[3].style.top = `${backpack.firstElementChild.clientHeight * 5/17}px`;
  //@ts-ignore
  backpack.firstElementChild.children[3].style.left = `${backpack.firstElementChild.clientWidth * 3/22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[3].style.width = `${backpack.firstElementChild.clientWidth * 16/22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[3].style.height = `${backpack.firstElementChild.clientWidth * 6/22}px`;

  //@ts-ignore
  backpack.firstElementChild.children[3].children[1].children[0].style.height = `${backpack.firstElementChild.clientWidth / 22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[3].children[1].children[1].style.height = `${backpack.firstElementChild.clientWidth * 4/22}px`;
  //@ts-ignore
  backpack.firstElementChild.children[3].children[1].children[1].style.top = `${backpack.firstElementChild.clientWidth / 22}px`;

  //@ts-ignore

  arrayDOM.items.forEach((item:HTMLElement):void => {
    if (window.screen.width > 992) {
      item.style.width = `${backpack.firstElementChild.children[2].clientWidth / 5 - 20}px`;
      item.style.height = `${backpack.firstElementChild.children[2].clientWidth / 5 - 20}px`;
    } else if (window.screen.width < 992) {
      item.style.width = `${backpack.firstElementChild.children[2].clientWidth / 5 - 10}px`;
      item.style.height = `${backpack.firstElementChild.children[2].clientWidth / 5 - 10}px`;
    }
  });

  cross.style.top = `${backpack.firstElementChild.clientHeight * 2/17}px`;
  arrow.style.top = `${backpack.firstElementChild.clientHeight * 2/17}px`;

  cross.style.width = `${backpack.firstElementChild.clientHeight * 1.5/17}px`;
  arrow.style.width = `${backpack.firstElementChild.clientHeight * 1.5/17}px`;
  cross.style.height = `${backpack.firstElementChild.clientHeight * 1.5/17}px`;
  arrow.style.height = `${backpack.firstElementChild.clientHeight * 1.5/17}px`;
}