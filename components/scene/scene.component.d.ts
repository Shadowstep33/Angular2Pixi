import { EventEmitter } from '@angular/core';
import * as PIXI from 'pixi.js';
import { RendererComponent } from '../renderer/renderer.component';
/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/
export declare class SceneComponent {
    scale: number;
    scaleFactor: number;
    layers: {};
    mainStage: PIXI.Container;
    renderer: RendererComponent;
    stageUpdated: EventEmitter<{}>;
    moveHandlers: {};
    clickHandlers: {};
    constructor();
    init(layers: any): void;
    fadeInScene(): Promise<{}>;
    fadeOutScene(): Promise<{}>;
    blurScene(scene: any): void;
    registerHandler(eventStr: any, id: any, fn: any): void;
    deregisterCallback(eventStr: any, id: any): void;
    stageClick(data: any): void;
    /**
    *	Wipe all layers of children
    *
    **/
    wipe(): void;
    unload(): void;
    resizeStage(): void;
}
