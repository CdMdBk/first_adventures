import {ObjAudio} from "./interfaces.js";

const objAudio:ObjAudio = {
  NPC: {
    'Borya': [
      new Audio('./audio/NPC/Borya/1.ogg'),
      new Audio('./audio/NPC/Borya/2.ogg'),
      new Audio('./audio/NPC/Borya/3.ogg'),
      new Audio('./audio/NPC/Borya/4.ogg'),
      new Audio('./audio/NPC/Borya/5.ogg')
    ],
    'Mark': [
      new Audio('./audio/NPC/Mark/1.ogg'),
      new Audio('./audio/NPC/Mark/2.ogg')
    ],
    'Danya': [
      new Audio('./audio/NPC/Danya/1.ogg'),
      new Audio('./audio/NPC/Danya/2.ogg'),
      new Audio('./audio/NPC/Danya/3.ogg')
    ],
    'Alina': [
      new Audio('./audio/NPC/Alina/1.ogg'),
      new Audio('./audio/NPC/Alina/2.ogg'),
      new Audio('./audio/NPC/Alina/3.ogg'),
      new Audio('./audio/NPC/Alina/4.ogg'),
      new Audio('./audio/NPC/Alina/5.ogg')
    ],
    'Kolya': [
      new Audio('./audio/NPC/Kolya/1.ogg'),
      new Audio('./audio/NPC/Kolya/2.ogg'),
      new Audio('./audio/NPC/Kolya/3.ogg'),
      new Audio('./audio/NPC/Kolya/4.ogg')
    ],
    'Vlad': [
      new Audio('./audio/NPC/Vlad/1.ogg'),
      new Audio('./audio/NPC/Vlad/2.ogg'),
      new Audio('./audio/NPC/Vlad/3.ogg'),
      new Audio('./audio/NPC/Vlad/4.ogg')
    ],
    'Drunk': [
      new Audio('./audio/NPC/Drunk/1.ogg'),
      new Audio('./audio/NPC/Drunk/2.ogg'),
      new Audio('./audio/NPC/Drunk/3.ogg'),
      new Audio('./audio/NPC/Drunk/4.ogg'),
      new Audio('./audio/NPC/Drunk/5.ogg')
    ],
    'Wounded': [
      new Audio('./audio/NPC/Wounded/1.ogg'),
      new Audio('./audio/NPC/Wounded/2.ogg')
    ],
    'Lera': []
  },
  outrage: [
    new Audio('./audio/effects/outrage-1.ogg'),
    new Audio('./audio/effects/outrage-2.ogg'),
    new Audio('./audio/effects/outrage-3.ogg')
  ],
  effects: [
    new Audio('./audio/effects/fall.mp3'),
    new Audio('./audio/effects/death.mp3'),
    new Audio('./audio/effects/appeared.mp3'),
    new Audio('./audio/effects/bullet.mp3')
  ],
  player: [
    new Audio('./audio/effects/walking-lawn.mp3'),
    new Audio('./audio/effects/walking-stone.mp3'),
    new Audio('./audio/effects/flight.mp3'),
    new Audio('./audio/effects/pick-up.mp3'),
    new Audio('./audio/effects/read-tablet.mp3'),
    new Audio('./audio/effects/la-la-la.ogg'),
    new Audio('./audio/effects/la.ogg'),
    new Audio('./audio/effects/start-shell.mp3'),
    new Audio('./audio/effects/end-shell.mp3'),
    new Audio('./audio/effects/beat.mp3')
  ],
  soundsOfLocations: [
    new Audio('./audio/sounds_of_locations/tsaritsyno-park.mp3'),
    new Audio('./audio/sounds_of_locations/night-parish.mp3'),
    new Audio('./audio/sounds_of_locations/basements-of-war.mp3'),
    new Audio('./audio/sounds_of_locations/battlefield.mp3'),
    new Audio('./audio/sounds_of_locations/lawn-of-lera.mp3'),
    new Audio('./audio/sounds_of_locations/space.mp3'),
    new Audio('./audio/sounds_of_locations/final-fight.mp3')
  ],
  UniversityInFlesh: {
    keyPhrases: [
      new Audio('./audio/university_in_flesh/key_phrases/start.ogg'),
      new Audio('./audio/university_in_flesh/key_phrases/victory.ogg'),
      new Audio('./audio/university_in_flesh/key_phrases/defeat.ogg')
    ],
    questions: [
      new Audio('./audio/university_in_flesh/questions/1.ogg'),
      new Audio('./audio/university_in_flesh/questions/2.ogg'),
      new Audio('./audio/university_in_flesh/questions/3.ogg'),
      new Audio('./audio/university_in_flesh/questions/4.ogg'),
      new Audio('./audio/university_in_flesh/questions/5.ogg'),
      new Audio('./audio/university_in_flesh/questions/6.ogg'),
      new Audio('./audio/university_in_flesh/questions/7.ogg'),
      new Audio('./audio/university_in_flesh/questions/8.ogg'),
      new Audio('./audio/university_in_flesh/questions/9.ogg'),
      new Audio('./audio/university_in_flesh/questions/10.ogg'),
      new Audio('./audio/university_in_flesh/questions/11.ogg'),
      new Audio('./audio/university_in_flesh/questions/12.ogg'),
      new Audio('./audio/university_in_flesh/questions/13.ogg'),
      new Audio('./audio/university_in_flesh/questions/14.ogg'),
      new Audio('./audio/university_in_flesh/questions/15.ogg')
    ],
    verdict: {
      yes: [
        new Audio('./audio/university_in_flesh/verdict/yes/1.ogg'),
        new Audio('./audio/university_in_flesh/verdict/yes/2.ogg'),
        new Audio('./audio/university_in_flesh/verdict/yes/3.ogg'),
        new Audio('./audio/university_in_flesh/verdict/yes/4.ogg'),
        new Audio('./audio/university_in_flesh/verdict/yes/5.ogg')
      ],
      no: [
        new Audio('./audio/university_in_flesh/verdict/no/1.ogg'),
        new Audio('./audio/university_in_flesh/verdict/no/2.ogg'),
        new Audio('./audio/university_in_flesh/verdict/no/3.ogg'),
        new Audio('./audio/university_in_flesh/verdict/no/4.ogg'),
        new Audio('./audio/university_in_flesh/verdict/no/5.ogg')
      ]
    },
    transitions: [
      new Audio('./audio/university_in_flesh/transitions/1.ogg'),
      new Audio('./audio/university_in_flesh/transitions/2.ogg'),
      new Audio('./audio/university_in_flesh/transitions/3.ogg'),
      new Audio('./audio/university_in_flesh/transitions/4.ogg')
    ],
    another: [
      new Audio('./audio/university_in_flesh/another/pop.ogg')
    ]
  }
}

export {
  objAudio
}