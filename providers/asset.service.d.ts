/// <reference types="pixi.js" />
import 'rxjs/add/operator/map';
import * as PIXI from 'pixi.js';
export declare class AssetService {
    loader: PIXI.loaders.Loader;
    loading: boolean;
    assets_loaded: boolean;
    callbacks: {};
    constructor();
    init(): void;
    registerCallback(id: any, fn: any): void;
    deregisterCallback(id: any): void;
    runCallbacks(): void;
    loadAssets(): void;
    getFramesFromSpriteSheet(texture: any, colX: any, colY: any, rowStart: any): any[];
}
