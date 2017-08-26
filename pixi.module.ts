import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PixiService } from './pixi.service';
import { AssetService } from './asset.service';
import { SceneService } from './scene.service';

import { RendererComponent } from './components/renderer/renderer.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { TextComponent } from './components/text/text.component';
import { FilterComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    RendererComponent,
    SpriteComponent,
    TextComponent,
	FilterComponent
  ],
  imports: [
	BrowserModule
  ],
  exports: [
	RendererComponent,
	SpriteComponent,
    TextComponent,
	FilterComponent
  ],
  providers: [
	AssetService,
	PixiService,
	SceneService
  ]
})
export class PixiModule { }
