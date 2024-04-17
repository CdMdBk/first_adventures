var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { camera, canvas, formQuestion, ctx, field, mapObjects, keys } from "../variables/variables.js";
import { player } from "./player.js";
import { objAudio } from "../variables/list-audio.js";
import { TemplateCell } from "./template.js";
import { arrayQuestions } from "../variables/list-questions.js";
var UniversityInFlesh = /** @class */ (function (_super) {
    __extends(UniversityInFlesh, _super);
    function UniversityInFlesh(x, y, size, height) {
        var _this = _super.call(this, x, y, size) || this;
        _this.stageOfFight = 'none';
        _this.previousStageOfFight = 'none';
        _this.stageOfKeyPhrase = 0;
        _this.phrases = {
            keyPhrases: objAudio.UniversityInFlesh.keyPhrases,
            questions: objAudio.UniversityInFlesh.questions,
            verdict: objAudio.UniversityInFlesh.verdict,
            transitions: objAudio.UniversityInFlesh.transitions,
            another: objAudio.UniversityInFlesh.another
        };
        _this.arrayQuestions = arrayQuestions;
        _this.lastTransitions = -1;
        _this.image = new Image();
        _this.frame = 0;
        _this.numberOfFrames = 12;
        _this.numberOfLives = 5;
        _this.maxLives = 5;
        _this.width = _this.size;
        _this.height = height;
        _this.image.src = './images/university_in_flesh/university-in-flesh.png';
        _this.currentPositionX = camera.currentPosition.x;
        _this.currentPositionY = camera.currentPosition.y;
        return _this;
    }
    UniversityInFlesh.prototype.drawStationaryState = function () {
        ctx.drawImage(this.image, this.frame * 600 + 1, 0, 599, 799, this.x, this.y, this.width, this.height);
    };
    UniversityInFlesh.prototype.changePositions = function () {
        this.x += this.currentPositionX - camera.currentPosition.x;
        this.y += this.currentPositionY - camera.currentPosition.y;
        this.drawStationaryState();
        if (player.numberOfCompletedFrames % 14 === 0) {
            this.frame++;
        }
        if (this.frame >= this.numberOfFrames)
            this.frame = 0;
        this.nextAction();
    };
    UniversityInFlesh.prototype.nextAction = function () {
        var _this = this;
        switch (this.stageOfFight) {
            case 'key phrases':
                this.stageOfFight = 'none';
                setTimeout(function () {
                    _this.previousStageOfFight = 'key phrases';
                    _this.phrases.keyPhrases[_this.stageOfKeyPhrase].play();
                    _this.phrases.keyPhrases[_this.stageOfKeyPhrase].addEventListener('ended', _this.finalKeyPhrases);
                }, 1000);
                break;
            case 'questions':
                this.stageOfFight = 'none';
                this.previousStageOfFight = 'questions';
                setTimeout(function () {
                    _this.selectQuestion();
                }, 1000);
                break;
            case 'verdict':
                this.stageOfFight = 'none';
                this.previousStageOfFight = 'verdict';
                if (this.answer) {
                    this.numberOfLives--;
                    this.stageOfVerdict = Math.floor(Math.random() * this.phrases.verdict.yes.length);
                    this.phrases.verdict.yes[this.stageOfVerdict].play();
                    this.phrases.verdict.yes[this.stageOfVerdict].addEventListener('ended', function () {
                        _this.afterVerdict();
                    }, { once: true });
                }
                else {
                    this.stageOfVerdict = Math.floor(Math.random() * this.phrases.verdict.no.length);
                    this.phrases.verdict.no[this.stageOfVerdict].play();
                    this.phrases.verdict.no[this.stageOfVerdict].addEventListener('ended', function () {
                        _this.afterVerdict();
                    }, { once: true });
                }
                break;
            case 'transitions':
                this.stageOfFight = 'none';
                setTimeout(function () {
                    _this.previousStageOfFight = 'transitions';
                    _this.stageOfTransition = Math.floor(Math.random() * _this.phrases.transitions.length);
                    while (_this.stageOfTransition === _this.lastTransitions) {
                        _this.stageOfTransition = Math.floor(Math.random() * _this.phrases.transitions.length);
                    }
                    _this.lastTransitions = _this.stageOfTransition;
                    _this.phrases.transitions[_this.stageOfTransition].play();
                    _this.phrases.transitions[_this.stageOfTransition].addEventListener('ended', _this.finalTransition);
                }, 1000);
                break;
        }
    };
    UniversityInFlesh.prototype.finalTransition = function () {
        this.stageOfFight = 'questions';
    };
    UniversityInFlesh.prototype.finalKeyPhrases = function () {
        switch (mapObjects.UniversityInFlesh[0].stageOfKeyPhrase) {
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
    };
    UniversityInFlesh.prototype.selectQuestion = function () {
        var _this = this;
        this.currentQuestion = Math.floor(Math.random() * this.phrases.questions.length);
        this.phrases.questions[this.currentQuestion].play();
        this.phrases.questions[this.currentQuestion].addEventListener('ended', function () {
            formQuestion.children[0].children[0].innerHTML = _this.arrayQuestions[_this.currentQuestion].question;
            formQuestion.classList.add('university-form_active');
        });
    };
    UniversityInFlesh.prototype.checkAnswer = function (answer) {
        formQuestion.classList.remove('university-form_active');
        (answer.replace(/\s/g, '')
            .toLowerCase()
            .match(this.arrayQuestions[this.currentQuestion].answer) !== null) ? this.answer = true : this.answer = false;
        this.stageOfFight = 'verdict';
        this.phrases.questions.splice(this.currentQuestion, 1);
        this.arrayQuestions.splice(this.currentQuestion, 1);
    };
    UniversityInFlesh.prototype.afterVerdict = function () {
        if (this.numberOfLives === 0) {
            this.stageOfKeyPhrase = 1;
            this.stageOfFight = 'key phrases';
        }
        else if ((this.numberOfLives > 0 && this.arrayQuestions.length === 0) ||
            (this.numberOfLives > this.arrayQuestions.length)) {
            this.stageOfKeyPhrase = 2;
            this.stageOfFight = 'key phrases';
        }
        else {
            this.stageOfFight = 'transitions';
        }
    };
    UniversityInFlesh.prototype.showSkipText = function () {
        ctx.fillStyle = 'white';
        ctx.font = "900 ".concat(field.sizeCell / 13, "px Pixel Art");
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText('Жмякни "а", чтобы пропустить', canvas.width / 2, canvas.height - field.sizeCell * .2);
        if (keys.f.pressed) {
            if (this.previousStageOfFight === 'transitions') {
                this.phrases.transitions[this.stageOfTransition].currentTime = 0;
                this.phrases.transitions[this.stageOfTransition].pause();
                this.phrases.transitions[this.stageOfTransition].removeEventListener('ended', this.finalTransition);
            }
            else if (this.previousStageOfFight === 'key phrases') {
                this.phrases.keyPhrases[this.stageOfKeyPhrase].currentTime = 0;
                this.phrases.keyPhrases[this.stageOfKeyPhrase].pause();
                this.phrases.keyPhrases[this.stageOfKeyPhrase].removeEventListener('ended', this.finalKeyPhrases);
            }
            this.stageOfFight = 'questions';
            keys.f.pressed = false;
        }
    };
    return UniversityInFlesh;
}(TemplateCell));
export { UniversityInFlesh };
