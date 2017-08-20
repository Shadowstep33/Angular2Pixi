import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as PIXI from 'pixi.js';

/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/

@Injectable()
export class SceneService {

  scale = 1;
  scaleFactor = 1.1;
  layers = {};
  mainStage: PIXI.Container;
	
  //Functions to execute on move
  moveHandlers = {};

  //Functions to execute on click
  clickHandlers = {};

  constructor() {
  }

  init(layers){
  
	console.log(PIXI);
	this.mainStage = new PIXI.Container();
	
	if(layers)
		this.layers = layers;
  }

	fadeInScene(scene){
		return (new Promise( (resolve, reject) => {
			let c = setInterval(()=>{
				if(scene.layers.background.alpha >= 1){
					clearInterval(c);
					
					resolve();
				}else{
					scene.layers.background.alpha += 0.12;
				}
			}, 50);
		}));
		
	}
	
	fadeOutScene(scene){
		return (new Promise( (resolve, reject) => {
			let c = setInterval(()=>{
				if(scene.layers.background.alpha <= 0){
					clearInterval(c);
					
					resolve();
				}else{
					scene.layers.background.alpha -= 0.12;
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

  deregisterCallback(eventStr, id){
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
    var pos = data.data.getLocalPosition(self);

    console.log("Click pos: ", pos);
    for(var c in this.clickHandlers)
      this.clickHandlers[c](pos);

  };

  /**
  *	Wipe all layers of children
  *
  **/
  wipe(){
    for(var l in this.layers)
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
