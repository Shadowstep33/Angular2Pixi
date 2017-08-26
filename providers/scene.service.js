"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const PIXI = require("pixi.js");
/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/
let SceneService = class SceneService {
    constructor() {
        this.scale = 1;
        this.scaleFactor = 1.1;
        this.layers = {};
        //Functions to execute on move
        this.moveHandlers = {};
        //Functions to execute on click
        this.clickHandlers = {};
    }
    init(layers) {
        console.log(PIXI);
        this.mainStage = new PIXI.Container();
        if (layers)
            this.layers = layers;
    }
    fadeInScene(scene) {
        return (new Promise((resolve, reject) => {
            let c = setInterval(() => {
                if (scene.layers.background.alpha >= 1) {
                    clearInterval(c);
                    resolve();
                }
                else {
                    scene.layers.background.alpha += 0.12;
                }
            }, 50);
        }));
    }
    fadeOutScene(scene) {
        return (new Promise((resolve, reject) => {
            let c = setInterval(() => {
                if (scene.layers.background.alpha <= 0) {
                    clearInterval(c);
                    resolve();
                }
                else {
                    scene.layers.background.alpha -= 0.12;
                }
            }, 50);
        }));
    }
    blurScene(scene) {
        // console.log(PIXI.filters);
        // this.filter = new PIXI.filters.BloomFilter();
        // this.spriteStage.filters = [this.filter];
    }
    registerHandler(eventStr, id, fn) {
        switch (eventStr) {
            case 'click':
                this.clickHandlers[id] = fn;
                break;
            case 'move':
                this.moveHandlers[id] = fn;
                break;
            default:
                return;
        }
    }
    deregisterCallback(eventStr, id) {
        switch (eventStr) {
            case 'click':
                delete this.clickHandlers[id];
                break;
            case 'move':
                delete this.moveHandlers[id];
                break;
            default:
                return;
        }
    }
    stageClick(data) {
        var pos = data.data.getLocalPosition(self);
        console.log("Click pos: ", pos);
        for (var c in this.clickHandlers)
            this.clickHandlers[c](pos);
    }
    ;
    /**
    *	Wipe all layers of children
    *
    **/
    wipe() {
        for (var l in this.layers)
            this.layers[l].removeChildren();
        this.layers = {};
    }
    ;
    unload() {
        this.wipe();
        if (this.mainStage)
            if (this.mainStage.parent)
                this.mainStage.parent.removeChild(this.mainStage);
    }
};
SceneService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SceneService);
exports.SceneService = SceneService;
//# sourceMappingURL=scene.service.js.map