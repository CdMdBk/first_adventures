import {Player, player} from "../classes/player.js";
import {backpack, arrayDOM, arrow} from "../variables/variables.js";
import {objItems} from "../variables/list-items.js";

let backpackItems:string;

function showBackpack():void {
  if (!player.thinks) {
    player.thinks = true;
    hideItemInfo();

    backpackItems = '';
    player.playerTasks.backpack.forEach((item:string):void => {
      backpackItems += `
      <button id="${item}" class="backpack__item">
        <img src="${objItems[item].img}" alt="item-${item.slice(1)}" title="${objItems[item].name}">
      </button>
    `;
    });

    backpack.firstElementChild.children[2].firstElementChild.innerHTML = backpackItems;
    backpack.classList.add('backpack_active');

    arrayDOM.items.forEach((item:HTMLElement):void => {
      item.removeEventListener('click', showItemInfo);
    });
    arrayDOM.items = [];
    //@ts-ignore
    for (let item of Array.from(backpack.firstElementChild.children[2].firstElementChild.children)) {
      arrayDOM.items.push(item);

      if (window.screen.width > 992) {
        item.style.width = `${backpack.firstElementChild.children[2].clientWidth / 5 - 20}px`;
        item.style.height = `${backpack.firstElementChild.children[2].clientWidth / 5 - 20}px`;
      } else if (window.screen.width < 992) {
        item.style.width = `${backpack.firstElementChild.children[2].clientWidth / 5 - 10}px`;
        item.style.height = `${backpack.firstElementChild.children[2].clientWidth / 5 - 10}px`;
      }
    }

    arrayDOM.items.forEach((item:HTMLElement):void => {
      item.addEventListener('click', showItemInfo);
    });
  }
}

function hideBackpack():void {
  backpack.classList.remove('backpack_active');
  player.thinks = false;
}

function showItemInfo(event:MouseEvent):void {
  //@ts-ignore
  if (event.target.localName === 'img') {
    backpack.firstElementChild.children[3].innerHTML = `
      <img src="${//@ts-ignore 
           event.target.src}"
           class=""
           alt="${//@ts-ignore
           event.target.getAttribute('alt')}">
           
      <div style="margin-left: 20px">
        <h2 style="font-size: 1.5rem; font-weight: 900; height: ${backpack.firstElementChild.clientWidth / 22}px">${//@ts-ignore
      objItems[event.target.parentElement.getAttribute('id')].name}</h2>
        <div  class="scroll-bar" style="position:relative; top: ${backpack.firstElementChild.clientWidth / 22}px; overflow-y: scroll; height: ${backpack.firstElementChild.clientWidth * 4/22}px">
          <p style="font-size: 1.2rem">${//@ts-ignore
      objItems[event.target.parentElement.getAttribute('id')].description}</p>
        </div>
      </div> 
    `;
  } else {
    backpack.firstElementChild.children[3].innerHTML = `
      <img src="${//@ts-ignore
           event.target.firstElementChild.src}"
           class=""
           alt="${//@ts-ignore
           event.target.firstElementChild.getAttribute('alt')}">
           
      <div style="margin-left: 20px">
        <h2 style="font-size: 1.5rem; font-weight: 900; height: ${backpack.firstElementChild.clientWidth / 22}px">${//@ts-ignore
      objItems[event.target.getAttribute('id')].name}</h2>
        <div  class="scroll-bar" style="position:relative; top: ${backpack.firstElementChild.clientWidth / 22}px; overflow-y: scroll; height: ${backpack.firstElementChild.clientWidth * 4/22}px">
          <p style="font-size: 1.2rem">${//@ts-ignore
      objItems[event.target.getAttribute('id')].description}</p>
        </div>
      </div>
    `;
  }

  arrow.classList.add('backpack__arrow_active');
  backpack.firstElementChild.children[2].classList.add('backpack__items_not_active');
  backpack.firstElementChild.children[3].classList.remove('backpack__item-info_not-active');
}

function hideItemInfo():void {
  arrow.classList.remove('backpack__arrow_active');
  backpack.firstElementChild.children[2].classList.remove('backpack__items_not_active');
  backpack.firstElementChild.children[3].classList.add('backpack__item-info_not-active');
}

export {
  showBackpack,
  hideBackpack,
  showItemInfo,
  hideItemInfo
}