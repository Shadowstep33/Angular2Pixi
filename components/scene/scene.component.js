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
const renderer_component_1 = require("../renderer/renderer.component");
/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/
let SceneComponent = class SceneComponent {
    constructor() {
        this.scale = 1;
        this.scaleFactor = 1.1;
        this.layers = {};
        this.mainStage = new PIXI.Container();
        this.stageUpdated = new core_1.EventEmitter();
        //Functions to execute on move
        this.moveHandlers = {};
        //Functions to execute on click
        this.clickHandlers = {};
    }
    init(layers) {
        console.log(PIXI);
        if (layers)
            this.layers = layers;
        //Add layers to homescene stage
        for (var l in this.layers)
            this.mainStage.addChild(this.layers[l]);
        this.renderer.pixi.worldStage.addChild(this.mainStage);
    }
    fadeInScene() {
        var self = this;
        return (new Promise((resolve, reject) => {
            let c = setInterval(() => {
                if (self.mainStage.alpha >= 1) {
                    clearInterval(c);
                    resolve();
                }
                else {
                    self.mainStage.alpha += 0.12;
                }
            }, 50);
        }));
    }
    fadeOutScene() {
        var self = this;
        return (new Promise((resolve, reject) => {
            let c = setInterval(() => {
                if (self.mainStage.alpha <= 0) {
                    clearInterval(c);
                    resolve();
                }
                else {
                    self.mainStage.alpha -= 0.12;
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
    deregisterHandler(eventStr, id) {
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
    resizeStage() {
        console.log(this);
        let W = window.innerWidth;
        let H = window.innerHeight;
        if (this.renderer) {
            let renderer = this.renderer.pixi.renderer;
            let currWidth = this.mainStage.getBounds().width;
            let currHeight = this.mainStage.getBounds().height;
            //Get current ratio of stage to renderer
            let ratio = Math.min(W / renderer.width, H / renderer.height);
            console.log("Ratio", ratio);
            //Resize renderer to new window
            this.renderer.width = W;
            this.renderer.height = H;
            renderer.resize(W, H);
            //Move mainstage to center of screen
            // this.mainStage.position.set(currWidth/2, currHeight/2);
            //Scale it up/down to fit the renderer and maintain ratio
            this.mainStage.scale.set(ratio, ratio);
            //Pivot so it originates from window center
            // this.mainStage.pivot.set(W/2, H/2);
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", renderer_component_1.RendererComponent)
], SceneComponent.prototype, "renderer", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SceneComponent.prototype, "stageUpdated", void 0);
__decorate([
    core_1.HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SceneComponent.prototype, "resizeStage", null);
SceneComponent = __decorate([
    core_1.Component({
        selector: 'scene',
        template: '<span></span>'
    }),
    __metadata("design:paramtypes", [])
], SceneComponent);
exports.SceneComponent = SceneComponent;
//# sourceMappingURL=scene.component.js.map