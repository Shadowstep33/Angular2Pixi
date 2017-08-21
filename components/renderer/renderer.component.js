"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let RendererComponent = class RendererComponent {
    constructor(pixi) {
        this.pixi = pixi;
        this.rendererReady = new core_1.EventEmitter();
        this.onInit = (() => {
            console.log("Renderer default oninit");
        });
    }
    ngOnInit() {
        const canvasEl = this.canvas.nativeElement;
        //Initialize PIXI rendering stuff
        this.pixi.init(this.width, this.height, canvasEl);
        this.onInit();
    }
    resetWidthHeight() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        console.log('window resize', this.height, this.width);
    }
};
__decorate([
    core_1.ViewChild('canvas')
], RendererComponent.prototype, "canvas", void 0);
__decorate([
    core_1.Output()
], RendererComponent.prototype, "rendererReady", void 0);
__decorate([
    core_1.Input()
], RendererComponent.prototype, "onInit", void 0);
__decorate([
    core_1.Input()
], RendererComponent.prototype, "height", void 0);
__decorate([
    core_1.Input()
], RendererComponent.prototype, "width", void 0);
__decorate([
    core_1.HostListener('window:resize')
], RendererComponent.prototype, "resetWidthHeight", null);
RendererComponent = __decorate([
    core_1.Component({
        selector: 'renderer',
        template: '<div><canvas #canvas style="background-image: url(./assets/demo/sky-layer.png) !important"></canvas><ng-content></ng-content></div>'
    })
], RendererComponent);
exports.RendererComponent = RendererComponent;
