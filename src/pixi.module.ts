import { NgModule } from '@angular/core';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';

import { RendererComponent } from './components/renderer/renderer.component';
import { SceneComponent } from './components/scene/scene.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { TextComponent } from './components/text/text.component';
import { FilterComponent } from './components/filters/filters.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    RendererComponent,
    SceneComponent,
    SpriteComponent,
    TextComponent,
    FilterComponent,
    MenuComponent,
  ],
  imports: [
  ],
  exports: [
    RendererComponent,
    SceneComponent,
    SpriteComponent,
    TextComponent,
    FilterComponent,
    MenuComponent,
  ],
  providers: [
    AssetService,
    PixiService
  ]
})
export class PixiModule { }