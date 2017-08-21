"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const PIXI = require("pixi.js");
/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let AssetService = class AssetService {
    constructor() {
        this.loader = new PIXI.loaders.Loader();
        this.loading = false;
        this.assets_loaded = false;
        this.callbacks = {};
        console.log('Hello Asset Provider');
    }
    init() {
    }
    registerCallback(id, fn) {
        this.callbacks[id] = fn;
        //If assets are loaded, run callback but delete callback
        if (!this.loading && this.assets_loaded) {
            fn();
            this.deregisterCallback(id);
        }
    }
    deregisterCallback(id) {
        delete this.callbacks[id];
    }
    runCallbacks() {
        for (var c in this.callbacks) {
            this.callbacks[c]();
        }
    }
    loadAssets() {
        let self = this;
        self.loader.load();
        self.loader.once("complete", function (res) {
            self.assets_loaded = true;
            self.loading = false;
            console.log("Assets Loaded");
            //Run callbacks
            self.runCallbacks();
        });
        self.loader.on("progress", function () {
            self.loading = true;
        });
    }
    //only works for horizontal spritesheets
    getFramesFromSpriteSheet(texture, colX, colY, rowStart) {
        var frames = [];
        var frameWidth = Math.round(texture.width / colX);
        var frameHeight = Math.round(texture.height / colY);
        var startY = Math.min(frameHeight * rowStart, texture.height - frameHeight);
        for (var i = 0; i < texture.width - frameWidth; i += frameWidth) {
            frames.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i, startY, frameWidth, frameHeight)));
        }
        return frames;
    }
};
AssetService = __decorate([
    core_1.Injectable()
], AssetService);
exports.AssetService = AssetService;
