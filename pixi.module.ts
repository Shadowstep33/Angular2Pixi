import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';
import { SceneService } from './providers/scene.service';

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
	FilterComponent,
	AssetService,
	PixiService,
	SceneService
  ],
  providers: [
	AssetService,
	PixiService,
	SceneService
  ]
})
export class PixiModule { }
