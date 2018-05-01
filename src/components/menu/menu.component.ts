import { Component, Input } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'menu',
  template: '<span></span>'
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
  @Input() isGrid = false;
  @Input() isScrollable = true;
  
  dragPoint = {x: 0, y: 0};
  mouseDown = false;
  dragging = false;
  
  constructor() {
  }

  ngOnInit(){
    this.initMenuContainer();
    
    if(this.isScrollable)
      this.initInteraction();
      
    this.positionItems();
  }
  
  initMenuContainer(){  
    this.menuContainer = new PIXI.Container();
    this.menuContainer.interactive = true;
    this.menuContainer.position.x = this.x;
    this.menuContainer.position.y = this.y;
    
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
  
  distanceFromCenter(i: number){
    let child = this.menuContainer.children[i];
    
    if(!child) return 0;
    
    let vMin = this.getViewport().min;
    let vMax = this.getViewport().max;
    let center = this.w / 1.4;
    let itemX = child.transform.worldTransform.tx + (child.getBounds().width/2);
    let distX = Math.abs( itemX - center);
    
    return distX;
  }
  
  sizeItem(i: number){
    let child = this.menuContainer.children[i];
    if(!child) return 2;
    
    if(!this.dragging) return child.scale.x;
    
    let scaleD = this.distanceFromCenter(i) / (this.w * 0.6);
    let scale = (1.5 - Math.min( 1, scaleD > 0.1 ? scaleD : 0 ) );
    return scale;
  }
  
  positionItems(){
    for(var c in this.menuContainer.children){
      let child = this.menuContainer.children[c];
      if(!child) continue;
      
      if( !(child instanceof PIXI.Sprite)&& 
      !(child instanceof PIXI.Container) && 
      !(child instanceof PIXI.Text ) ) return;
      
      if(child.children.length <= 1)  continue;
      
      let pos = this.calculateItemPosition( parseInt(c) );
      
      child.position.set(
        pos.x,
        pos.y
      );
      
      if(!this.isGrid)
        child.scale.set( pos.scale );
      
    }
  }
  
  calculateItemPosition(i: number){
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
      x: ( this.isGrid ? ((i%3) * baseW) : (i * baseW) ) + ((this.itemWidth*0.5) * (3 - this.menuContainer.children[i].length) ),
      y: this.isGrid ? baseH * (Math.floor(i/3)) : baseH,
      scale: this.isGrid ? 1 : scale
    }
  }
  
  stageMouseDown(event: any){
    this.mouseDown = true;
    if (!this.dragging) {
      this.dragPoint = event.data.getLocalPosition(this.container);
      
      this.container.pivot.set(this.dragPoint.x, this.dragPoint.y)
      this.container.position.set(event.data.global.x, event.data.global.y);
      
      this.dragPoint.x -= this.menuContainer.x;   
      this.dragPoint.y -= this.menuContainer.y;   
    }
  }
  stageMouseUp(event: any){
    this.mouseDown = false;
    if (this.dragging) {
        this.dragging = false;
    }
  }
   
  stageMove(event: any){
    if(this.mouseDown){
      this.dragging = true;
      
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
  
  calcPosition( oldP: any, newP: any ){
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
