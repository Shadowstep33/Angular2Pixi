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
const gsap_1 = require("gsap");
const sprite_component_1 = require("../sprite/sprite.component");
let TextComponent = class TextComponent extends sprite_component_1.SpriteComponent {
    constructor() {
        super();
        this.fontSize = "48px";
    }
    ngOnInit() {
        super.ngOnInit.bind(this)();
        this.spriteStage = new PIXI.Container();
        this.addText(this.text);
        console.log("Anim ", this.anim);
        if (this.anim == 'hover')
            this.slowHover();
        if (this.handleClick && this.interactive)
            this.addInteraction(this.handleClick);
    }
    addText(text) {
        if (text.trim() != "") {
            let t = new PIXI.Text(text, {
                fontFamily: this.font,
                fontSize: this.fontSize,
                fill: "white",
                stroke: "#000000",
                strokeThickness: 6
            });
            this.spriteStage.addChild(t);
            t.scale.set(this.scale);
            t.position.x = this.x - 30;
            t.position.y = this.y;
            t.anchor.y = 0.5;
            console.log(t);
        }
    }
    addInteraction(cb) {
        if (!this.spriteStage)
            return;
        this.spriteStage.interactive = true;
        if (this.anim == 'explode') {
            this.spriteStage
                .on('tap', () => { this.explodeOut().then(cb); })
                .on('click', () => { this.explodeOut().then(cb); });
        }
        else {
            this.spriteStage
                .on('tap', cb)
                .on('click', cb);
        }
    }
    slowHover() {
        this.hoverUp();
    }
    hoverUp() {
        gsap_1.TweenLite.to(this.spriteStage.position, 3, {
            y: "-=30",
            ease: gsap_1.Sine.easeInOut,
            onComplete: this.hoverDown.bind(this)
        });
    }
    hoverDown() {
        gsap_1.TweenLite.to(this.spriteStage.position, 4, {
            y: "+=30",
            ease: gsap_1.Sine.easeInOut,
            onComplete: this.hoverUp.bind(this)
        });
    }
    explodeOut() {
        return (new Promise((resolve, reject) => {
            gsap_1.TweenLite.to(this.spriteStage, 0.8, {
                alpha: 0
            });
            gsap_1.TweenLite.to(this.spriteStage.scale, 0.8, {
                x: 2,
                y: 2,
                onComplete: resolve.bind(this)
            });
        }));
    }
    ngOnDestroy() {
        if (this.spriteStage)
            if (this.spriteStage.parent)
                this.spriteStage.parent.removeChild(this.spriteStage);
    }
};
__decorate([
    core_1.Input()
], TextComponent.prototype, "fontSize", void 0);
TextComponent = __decorate([
    core_1.Component({
        selector: 'text-sprite',
        template: '<span></span>'
    })
], TextComponent);
exports.TextComponent = TextComponent;
