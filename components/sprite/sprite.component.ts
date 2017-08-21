import { Component, ElementRef, Input } from '@angular/core';

import * as PIXI from 'pixi.js';
import { 
	TweenLite, 
	Circ, 
	Sine, 
	SlowMo, 
	Power4
} from "gsap";

@Component({
  selector: 'sprite',
  template: '<span></span>'
})
export class SpriteComponent {

  @Input() handleClick = null;
  @Input() imgUrl: string = '';
  @Input() scale: number = 1;
  @Input() font: string = "Arial";
  @Input() interactive: boolean = true;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() text: string = '';
  @Input() container: PIXI.Container = null;
  @Input() anim: string = '';
  
  spriteStage: PIXI.Container;
  
  spriteObject: PIXI.Sprite = null;

  constructor() {
  }

  ngOnInit(){
	
	this.spriteStage = new PIXI.Container();
	
	this.addSprite(this.imgUrl);
	this.addText(this.text);
	
	if(this.container)
		this.container.addChild(this.spriteStage); 
		
	console.log("Anim ",this.anim)
	if(this.anim == 'hover')
		this.slowHover();
	
	if(this.handleClick && this.interactive)
		this.addInteraction(this.handleClick);
  }

  addSprite(img){
	if(img.trim() != ""){
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
  
  addText(text){
	if(text.trim() != ""){
		let t = new PIXI.Text(text,{
			fontFamily: this.font, 
			fontSize:"64px", 
			fill:"white", 
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
  
  addInteraction(cb){
	if(!this.spriteObject) return;
  
	this.spriteObject.interactive = true;
	
	if(this.anim == 'explode'){
		this.spriteObject
		.on('tap', () => { this.explodeOut().then(cb); })
		.on('click', () => { this.explodeOut().then(cb); });
	}else{
		
		this.spriteObject
		.on('tap', cb)
		.on('click', cb);
	}
  }
  
  slowHover(){
	this.hoverUp();
  }
  
  hoverUp(){
	TweenLite.to(this.spriteObject.position, 3, { 
		y: "-=30", 
		ease: Sine.easeInOut,
		onComplete: this.hoverDown.bind(this)
	});
  }
  hoverDown(){
	TweenLite.to(this.spriteObject.position, 4, { 
		y: "+=30", 
		ease: Sine.easeInOut,
		onComplete: this.hoverUp.bind(this)
	});
  }
  
  explodeOut(){
	  return (new Promise((resolve, reject) => {
		TweenLite.to(this.spriteObject, 0.8, { 
			alpha: 0
		});
		TweenLite.to(this.spriteObject.scale, 0.8, { 
			x: 2,
			y: 2,
			onComplete: resolve.bind(this)
		});
	  }));
  }
  
  ngOnDestroy(){
    if(this.spriteStage)
    if(this.spriteStage.parent)
		this.spriteStage.parent.removeChild(this.spriteStage);
  }
}
