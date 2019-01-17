import { Component, Input } from "@angular/core";
import * as PIXI from "pixi.js";

@Component({
  selector: "menu",
  template: "<span></span>"
})
export class MenuComponent {
  @Input() container: PIXI.Container = null;
  menuContainer: PIXI.Container;

  @Input() itemHeight = 200;
  @Input() itemWidth = 200;
  @Input() x = 0;
  @Input() y = 0;
  @Input() w = window.innerWidth;
  @Input() h = window.innerHeight;
  @Input() rowLength = 3;
  @Input() isGrid = false;
  @Input() isScrollable = true;

  dragPoint = { x: 0, y: 0 };
  mouseDown = false;
  dragging = false;

  constructor() { }

  ngOnInit() {
    this.initMenuContainer();

    if (this.isScrollable) this.initInteraction();

    this.positionContainer();
    this.positionItems();
  }

  positionContainer(event?: any) {
    this.menuContainer.position.set(this.x, this.y);
  }

  initMenuContainer() {
    this.menuContainer = new PIXI.Container();
    this.menuContainer.interactive = true;
    this.menuContainer.position.x = this.x;
    this.menuContainer.position.y = this.y;

    this.container.addChild(this.menuContainer);
  }

  initInteraction() {
    let self = this;
    this.menuContainer.interactive = true;

    this.menuContainer
      .on("mousedown", this.stageMouseDown.bind(this))
      .on("touchstart", this.stageMouseDown.bind(this));

    this.menuContainer
      .on("mouseupoutside", this.stageMouseUp.bind(this))
      .on("mouseup", this.stageMouseUp.bind(this))
      .on("touchendoutside", this.stageMouseUp.bind(this))
      .on("touchend", this.stageMouseUp.bind(this));

    this.menuContainer
      .on("mousemove", this.stageMove.bind(this))
      .on("touchmove", this.stageMove.bind(this));
  }

  getViewport() {
    return {
      min: this.menuContainer.position.x,
      max: this.menuContainer.position.x + this.w
    };
  }

  distanceFromCenter(i: number) {
    let child = this.menuContainer.children[i];

    if (!child) return 0;

    let vMin = this.getViewport().min;
    let vMax = this.getViewport().max;
    let center = this.w / 2;
    let itemX = child.transform.worldTransform.tx + child.getBounds().width / 2;
    let distX = Math.abs(itemX - center);

    return distX;
  }

  positionItems() {
    for (var c in this.menuContainer.children) {
      let child = this.menuContainer.children[c];
      if (!child) continue;

      if (
        !(child instanceof PIXI.Sprite) &&
        !(child instanceof PIXI.Container) &&
        !(child instanceof PIXI.Text)
      )
        return;

      if (child.children.length <= 1) continue;

      let pos = this.calculateItemPosition(parseInt(c));

      child.position.set(pos.x, pos.y);

      if (!this.isGrid) child.scale.set(pos.scale);
    }
  }

  sizeItem(i) {
    let child = this.menuContainer.children[i];
    if (!child)
      return 2;

    let scaleD = this.distanceFromCenter(i) / (this.w * 0.5);
    let scale = 1.5 - Math.min(1, scaleD > 0.1 ? scaleD : 0);
    return scale;
  }

  calculateItemPosition(i: number) {
    let child = this.menuContainer.children[i];
    if (!child)
      return {
        x: 0,
        y: 0,
        scale: this.sizeItem(i)
      };

    let baseH = this.itemHeight;
    let baseW = this.itemWidth;
    let scale = this.sizeItem(i);

    if (this.isGrid) {
      return {
        x:
          ((i % this.rowLength) * baseW) +
          Math.max(
            0,
            this.itemWidth * (this.rowLength - this.menuContainer.children.length)
          ),
        y: baseH * Math.floor(i / this.rowLength),
        scale: 1
      };
    } else {
      return {
        x:
          (i * baseW) +
          this.itemWidth * i,
        y: baseH,
        scale: scale
      };
    }
  }

  stageMouseDown(event: any) {
    this.mouseDown = true;
    if (!this.dragging) {
      let newPosition = event.data.getLocalPosition(this.container);
      this.dragPoint.x = newPosition.x;
      this.dragPoint.y = newPosition.y;
      // this.menuContainer.pivot.set(this.dragPoint.x, this.isGrid ? this.dragPoint.y : 0);
    }
  }

  stageMouseUp(event: any) {
    this.mouseDown = false;
    if (this.dragging) {
      this.dragging = false;
    }
  }

  stageMove(event: any) {
    if (this.mouseDown) {
      this.dragging = true;

      let newPosition = event.data.getLocalPosition(this.container);

      this.calcPosition(newPosition)
      this.dragPoint.x = newPosition.x;
      this.dragPoint.y = newPosition.y;
    }
  }


  calcPosition(newP: any) {
    let oldP = Object.assign({}, this.menuContainer.position)
    let menuWidth = this.menuContainer.children.length * this.itemWidth;
    let menuHeight = this.h;

    if (this.isGrid) {
      this.menuContainer.position.y -= this.dragPoint.y - newP.y;

      if (this.menuContainer.position.y > this.y + menuHeight) this.menuContainer.position.y = this.y + menuHeight;
      if (this.menuContainer.position.y < menuHeight * -1) this.menuContainer.position.y = menuHeight * -1;
    } else {
      this.menuContainer.position.x -= this.dragPoint.x - newP.x;

      if (this.menuContainer.position.x > this.x + menuWidth) this.menuContainer.position.x = this.x + menuWidth;
      if (this.menuContainer.position.x < menuWidth * -1) this.menuContainer.position.x = menuWidth * -1;
    }
  }
}
