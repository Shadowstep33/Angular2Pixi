import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as PIXI from 'pixi.js';

/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PixiService {

  loader = new PIXI.loaders.Loader();
  app = new PIXI.Application({
  	width: window.innerWidth,
  	height: window.innerHeight,
  	transparent: true,
  	antialias: true
  });
  
	ratio = 0;
	starting_width = 0;
	starting_width_of_window = 0;
	starting_height = 0;
	starting_height_of_window = 0;
	
  renderer: any;
  worldStage: any;
  time = 0;
  last_time = 0;
  
  anim_loop_callbacks = [];
  to_render = [];


  constructor() {
    console.log('Hello Pixi Provider');
  }

  animate(t){
	let self = this;
    this.time = (new Date()).getTime()/1000;

    let deltaTime = this.time - this.last_time;

    if(typeof this.worldStage != "undefined")
    if(this.worldStage){

      for(let s in this.to_render)
        this.to_render[s].update(deltaTime / 60.0);

      for(let c in this.anim_loop_callbacks)
        this.anim_loop_callbacks[c]();

      this.renderer.render(this.worldStage);
    }
    this.last_time = this.time;
	
	requestAnimationFrame( (t) => {
		self.animate(t);
	});
  }

  appendRenderer(id){
    //Add canvas to page
    let el = document.getElementById(id);

    if(el)
    el.appendChild(this.renderer.view);
  }

  sizeCollection(el, args){

    //Get current ratio
    let ratio = this.renderer.width / this.renderer.height;

    //Get current width
    let old_w = this.renderer.width;

    let w = el.width();
    
    //Get new width
    if(typeof args != "undefined")
      w = args.width;

    //Resize to match width
    let perChange = this.worldStage.scale.x * ((old_w - w) / old_w);
    this.renderer.resize(w, window.innerHeight );

    //Scale Stage based on % change of screen width
    this.worldStage.scale.x -= this.worldStage.scale.x * ((old_w - w) / old_w);
    this.worldStage.scale.y = this.worldStage.scale.x;

  }

  init(width, height, el){
    //Initialize game renderer
    if(typeof width == "undefined" || width == 0)
      width = window.innerWidth;

    if(typeof height == "undefined" || height == 0)
      height = window.innerHeight;

    //Initialize game container
    this.renderer = PIXI.autoDetectRenderer({
      width: width,
      height: height,
      transparent: true, 
      autoResize: false, 
      resolution: 1, 
      view: el 
    });
    this.worldStage = new PIXI.Container();

    //Initialize game camera
    let w = this.renderer.width;
    let h = this.renderer.height;

    this.ratio = w/h;
    this.starting_width = w;
    this.starting_width_of_window = w/window.innerWidth;
    this.starting_height = h;
    this.starting_height_of_window = h/window.innerHeight;

    this.animate(0);
  }

}
