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
require("rxjs/add/operator/map");
const PIXI = require("pixi.js");
/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let PixiService = class PixiService {
    constructor() {
        this.loader = new PIXI.loaders.Loader();
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        });
        this.ratio = 0;
        this.starting_width = 0;
        this.starting_width_of_window = 0;
        this.starting_height = 0;
        this.starting_height_of_window = 0;
        this.time = 0;
        this.last_time = 0;
        this.anim_loop_callbacks = [];
        this.to_render = [];
        console.log('Hello Pixi Provider');
    }
    animate(t) {
        let self = this;
        this.time = (new Date()).getTime() / 1000;
        var deltaTime = this.time - this.last_time;
        if (typeof this.worldStage != "undefined")
            if (this.worldStage) {
                for (var s in this.to_render)
                    this.to_render[s].update(deltaTime / 60.0);
                for (var c in this.anim_loop_callbacks)
                    this.anim_loop_callbacks[c]();
                this.renderer.render(this.worldStage);
            }
        this.last_time = this.time;
        requestAnimationFrame((t) => {
            self.animate(t);
        });
    }
    appendRenderer(id) {
        //Add canvas to page
        var el = document.getElementById(id);
        if (el)
            el.appendChild(this.renderer.view);
    }
    sizeCollection(el, args) {
        //Get current ratio
        var ratio = this.renderer.width / this.renderer.height;
        //Get current width
        var old_w = this.renderer.width;
        //Get new width
        if (typeof args == "undefined")
            var w = el.width();
        else
            var w = args.width;
        //Resize to match width
        var perChange = this.worldStage.scale.x * ((old_w - w) / old_w);
        this.renderer.resize(w, window.innerHeight);
        //Scale Stage based on % change of screen width
        this.worldStage.scale.x -= this.worldStage.scale.x * ((old_w - w) / old_w);
        this.worldStage.scale.y = this.worldStage.scale.x;
    }
    init(w, h, el) {
        //Initialize game renderer
        if (typeof w == "undefined" || w == 0)
            w = window.innerWidth;
        if (typeof h == "undefined" || h == 0)
            h = window.innerHeight;
        //Initialize game container
        this.renderer = PIXI.autoDetectRenderer({
            width: w,
            height: h,
            transparent: true,
            autoResize: false,
            resolution: 1,
            view: el
        });
        this.worldStage = new PIXI.Container();
        //Initialize game camera
        var w = this.renderer.width;
        var h = this.renderer.height;
        this.ratio = w / h;
        this.starting_width = w;
        this.starting_width_of_window = w / window.innerWidth;
        this.starting_height = h;
        this.starting_height_of_window = h / window.innerHeight;
        this.animate(0);
    }
};
PixiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], PixiService);
exports.PixiService = PixiService;
//# sourceMappingURL=pixi.service.js.map