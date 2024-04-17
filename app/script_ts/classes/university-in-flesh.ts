import {camera, canvas, formQuestion, ctx, field, mapObjects, keys} from "../variables/variables.js";
import {player} from "./player.js";
import {ArrayQuestions, UniversityInFleshAudio} from "../variables/interfaces.js";
import {objAudio} from "../variables/list-audio.js";
import {TemplateCell} from "./template.js";
import {arrayQuestions} from "../variables/list-questions.js";

class UniversityInFlesh extends TemplateCell {
  public width:number;
  public height:number;

  public stageOfFight:'key phrases'|'questions'|'verdict'|'transitions'|'victory'|'defeat'|'none' = 'none';
  public previousStageOfFight:'key phrases'|'questions'|'verdict'|'transitions'|'victory'|'defeat'|'none' = 'none';

  public stageOfKeyPhrase:number = 0;
  public stageOfVerdict:number;
  public stageOfTransition:number;

  public phrases:UniversityInFleshAudio = {
    keyPhrases: objAudio.UniversityInFlesh.keyPhrases,
    questions: objAudio.UniversityInFlesh.questions,
    verdict: objAudio.UniversityInFlesh.verdict,
    transitions: objAudio.UniversityInFlesh.transitions,
    another: objAudio.UniversityInFlesh.another
  };

  arrayQuestions:ArrayQuestions = arrayQuestions;
  currentQuestion:number;
  answer:boolean;
  lastTransitions:number = -1;

  public image:HTMLImageElement = new Image();
  public frame:number = 0;
  public numberOfFrames:number = 12;

  public numberOfLives:number = 5;
  public maxLives:number = 5;

  public currentPositionX:number;
  public currentPositionY:number;

  constructor(x:number, y:number, size:number, height:number) {
    super(x, y, size);
    this.width = this.size;
    this.height = height;

    this.image.src = './images/university_in_flesh/university-in-flesh.png';

    this.currentPositionX = camera.currentPosition.x;
    this.currentPositionY = camera.currentPosition.y;
  }

  drawStationaryState():void {
    ctx.drawImage(this.image, this.frame * 600 + 1,0, 599, 799, this.x, this.y, this.width, this.height);
  }

  changePositions():void {
    this.x += this.currentPositionX - camera.currentPosition.x;
    this.y += this.currentPositionY - camera.currentPosition.y;
    this.drawStationaryState();

    if (player.numberOfCompletedFrames % 14 === 0) {
      this.frame++;
    }
    if (this.frame >= this.numberOfFrames) this.frame = 0;

    this.nextAction();
  }

  nextAction():void {
    switch(this.stageOfFight) {
      case 'key phrases':
        this.stageOfFight = 'none';

        setTimeout(():void => {
          this.previousStageOfFight = 'key phrases';

          this.phrases.keyPhrases[this.stageOfKeyPhrase].play();
          this.phrases.keyPhrases[this.stageOfKeyPhrase].addEventListener('ended', this.finalKeyPhrases);
        }, 1000);

        break;

      case 'questions':
        this.stageOfFight = 'none';
        this.previousStageOfFight = 'questions';

        setTimeout(():void => {
          this.selectQuestion()
        }, 1000);
        break;

      case 'verdict':
        this.stageOfFight = 'none';
        this.previousStageOfFight = 'verdict';

        if (this.answer) {
          this.numberOfLives--;

          this.stageOfVerdict = Math.floor(Math.random() * this.phrases.verdict.yes.length);
          this.phrases.verdict.yes[this.stageOfVerdict].play();
          this.phrases.verdict.yes[this.stageOfVerdict].addEventListener('ended', ():void => {
            this.afterVerdict();
          }, {once: true});

        } else {
          this.stageOfVerdict = Math.floor(Math.random() * this.phrases.verdict.no.length);
          this.phrases.verdict.no[this.stageOfVerdict].play();
          this.phrases.verdict.no[this.stageOfVerdict].addEventListener('ended', ():void => {
            this.afterVerdict();
          }, {once: true});
        }
        break;

      case 'transitions':
        this.stageOfFight = 'none';

        setTimeout(():void => {
          this.previousStageOfFight = 'transitions';

          this.stageOfTransition = Math.floor(Math.random() * this.phrases.transitions.length);

          while (this.stageOfTransition === this.lastTransitions) {
            this.stageOfTransition = Math.floor(Math.random() * this.phrases.transitions.length);
          }
          this.lastTransitions = this.stageOfTransition;

          this.phrases.transitions[this.stageOfTransition].play();
          this.phrases.transitions[this.stageOfTransition].addEventListener('ended', this.finalTransition);
        }, 1000);
        break;
    }
  }

  finalTransition():void {
    this.stageOfFight = 'questions';
  }

  finalKeyPhrases():void {
    switch(mapObjects.UniversityInFlesh[0].stageOfKeyPhrase) {
      case 0:
        mapObjects.UniversityInFlesh[0].stageOfFight = 'questions';
        break;

      case 1:
        mapObjects.UniversityInFlesh[0].stageOfFight = 'victory';
        player.bossFightStage = false;
        break;

      case 2:
        mapObjects.UniversityInFlesh[0].stageOfFight = 'defeat';
        player.bossFightStage = false;
        player.numberOfDeaths++;
        break;
    }
  }

  selectQuestion():void {
    this.currentQuestion = Math.floor(Math.random() * this.phrases.questions.length);

    this.phrases.questions[this.currentQuestion].play();
    this.phrases.questions[this.currentQuestion].addEventListener('ended', ():void => {
      formQuestion.children[0].children[0].innerHTML = this.arrayQuestions[this.currentQuestion].question;
      formQuestion.classList.add('university-form_active');
    });
  }

  checkAnswer(answer:string):void {
    formQuestion.classList.remove('university-form_active');

    (answer.replace(/\s/g, '')
      .toLowerCase()
      .match(this.arrayQuestions[this.currentQuestion].answer) !== null) ? this.answer = true : this.answer = false;

    this.stageOfFight = 'verdict';
    this.phrases.questions.splice(this.currentQuestion, 1);
    this.arrayQuestions.splice(this.currentQuestion, 1);
  }

  afterVerdict():void {
    if (this.numberOfLives === 0) {
      this.stageOfKeyPhrase = 1;
      this.stageOfFight = 'key phrases';

    } else if (
      (this.numberOfLives > 0 && this.arrayQuestions.length === 0) ||
      (this.numberOfLives > this.arrayQuestions.length)
    ) {
      this.stageOfKeyPhrase = 2;
      this.stageOfFight = 'key phrases';

    } else {
      this.stageOfFight = 'transitions';
    }
  }

  showSkipText():void {
    ctx.fillStyle = 'white';
    ctx.font = `900 ${field.sizeCell / 13}px Pixel Art`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('Жмякни "а", чтобы пропустить', canvas.width / 2, canvas.height - field.sizeCell * .2);

    if (keys.f.pressed) {
      if (this.previousStageOfFight === 'transitions') {
        this.phrases.transitions[this.stageOfTransition].currentTime = 0;
        this.phrases.transitions[this.stageOfTransition].pause();
        this.phrases.transitions[this.stageOfTransition].removeEventListener('ended', this.finalTransition);

      } else if (this.previousStageOfFight === 'key phrases') {
        this.phrases.keyPhrases[this.stageOfKeyPhrase].currentTime = 0;
        this.phrases.keyPhrases[this.stageOfKeyPhrase].pause();
        this.phrases.keyPhrases[this.stageOfKeyPhrase].removeEventListener('ended', this.finalKeyPhrases);
      }
      this.stageOfFight = 'questions';
      keys.f.pressed = false;
    }
  }
}

export {
  UniversityInFlesh
}