import { Component, ElementRef, Input } from '@angular/core';
import * as PIXI from 'pixi.js';
import { 
	TweenLite, 
	Circ, 
	Sine, 
	SlowMo, 
	Power4
} from "gsap";

import { SpriteComponent } from '../sprite/sprite.component';

@Component({
  selector: 'menu',
  template: '<span></span>'
})
export class MenuComponent extends SpriteComponent {
  menuContainer: PIXI.Container;
  
  @Input() itemHeight = 200;
  @Input() itemWidth = 200;
  @Input() x = 0;
  @Input() y = 0;
  @Input() w = window.innerWidth;
  @Input() h = window.innerHeight;
  @Input() isGrid = false;
  @Input() isScrollable = true;
  
  dragPoint = {x: 0, y: 0};
  mouseDown = false;
  dragging = false;
  
  constructor() {
    super();
  }

  ngOnInit(){
    super.ngOnInit.bind(this)();
    
    this.initMenuContainer();
    
    if(this.isScrollable)
      this.initInteraction();
  }
  
  initMenuContainer(){  
    this.menuContainer = new PIXI.Container();
    this.menuContainer.position.x = this.x;
    this.menuContainer.position.y = this.y;
    
    console.log("Menu Container", this.menuContainer);
    
    this.container.addChild(this.menuContainer);  
  }
  
  initInteraction(){
    let self = this;
    this.menuContainer.interactive = true;
    
		this.menuContainer
		.on('mousedown',this.stageMouseDown.bind(this))
		.on('touchstart',this.stageMouseDown.bind(this)); 
    
		this.menuContainer
		.on('mouseupoutside',this.stageMouseUp.bind(this))
		.on('mouseup',this.stageMouseUp.bind(this))
		.on('touchendoutside',this.stageMouseUp.bind(this))
		.on('touchend',this.stageMouseUp.bind(this)); 
    
		this.menuContainer
		.on('mousemove',this.stageMove.bind(this))
		.on('touchmove',this.stageMove.bind(this)); 
  }
  
  getViewport(){
    return {
      min: this.menuContainer.position.x,
      max: this.w
    };
  }
  
  itemInViewport(i){
    let itemPosX = i * this.itemWidth;
    
    return ( itemPosX >= this.getViewport().min ) && ( itemPosX <= this.getViewport().max );
  }
  
  sizeItem(i){
    if( this.itemInViewport(i) )
      return 0.35;
    else
      return 0.3;
  }
  
  positionItem(i){
    let baseH = this.itemHeight;
    let baseW = this.itemWidth;
    
    return {
      x: this.isGrid ? ((i%3) * baseW) : (i * baseW),
      y: this.isGrid ? baseH * (Math.floor(i/3)) : baseH
    }
  }
  
  stageMouseDown(event){
    this.mouseDown = true;
    if (!this.dragging) {
      this.dragPoint = event.data.getLocalPosition(this.container);
      
      this.container.pivot.set(this.dragPoint.x, this.dragPoint.y)
      this.container.position.set(event.data.global.x, event.data.global.y);
      
      this.dragPoint.x -= this.menuContainer.x;   
      this.dragPoint.y -= this.menuContainer.y;   
    }
  }
  stageMouseUp(event){
    this.mouseDown = false;
    if (this.dragging) {
        this.dragging = this.menuContainer.dragging = false;
    }
  }
   
  stageMove(event){
    if(this.mouseDown){
      this.dragging = this.menuContainer.dragging = true;
      
      let newPosition = event.data.getLocalPosition(this.container);
      let oldPosition = this.menuContainer.position;
      
      this.menuContainer.position.set(
        newPosition.x - this.dragPoint.x, 
        this.isGrid ? newPosition.y - this.dragPoint.y : oldPosition.y
      );
    }
  }
}
