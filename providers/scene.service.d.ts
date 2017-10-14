import * as PIXI from 'pixi.js';
/**
*
*	Organization for a Scene (collection of layers and sprites)
*
**/
export declare class SceneService {
    scale: number;
    scaleFactor: number;
    layers: {};
    mainStage: PIXI.Container;
    moveHandlers: {};
    clickHandlers: {};
    constructor();
    init(layers: any): void;
    fadeInScene(scene: any): Promise<{}>;
    fadeOutScene(scene: any): Promise<{}>;
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
}
