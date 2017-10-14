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
const gsap_1 = require("gsap");
let SpriteComponent = class SpriteComponent {
    constructor() {
        this.handleClick = null;
        this.imgUrl = '';
        this.scale = 1;
        this.font = "Arial";
        this.interactive = true;
        this.x = 0;
        this.y = 0;
        this.text = '';
        this.container = null;
        this.anim = '';
        this.textSpr = null;
        this.spriteObject = null;
    }
    ngOnInit() {
        this.spriteStage = new PIXI.Container();
        this.addSprite(this.imgUrl);
        this.addText(this.text);
        if (this.container)
            this.container.addChild(this.spriteStage);
        if (this.anim == 'hover')
            this.slowHover();
        if (this.handleClick && this.interactive)
            this.addInteraction(this.handleClick);
    }
    addSprite(img) {
        if (img.trim() != "") {
            let texture = PIXI.Texture.fromImage(img);
            //create sprite
            this.spriteObject = new PIXI.Sprite(texture);
            this.spriteObject.anchor.x = 0.5,
                this.spriteObject.anchor.y = 0.5,
                //positioning and sizing
                this.spriteObject.scale.set(this.scale);
            this.spriteObject.position.x = this.x,
                this.spriteObject.position.y = this.y;
            //add to sprite container
            this.spriteStage.addChild(this.spriteObject);
        }
    }
    addText(text) {
        if (text.trim() != "") {
            let t = new PIXI.Text(text, {
                fontFamily: this.font,
                fontSize: "64px",
                fill: "white",
                stroke: "#000000",
                strokeThickness: 6
            });
            this.spriteStage.addChild(t);
            t.scale.set(this.scale);
            t.position.x = this.x - 30;
            t.position.y = this.y;
            t.anchor.y = 0.5;
            this.textSpr = t;
        }
    }
    addInteraction(cb) {
        if (!this.spriteObject)
            return;
        this.spriteObject.interactive = true;
        if (this.anim == 'explode') {
            this.spriteObject
                .on('tap', () => { this.explodeOut().then(cb); })
                .on('click', () => { this.explodeOut().then(cb); });
        }
        else {
            this.spriteObject
                .on('tap', cb)
                .on('click', cb);
        }
    }
    slowHover() {
        this.hoverUp();
    }
    hoverUp() {
        gsap_1.TweenLite.to(this.spriteObject.position, 3, {
            y: "-=30",
            ease: gsap_1.Sine.easeInOut,
            onComplete: this.hoverDown.bind(this)
        });
    }
    hoverDown() {
        gsap_1.TweenLite.to(this.spriteObject.position, 4, {
            y: "+=30",
            ease: gsap_1.Sine.easeInOut,
            onComplete: this.hoverUp.bind(this)
        });
    }
    explodeOut() {
        return (new Promise((resolve, reject) => {
            gsap_1.TweenLite.to(this.spriteObject, 0.8, {
                alpha: 0
            });
            gsap_1.TweenLite.to(this.spriteObject.scale, 0.8, {
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
    core_1.Input(),
    __metadata("design:type", Object)
], SpriteComponent.prototype, "handleClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SpriteComponent.prototype, "imgUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SpriteComponent.prototype, "scale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SpriteComponent.prototype, "font", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SpriteComponent.prototype, "interactive", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SpriteComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SpriteComponent.prototype, "y", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SpriteComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = (typeof PIXI !== "undefined" && PIXI).Container) === "function" && _a || Object)
], SpriteComponent.prototype, "container", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SpriteComponent.prototype, "anim", void 0);
SpriteComponent = __decorate([
    core_1.Component({
        selector: 'sprite',
        template: '<span></span>'
    }),
    __metadata("design:paramtypes", [])
], SpriteComponent);
exports.SpriteComponent = SpriteComponent;
var _a;
//# sourceMappingURL=sprite.component.js.map