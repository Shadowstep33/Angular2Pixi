/// <reference types="pixi.js" />
import 'rxjs/add/operator/map';
import * as PIXI from 'pixi.js';
export declare class PixiService {
    loader: PIXI.loaders.Loader;
    app: PIXI.Application;
    ratio: number;
    starting_width: number;
    starting_width_of_window: number;
    starting_height: number;
    starting_height_of_window: number;
    renderer: any;
    worldStage: any;
    time: number;
    last_time: number;
    anim_loop_callbacks: any[];
    to_render: any[];
    constructor();
    animate(t: any): void;
    appendRenderer(id: any): void;
    sizeCollection(el: any, args: any): void;
    init(w: any, h: any, el: any): void;
}
