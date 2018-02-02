"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const pixi_service_1 = require("./providers/pixi.service");
const asset_service_1 = require("./providers/asset.service");
const renderer_component_1 = require("./components/renderer/renderer.component");
const scene_component_1 = require("./components/scene/scene.component");
const sprite_component_1 = require("./components/sprite/sprite.component");
const text_component_1 = require("./components/text/text.component");
const filters_component_1 = require("./components/filters/filters.component");
let PixiModule = class PixiModule {
};
PixiModule = __decorate([
    core_1.NgModule({
        declarations: [
            renderer_component_1.RendererComponent,
            scene_component_1.SceneComponent,
            sprite_component_1.SpriteComponent,
            text_component_1.TextComponent,
            filters_component_1.FilterComponent
        ],
        imports: [
            platform_browser_1.BrowserModule
        ],
        exports: [
            renderer_component_1.RendererComponent,
            scene_component_1.SceneComponent,
            sprite_component_1.SpriteComponent,
            text_component_1.TextComponent,
            filters_component_1.FilterComponent
        ],
        providers: [
            asset_service_1.AssetService,
            pixi_service_1.PixiService
        ]
    })
], PixiModule);
exports.PixiModule = PixiModule;
//# sourceMappingURL=pixi.module.js.map