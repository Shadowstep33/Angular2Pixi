import { SpriteComponent } from '../sprite/sprite.component';
export declare class TextComponent extends SpriteComponent {
    fontSize: string;
    valueToShow: string;
    constructor();
    ngOnInit(): void;
    addText(text: any): void;
    addInteraction(cb: any): void;
    slowHover(): void;
    hoverUp(): void;
    hoverDown(): void;
    explodeOut(): Promise<{}>;
    ngOnDestroy(): void;
}
