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
  selector: 'filter-effect',
  template: '<span></span>'
})
export class FilterComponent {

  @Input() filterName: string = null;
  @Input() container: PIXI.Container = null;
  @Input() config: any = {};

  filter: any;
  filterIndex: number;
  
  constructor() {
  }

  ngOnInit(){
    switch(this.filterName){
		case 'blur':
			this.filter = new PIXI.filters.BlurFilter();
			
			for(var c in this.config)
				this.filter[c] = this.config[c];
				
			break;
	}
	
	console.log(this.container);
	
	if(this.container.filters)
		this.container.filters.push( this.filter );
	else
		this.container.filters = [ this.filter ];
		
	this.filterIndex = this.container.filters.length - 1;
  }

  ngOnDestroy(){
	this.container.filters.splice( this.filterIndex, 1 );
  }
}
