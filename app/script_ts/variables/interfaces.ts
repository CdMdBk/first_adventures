import {Decor, Floor} from "../classes/floor.js";
import {Tree, Water, Wall, CubicZirconia} from "../classes/obstacles.js";
import {ChangeStageOfLevel, Edge, EndLevel} from "../classes/control-points.js";
import {Interlocutor, Lera, Wounded} from "../classes/npc.js";
import {Star} from "../classes/stars.js";
import {Item} from "../classes/items.js";
import {Tablet} from "../classes/tablets.js";
import {Fence} from "../classes/fence.js";
import {PlayerSimulator, Shell} from "../classes/player.js";
import {Bullet, Target} from "../classes/bullets.js";
import {CorruptedMadBlick, Demon, ShellBlick} from "../classes/demons.js";
import {ParticleDemon, ParticleBlick, ParticlePlayer, ParticleDeadBlick} from "../classes/particles.js";
import {Soul} from "../classes/soul.js";
import {UniversityInFlesh} from "../classes/university-in-flesh.js";
import {People} from "../classes/people.js";

interface Keys {
  a: {
    pressed:boolean
  },
  s: {
    pressed:boolean
  },
  d: {
    pressed:boolean
  },
  w: {
    pressed:boolean
  },
  f: {
    pressed:boolean,
    pause:boolean
  },
  mouseLeft: {
    pressed:boolean
  }
}

interface Size {
  w?:number,
  h?:number
}

interface Positions {
  x?:number,
  y?:number,
  startX?:number,
  startY?:number,
}

interface Camera {
  currentPosition:Positions,
  beginningMap:Positions,
  edgeOfMap:Positions
}

interface Field {
  scale:number,
  sizeCell?:number,
  speed?:number
}

interface Map {
  'Tsaritsyno Park':string[][],
  'Night Parish':string[][],
  'Basements Of War':string[][],
  'Battlefield':string[][],
  'Lawn Of Lera':string[][],
  'Inner World':string[][]
}

interface MapObjects {
  typeMap:'Introduction'|'Tsaritsyno Park'|'Night Parish'|'Basements Of War'|'Battlefield'|'Lawn Of Lera'|'Inner World',

  edge?:Edge[],
  endLevel?:EndLevel,
  target?:Target[],
  stage?:ChangeStageOfLevel[],

  water?:Water[],
  tree?:Tree[],
  wall?:Wall[],
  fence?:Fence[],
  cubicZirconia?:CubicZirconia[],

  floor?:Floor[],
  decor?:Decor[],

  tablet?:Tablet[],
  item?:Item[],

  star?:Star[],

  npc: {
    interlocutor?:Interlocutor[],
    wounded?:Wounded[]
    lera?:Lera[]
  },
  people?:People[],

  playerSimulator?:PlayerSimulator[],

  bullet?:Bullet[],
  shell?:Shell[],
  demon?:Demon[],

  particlePlayer?:ParticlePlayer[],
  particleDemon?:ParticleDemon[],
  particleBlick?:ParticleBlick[],
  particleDeadBlick?:ParticleDeadBlick[],

  UniversityInFlesh?:UniversityInFlesh[],

  CorruptedMadBlick?:CorruptedMadBlick[],
  shellBlick?:ShellBlick[],

  soul?:Soul[]
}

interface StageOfConversation {
  Borya:number,
  Danya:number,
  Mark:number,
  Alina:number,
  Kolya:number,
  Vlad:number,
  Drunk:number,
  Wounded:number,
  Lera:number
}

interface PlayerTasks {
  completedDialogues: {
    Borya:boolean,
    Danya:boolean,
    Mark:boolean,
    Alina:boolean,
    Kolya:boolean,
    Vlad:boolean,
    Drunk:boolean,
    Wounded:boolean,
    Lera:boolean,
    soulKolya:boolean
  },
  backpack:string[],
  //@ts-ignore
  memories:Set<HTMLAudioElement[]>
}

interface ObjItems {
  [key:string]: {
    name:string,
    img:string,
    description:string
  }
}

interface ObjAudio {
  NPC: {
    [key:string]:HTMLAudioElement[]
  },
  outrage:HTMLAudioElement[],
  effects: HTMLAudioElement[],
  player: HTMLAudioElement[],
  soundsOfLocations: HTMLAudioElement[],
  UniversityInFlesh: UniversityInFleshAudio
}

interface UniversityInFleshAudio {
  keyPhrases:HTMLAudioElement[],
  questions:HTMLAudioElement[],
  verdict: {
    yes:HTMLAudioElement[],
    no:HTMLAudioElement[]
  },
  transitions:HTMLAudioElement[],
  another:HTMLAudioElement[]
}

type ArrayQuestions = {
  question:string,
  answer:RegExp
}[];


interface ArrayDOM {
  items:HTMLElement[]
}

interface Level {
  currentLevel:number,
  levelStage:number,
  spawnRate:number,
  safeZone:boolean
}

interface NumberOfEnemiesKilled {
  demon:number,
  CorruptedMadBlick:number
}

export {
  Keys,
  Size,
  Positions,
  Camera,
  Field,
  Map,
  MapObjects,
  StageOfConversation,
  PlayerTasks,
  ObjItems,
  ObjAudio,
  UniversityInFleshAudio,
  ArrayQuestions,
  ArrayDOM,
  Level,
  NumberOfEnemiesKilled
}