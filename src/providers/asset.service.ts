import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';

/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AssetService {

  loader = new PIXI.Loader();
  loading = false;
  assets_loaded = false;
  callbacks = {};

  constructor() {
  }

  init(){
  }

  registerCallback(id, fn){
    this.callbacks[id] = fn;

    //If assets are loaded, run callback but delete callback
    if(!this.loading && this.assets_loaded){
      fn();

      this.deregisterCallback(id);
    }
  }

  deregisterCallback(id){
    delete this.callbacks[id];
  }

  runCallbacks(){
    for(let c in this.callbacks){
      this.callbacks[c]();
    }
  }

  loadAssets(){
	let self = this;
	
    self.loading = true;
    self.loader.load();

    self.loader.load(function(loader, res){
      self.assets_loaded = true;
      self.loading = false;
      
      //Run callbacks
      self.runCallbacks();

    })
  }

  //only works for horizontal spritesheets
  getFramesFromSpriteSheet(texture, colX, colY, rowStart) {
    let frames = [];


    let frameWidth = Math.round(texture.width/colX);
    let frameHeight = Math.round(texture.height/colY);
    let startY = Math.min(frameHeight * rowStart, texture.height-frameHeight);

    for(let i = 0; i < texture.width-frameWidth; i+=frameWidth) {

      frames.push(new PIXI.Texture(
        texture.baseTexture,
        new PIXI.Rectangle(i, startY, frameWidth, frameHeight))
      );
    } 

    return frames;
  }
}
