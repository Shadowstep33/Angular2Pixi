import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as PIXI from 'pixi.js';

/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AssetService {

  loader = new PIXI.loaders.Loader();
  loading = false;
  assets_loaded = false;
  callbacks = {};

  constructor() {
    console.log('Hello Asset Provider');
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
    for(var c in this.callbacks){
      this.callbacks[c]();
    }
  }

  loadAssets(){
	let self = this;
	
    self.loader.load();

    self.loader.once("complete",function(res){
      self.assets_loaded = true;
      self.loading = false;
      console.log("Assets Loaded");

      //Run callbacks
      self.runCallbacks();

    })

    self.loader.on("progress", function(){
      self.loading = true;
    });
  }

  //only works for horizontal spritesheets
  getFramesFromSpriteSheet(texture, colX, colY, rowStart) {
    var frames = [];


    var frameWidth = Math.round(texture.width/colX);
    var frameHeight = Math.round(texture.height/colY);
    var startY = Math.min(frameHeight * rowStart, texture.height-frameHeight);

    for(var i = 0; i < texture.width-frameWidth; i+=frameWidth) {

      frames.push(new PIXI.Texture(
        texture.baseTexture,
        new PIXI.Rectangle(i, startY, frameWidth, frameHeight))
      );
    } 

    return frames;
  }
}
