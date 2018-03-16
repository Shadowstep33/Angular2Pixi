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
      
    this.positionItems();
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
      max: this.menuContainer.position.x + this.w
    };
  }
  
  itemInViewport(i){
    let child = this.menuContainer.children[i];
    
    if(!child) return false;
    
    let itemPosX = child.transform.worldTransform.tx;
    let itemMaxX = child.transform.worldTransform.tx + child.getBounds().width;
    
    let vMin = this.getViewport().min;
    let vMax = this.getViewport().max;
    
    return itemPosX >= vMin && itemMaxX <= vMax;
  }
  
  distanceFromCenter(i){
    let child = this.menuContainer.children[i];
    
    if(!child) return 0;
    
    let vMin = this.getViewport().min;
    let vMax = this.getViewport().max;
    let center = this.w / 1.4;
    let itemX = child.transform.worldTransform.tx + (child.getBounds().width/2);
    let distX = Math.abs( itemX - center);
    
    return distX;
  }
  
  sizeItem(i){
    let child = this.menuContainer.children[i];
    if(!child) return 2;
    
    if(!this.dragging) return child.scale.x;
    
    let scaleD = this.distanceFromCenter(i) / (this.w * 0.6);
    let scale = (1.5 - Math.min( 1, scaleD > 0.1 ? scaleD : 0 ) );
    return scale.toFixed(2);
  }
  
  positionItems(){
    for(var c in this.menuContainer.children){
      let child = this.menuContainer.children[c];
      if(!child) continue;
      
      if(child.children.length <= 1)  continue;
      
      let pos = this.calculateItemPosition(c);
      
      child.position.set(
        pos.x,
        pos.y
      );
      
      if(!this.isGrid)
        child.scale.set(pos.scale);
      
    }
  }
  
  calculateItemPosition(i){
    let child = this.menuContainer.children[i];
    if(!child) return {
      x: 0,
      y: 0,
      scale: this.sizeItem(i)
    };
    
    let baseH = this.itemHeight;
    let baseW = this.itemWidth;
    let scale = this.sizeItem(i);
    
    return {
      x: this.isGrid ? ((i%3) * baseW) : (i * baseW),
      y: this.isGrid ? baseH * (Math.floor(i/3)) : baseH,
      scale: this.isGrid ? 1 : scale
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
       
      let { newX, newY } = this.calcPosition( oldPosition, newPosition );
      
      this.menuContainer.position.set(
        newX, 
        newY
      );
      
      this.positionItems();
    }
  }
  
  calcPosition( oldP, newP ){
    let newX = !this.isGrid ? newP.x - this.dragPoint.x : oldP.x;
    let newY = this.isGrid ? newP.y - this.dragPoint.y : oldP.y;
    
    let menuWidth = this.menuContainer.getBounds().width - (this.w * 0.6);
    let menuHeight = this.menuContainer.getBounds().height;
    
    if(this.isGrid){
      if(newY > this.y)
        newY = oldP.y;
      if(newY <= menuHeight * -1)
        newY = oldP.y;
    }else{
      if(newX > this.x + 100)
        newX = oldP.x;
      if(newX < menuWidth * -1)
        newX = oldP.x;
    }  
    
    return { newX, newY };
  }
}
