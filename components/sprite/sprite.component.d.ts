import * as PIXI from 'pixi.js';
export declare class SpriteComponent {
    handleClick: any;
    imgUrl: string;
    scale: number;
    font: string;
    interactive: boolean;
    x: number;
    y: number;
    text: string;
    container: PIXI.Container;
    anim: string;
    spriteStage: PIXI.Container;
    textSpr: PIXI.Text;
    spriteObject: PIXI.Sprite;
    constructor();
    ngOnInit(): void;
    addSprite(img: any): void;
    addText(text: any): void;
    addInteraction(cb: any): void;
    slowHover(): void;
    hoverUp(): void;
    hoverDown(): void;
    explodeOut(): Promise<{}>;
    ngOnDestroy(): void;
}
