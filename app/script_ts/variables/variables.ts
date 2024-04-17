import {Field, Size, MapObjects, Keys, ArrayDOM, Camera, Level} from "./interfaces.js";

//DOM elements--------------------------------------------------

const buttonStart:HTMLElement = document.querySelector('.button-start');
const blackout:HTMLElement = document.querySelector('#blackout');

const backpackButton:HTMLButtonElement = document.querySelector('#backpack-button');
const backpack:HTMLElement = document.querySelector('#backpack');

const formQuestion:HTMLElement = document.querySelector('#university');

const bonus:HTMLElement = document.querySelector('.bonus');

let arrayDOM:ArrayDOM = {
  items: []
}

const cross:HTMLElement = document.querySelector('#cross');
const arrow:HTMLElement = document.querySelector('#arrow');

//palette--------------------------------------------------

const spacePalette:string[] = [
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

const canvas:HTMLCanvasElement = document.querySelector('#canvas');
const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

const halfCanvas:Size = {};
const previousCanvas:Size = {}

//camera--------------------------------------------------

const camera:Camera = {
  currentPosition: {},
  beginningMap: {},
  edgeOfMap: {}
}

//level-data--------------------------------------------------

const level:Level = {
  currentLevel: 1,
  levelStage: 1,
  spawnRate: 0,
  safeZone: false
}

//playing field--------------------------------------------------

const field:Field = {
  scale: 2
}

const mapObjects:MapObjects = {
  typeMap: 'Introduction',
  star: [],
  npc: {},
  UniversityInFlesh: [],
  CorruptedMadBlick: [],
  soul: []
}

//keys--------------------------------------------------

let keys:Keys = {
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

export {
  spacePalette,
  buttonStart,
  blackout,
  backpackButton,
  formQuestion,
  bonus,
  backpack,
  arrayDOM,
  cross,
  arrow,
  canvas,
  ctx,
  halfCanvas,
  previousCanvas,
  level,
  field,
  mapObjects,
  keys,
  camera
}