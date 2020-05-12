import { Component, ElementRef, Input } from "@angular/core";
import * as PIXI from "pixi.js";
import { TweenLite, Circ, Sine, SlowMo, Power4 } from "gsap";

@Component({
  selector: "sprite",
  template: "<span></span>",
})
export class SpriteComponent {
  @Input()
  handleClick = null;
  @Input()
  imgUrl: string = "";
  @Input()
  frameName: string = "";
  @Input()
  scale: number = 1;
  @Input()
  font: string = "Arial";
  @Input()
  fontSize: string = "48px";
  @Input()
  strokeColor: string = "#000000";
  @Input()
  fontColor: string = "white";
  @Input()
  interactive: boolean = true;

  @Input()
  _x: number = 0;
  @Input()
  set x(val: number) {
    this._x = val || 0;

    if (this.spriteObject) this.positionSprite();
  }
  get x(): number {
    return this._x;
  }

  @Input()
  _y: number = 0;
  @Input()
  set y(val: number) {
    this._y = val || 0;

    if (this.spriteObject) this.positionSprite();
  }
  get y(): number {
    return this._y;
  }

  @Input()
  text: string = "";
  @Input()
  set valueToShow(val: string) {
    this.text = val || "";

    if (this.textSpr) this.textSpr.text = this.text;
  }

  @Input()
  container: PIXI.Container = null;
  @Input()
  anim: string = "";
  @Input()
  anchor = { x: 0.5, y: 0.5 };
  @Input()
  tAnchor = { x: 0.5, y: 0.5 };

  spriteStage: PIXI.Container;
  textSpr: PIXI.Text = null;

  spriteObject: PIXI.Sprite = null;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.spriteStage = new PIXI.Container();

    this.addSprite(this.imgUrl, this.frameName);
    this.addText(this.text);

    if (this.container) this.container.addChild(this.spriteStage);

    if (this.anim == "hover") this.slowHover();

    if (this.handleClick && this.interactive)
      this.addInteraction(this.handleClick);
  }

  addSprite(img, frame) {
    if (img.trim() != "" || frame.trim() != "") {
      let texture = img
        ? PIXI.Texture.fromImage(img)
        : PIXI.Texture.fromFrame(frame);

      //create sprite
      this.spriteObject = new PIXI.Sprite(texture);
      this.spriteObject.anchor.x = this.anchor.x;
      this.spriteObject.anchor.y = this.anchor.x;

      //positioning and sizing
      this.positionSprite();

      //add to sprite container
      this.spriteStage.addChild(this.spriteObject);
    }
  }

  positionSprite() {
    if (!this.spriteObject) return;

    this.spriteObject.scale.set(this.scale);
    (this.spriteObject.position.x = this._x),
      (this.spriteObject.position.y = this._y);
  }

  addText(text) {
    if (this.textSpr) {
      this.textSpr.text = text;
    } else {
      if (text.toString().trim() != "") {
        let t = new PIXI.Text(text, {
          fontFamily: this.font,
          fontSize: this.fontSize,
          fill: this.fontColor,
          stroke: this.strokeColor,
          strokeThickness: 4,
        });

        t.resolution = window.devicePixelRatio;
        this.spriteStage.addChild(t);
        t.position.x = this._x - 30;
        t.position.y = this._y;
        t.anchor.x = this.tAnchor.x;
        t.anchor.y = this.tAnchor.y;

        this.textSpr = t;
      }
    }
  }

  addInteraction(cb) {
    if (!this.spriteObject) return;

    this.spriteObject.interactive = true;

    if (this.anim == "explode") {
      this.spriteObject
        .on("tap", () => {
          this.explodeOut().then(cb);
        })
        .on("click", () => {
          this.explodeOut().then(cb);
        });
    } else {
      this.spriteObject.on("tap", cb).on("click", cb);
    }
  }

  slowHover() {
    this.hoverUp();
  }

  hoverUp() {
    TweenLite.to(this.spriteStage.position, 3, {
      y: "-=30",
      ease: Sine.easeInOut,
      onComplete: this.hoverDown.bind(this),
    });
  }

  hoverDown() {
    TweenLite.to(this.spriteStage.position, 4, {
      y: "+=30",
      ease: Sine.easeInOut,
      onComplete: this.hoverUp.bind(this),
    });
  }

  explodeOut() {
    return new Promise((resolve, reject) => {
      TweenLite.to(this.spriteObject, 0.8, {
        alpha: 0,
      });
      TweenLite.to(this.spriteObject.scale, 0.8, {
        x: 2,
        y: 2,
        onComplete: resolve.bind(this),
      });
    });
  }

  ngOnDestroy() {
    if (this.spriteStage)
      if (this.spriteStage.parent)
        this.spriteStage.parent.removeChild(this.spriteStage);
  }
}
