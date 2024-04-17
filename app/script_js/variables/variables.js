//DOM elements--------------------------------------------------
var buttonStart = document.querySelector('.button-start');
var blackout = document.querySelector('#blackout');
var backpackButton = document.querySelector('#backpack-button');
var backpack = document.querySelector('#backpack');
var formQuestion = document.querySelector('#university');
var bonus = document.querySelector('.bonus');
var arrayDOM = {
    items: []
};
var cross = document.querySelector('#cross');
var arrow = document.querySelector('#arrow');
//palette--------------------------------------------------
var spacePalette = [
    '#13031A',
    '#430A5D',
    '#401F71',
    '#824D74',
    '#BE7B72',
    '#FDAF7B',
    '#ffc8a2',
    '#fff'
];
//canvas--------------------------------------------------
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var halfCanvas = {};
var previousCanvas = {};
//camera--------------------------------------------------
var camera = {
    currentPosition: {},
    beginningMap: {},
    edgeOfMap: {}
};
//level-data--------------------------------------------------
var level = {
    currentLevel: 1,
    levelStage: 1,
    spawnRate: 0,
    safeZone: false
};
//playing field--------------------------------------------------
var field = {
    scale: 2
};
var mapObjects = {
    typeMap: 'Introduction',
    star: [],
    npc: {},
    UniversityInFlesh: [],
    CorruptedMadBlick: [],
    soul: []
};
//keys--------------------------------------------------
var keys = {
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    f: {
        pressed: false,
        pause: false
    },
    mouseLeft: {
        pressed: false
    }
};
//exports--------------------------------------------------
export { spacePalette, buttonStart, blackout, backpackButton, formQuestion, bonus, backpack, arrayDOM, cross, arrow, canvas, ctx, halfCanvas, previousCanvas, level, field, mapObjects, keys, camera };
