import { ElementRef, EventEmitter } from '@angular/core';
import { PixiService } from '../../providers/pixi.service';
export declare class RendererComponent {
    pixi: PixiService;
    canvas: ElementRef;
    rendererReady: EventEmitter<{}>;
    private cx;
    onInit: () => void;
    height: number;
    width: number;
    constructor(pixi: PixiService);
    ngOnInit(): void;
    resetWidthHeight(): void;
}
