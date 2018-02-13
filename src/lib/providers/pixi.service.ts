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

    var deltaTime = this.time - this.last_time;

    if(typeof this.worldStage != "undefined")
    if(this.worldStage){

      for(var s in this.to_render)
        this.to_render[s].update(deltaTime / 60.0);

      for(var c in this.anim_loop_callbacks)
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
    var el = document.getElementById(id);

    if(el)
    el.appendChild(this.renderer.view);
  }

  sizeCollection(el, args){

    //Get current ratio
    var ratio = this.renderer.width / this.renderer.height;

    //Get current width
    var old_w = this.renderer.width;

    //Get new width
    if(typeof args == "undefined")
      var w = el.width();
    else
      var w = args.width;

    //Resize to match width
    var perChange = this.worldStage.scale.x * ((old_w - w) / old_w);
    this.renderer.resize(w, window.innerHeight );

    //Scale Stage based on % change of screen width
    this.worldStage.scale.x -= this.worldStage.scale.x * ((old_w - w) / old_w);
    this.worldStage.scale.y = this.worldStage.scale.x;

  }

  init(w,h, el){
    //Initialize game renderer
    if(typeof w == "undefined" || w == 0)
      w = window.innerWidth;

    if(typeof h == "undefined" || h == 0)
      h = window.innerHeight;

    //Initialize game container
    this.renderer = PIXI.autoDetectRenderer({
		width: w,
		height: h,
		transparent: true, 
		autoResize: false, 
		resolution: 1, 
		view: el 
	});
    this.worldStage = new PIXI.Container();

    //Initialize game camera
    var w = this.renderer.width;
    var h = this.renderer.height;

    this.ratio = w/h;
    this.starting_width = w;
    this.starting_width_of_window = w/window.innerWidth;
    this.starting_height = h;
    this.starting_height_of_window = h/window.innerHeight;

    this.animate(0);
  }

}
