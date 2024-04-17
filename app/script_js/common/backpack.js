import { player } from "../classes/player.js";
import { backpack, arrayDOM, arrow } from "../variables/variables.js";
import { objItems } from "../variables/list-items.js";
var backpackItems;
function showBackpack() {
    if (!player.thinks) {
        player.thinks = true;
        hideItemInfo();
        backpackItems = '';
        player.playerTasks.backpack.forEach(function (item) {
            backpackItems += "\n      <button id=\"".concat(item, "\" class=\"backpack__item\">\n        <img src=\"").concat(objItems[item].img, "\" alt=\"item-").concat(item.slice(1), "\" title=\"").concat(objItems[item].name, "\">\n      </button>\n    ");
        });
        backpack.firstElementChild.children[2].firstElementChild.innerHTML = backpackItems;
        backpack.classList.add('backpack_active');
        arrayDOM.items.forEach(function (item) {
            item.removeEventListener('click', showItemInfo);
        });
        arrayDOM.items = [];
        //@ts-ignore
        for (var _i = 0, _a = Array.from(backpack.firstElementChild.children[2].firstElementChild.children); _i < _a.length; _i++) {
            var item = _a[_i];
            arrayDOM.items.push(item);
            if (window.screen.width > 992) {
                item.style.width = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 20, "px");
                item.style.height = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 20, "px");
            }
            else if (window.screen.width < 992) {
                item.style.width = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 10, "px");
                item.style.height = "".concat(backpack.firstElementChild.children[2].clientWidth / 5 - 10, "px");
            }
        }
        arrayDOM.items.forEach(function (item) {
            item.addEventListener('click', showItemInfo);
        });
    }
}
function hideBackpack() {
    backpack.classList.remove('backpack_active');
    player.thinks = false;
}
function showItemInfo(event) {
    //@ts-ignore
    if (event.target.localName === 'img') {
        backpack.firstElementChild.children[3].innerHTML = "\n      <img src=\"".concat(//@ts-ignore 
        event.target.src, "\"\n           class=\"\"\n           alt=\"").concat(//@ts-ignore
        event.target.getAttribute('alt'), "\">\n           \n      <div style=\"margin-left: 20px\">\n        <h2 style=\"font-size: 1.5rem; font-weight: 900; height: ").concat(backpack.firstElementChild.clientWidth / 22, "px\">").concat(//@ts-ignore
        objItems[event.target.parentElement.getAttribute('id')].name, "</h2>\n        <div  class=\"scroll-bar\" style=\"position:relative; top: ").concat(backpack.firstElementChild.clientWidth / 22, "px; overflow-y: scroll; height: ").concat(backpack.firstElementChild.clientWidth * 4 / 22, "px\">\n          <p style=\"font-size: 1.2rem\">").concat(//@ts-ignore
        objItems[event.target.parentElement.getAttribute('id')].description, "</p>\n        </div>\n      </div> \n    ");
    }
    else {
        backpack.firstElementChild.children[3].innerHTML = "\n      <img src=\"".concat(//@ts-ignore
        event.target.firstElementChild.src, "\"\n           class=\"\"\n           alt=\"").concat(//@ts-ignore
        event.target.firstElementChild.getAttribute('alt'), "\">\n           \n      <div style=\"margin-left: 20px\">\n        <h2 style=\"font-size: 1.5rem; font-weight: 900; height: ").concat(backpack.firstElementChild.clientWidth / 22, "px\">").concat(//@ts-ignore
        objItems[event.target.getAttribute('id')].name, "</h2>\n        <div  class=\"scroll-bar\" style=\"position:relative; top: ").concat(backpack.firstElementChild.clientWidth / 22, "px; overflow-y: scroll; height: ").concat(backpack.firstElementChild.clientWidth * 4 / 22, "px\">\n          <p style=\"font-size: 1.2rem\">").concat(//@ts-ignore
        objItems[event.target.getAttribute('id')].description, "</p>\n        </div>\n      </div>\n    ");
    }
    arrow.classList.add('backpack__arrow_active');
    backpack.firstElementChild.children[2].classList.add('backpack__items_not_active');
    backpack.firstElementChild.children[3].classList.remove('backpack__item-info_not-active');
}
function hideItemInfo() {
    arrow.classList.remove('backpack__arrow_active');
    backpack.firstElementChild.children[2].classList.remove('backpack__items_not_active');
    backpack.firstElementChild.children[3].classList.add('backpack__item-info_not-active');
}
export { showBackpack, hideBackpack, showItemInfo, hideItemInfo };
