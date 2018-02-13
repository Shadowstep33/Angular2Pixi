import * as PIXI from 'pixi.js';
export declare class FilterComponent {
    filterName: string;
    container: PIXI.Container;
    config: any;
    filter: any;
    filterIndex: number;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
}
