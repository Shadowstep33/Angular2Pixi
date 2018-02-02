import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PixiService } from './src/providers/pixi.service';
import { AssetService } from './src/providers/asset.service';

import { RendererComponent } from './src/components/renderer/renderer.component';
import { SceneComponent } from './src/components/scene/scene.component';
import { SpriteComponent } from './src/components/sprite/sprite.component';
import { TextComponent } from './src/components/text/text.component';
import { FilterComponent } from './src/components/filters/filters.component';

@NgModule({
  declarations: [
    RendererComponent,
    SceneComponent,
    SpriteComponent,
    TextComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    RendererComponent,
    SceneComponent,
    SpriteComponent,
    TextComponent,
    FilterComponent
  ],
  providers: [
    AssetService,
    PixiService
  ]
})
export class PixiModule { }

export * from './src/pixi.module';
export * from './src/providers';
export * from './src/components';
