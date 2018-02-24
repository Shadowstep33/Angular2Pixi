import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import * as PIXI from 'pixi.js';

import { RendererComponent } from '../renderer/renderer.component';
/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/

@Component({
  selector: 'scene',
  template: '<span></span>'
})
export class SceneComponent {

  scale = 1;
  scaleFactor = 1.1;
  layers = {};
  mainStage: PIXI.Container = new PIXI.Container();
	
  @Input() renderer: RendererComponent;
  @Output() stageUpdated = new EventEmitter();
  
  //Functions to execute on move
  moveHandlers = {};

  //Functions to execute on click
  clickHandlers = {};

  constructor() {
  }

  init(layers?: any){
  
	console.log(PIXI);
	
	if(layers)
		this.layers = layers;
		
	//Add layers to homescene stage
	for(let l in this.layers)
		this.mainStage.addChild(this.layers[l]);
	
	this.renderer.pixi.worldStage.addChild(this.mainStage);	
  }

	fadeInScene(){
		let self = this;
		return (new Promise( (resolve, reject) => {
			let c = setInterval(()=>{
				if(self.mainStage.alpha >= 1){
					clearInterval(c);
					
					resolve();
				}else{
					self.mainStage.alpha += 0.12;
				}
			}, 50);
		}));
		
	}
	
	fadeOutScene(){
		let self = this;
		return (new Promise( (resolve, reject) => {
			let c = setInterval(()=>{
				if(self.mainStage.alpha <= 0){
					clearInterval(c);
					
					resolve();
				}else{
					self.mainStage.alpha -= 0.12;
				}
			}, 50);
		}));
		
	}

	blurScene(scene){
		// console.log(PIXI.filters);
		// this.filter = new PIXI.filters.BloomFilter();
		// this.spriteStage.filters = [this.filter];
	}
	
  registerHandler(eventStr, id, fn){
    switch(eventStr){
      case 'click':
        this.clickHandlers[id] = fn;
        break;
      case 'move':
        this.moveHandlers[id] = fn;
        break;
      default:
        return;
    }
  }

  deregisterHandler(eventStr, id){
    switch(eventStr){
      case 'click':
        delete this.clickHandlers[id];
        break;
      case 'move':
        delete this.moveHandlers[id];
        break;
      default:
        return;
    }
  }

  stageClick(data){
    let pos = data.data.getLocalPosition(self);

    console.log("Click pos: ", pos);
    for(let c in this.clickHandlers)
      this.clickHandlers[c](pos);

  };

  /**
  *	Wipe all layers of children
  *
  **/
  wipe(){
    for(let l in this.layers)
      this.layers[l].removeChildren();

    this.layers = {};
  };
  
  unload(){
	this.wipe();
	
	if(this.mainStage)
	if(this.mainStage.parent)
		this.mainStage.parent.removeChild(this.mainStage);
  }
}
