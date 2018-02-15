import {
  Component,
  Input,
  Output,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener,
  EventEmitter
} from '@angular/core';

import { PixiService } from '../../providers/pixi.service';

@Component({
  selector: 'renderer',
  template: '<div><canvas #canvas></canvas><ng-content></ng-content></div>'
})
export class RendererComponent {
	@ViewChild('canvas') public canvas: ElementRef;
	@Output() rendererReady = new EventEmitter();
	private cx: CanvasRenderingContext2D;

	@Input() onInit = (() => {
		console.log("Renderer default oninit");
	});
	@Input() height: number;
	@Input() width: number;

	constructor(
		public pixi: PixiService
	){
	}

	ngOnInit(){
		const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

		//Initialize PIXI rendering stuff
		this.pixi.init(this.width, this.height, canvasEl);

		this.onInit();
	}

	// @HostListener('window:resize')
	// resetWidthHeight() {
		// this.height = window.innerHeight;
		// this.width = window.innerWidth;
		// this.pixi.renderer.resize(this.width, this.height);
		// console.log('window resize', this.height, this.width);
	// }

}