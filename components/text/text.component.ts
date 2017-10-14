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
  selector: 'text-sprite',
  template: '<span></span>'
})
export class TextComponent extends SpriteComponent {

  @Input() fontSize: string = "48px";
	@Input()
	set valueToShow(val: string) {
		this.text = (val) || '';	
		
		if(this.textSpr)
			this.textSpr.text = this.text;
	}

  constructor() {
	super();
  }

  ngOnInit(){
	super.ngOnInit.bind(this)();
	
	this.addText(this.text);
	
	console.log("Anim ",this.anim)
	if(this.anim == 'hover')
		this.slowHover();
	
	if(this.handleClick && this.interactive)
		this.addInteraction(this.handleClick);
  }
 
  addText(text: string){
	if(this.textSpr){
		this.textSpr.text = text;
	}else{
		if(text.trim() != ""){
			let t = new PIXI.Text(text,{
				fontFamily: this.font, 
				fontSize: this.fontSize, 
				fill:"white", 
				stroke: "#000000", 
				strokeThickness: 6
			});
			
			this.spriteStage.addChild(t);
			t.scale.set(this.scale);
			t.position.x = this.x - 30;
			t.position.y = this.y;
			t.anchor.y = 0.5;
			
			this.textSpr = t;
			console.log(t);
		}
	}
  }
  
  addInteraction(cb){
	if(!this.spriteStage) return;
  
	this.spriteStage.interactive = true;
	
	if(this.anim == 'explode'){
		this.spriteStage
		.on('tap', () => { this.explodeOut().then(cb); })
		.on('click', () => { this.explodeOut().then(cb); });
	}else{
		
		this.spriteStage
		.on('tap', cb)
		.on('click', cb);
	}
  }
  
  slowHover(){
	this.hoverUp();
  }
  
  hoverUp(){
	TweenLite.to(this.spriteStage.position, 3, { 
		y: "-=30", 
		ease: Sine.easeInOut,
		onComplete: this.hoverDown.bind(this)
	});
  }
  hoverDown(){
	TweenLite.to(this.spriteStage.position, 4, { 
		y: "+=30", 
		ease: Sine.easeInOut,
		onComplete: this.hoverUp.bind(this)
	});
  }
  
  explodeOut(){
	  return (new Promise((resolve, reject) => {
		TweenLite.to(this.spriteStage, 0.8, { 
			alpha: 0
		});
		TweenLite.to(this.spriteStage.scale, 0.8, { 
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
