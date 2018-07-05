import { NgModule } from '@angular/core';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';

import { SpriteComponent } from './components/sprite/sprite.component';
import { TextComponent } from './components/text/text.component';
import { FilterComponent } from './components/filters/filters.component';
import { MenuComponent } from './components/menu/menu.component';

import { FilterDirective } from './components/filters/filters.directive';

@NgModule({
  declarations: [
    SpriteComponent,
    TextComponent,
    FilterComponent,
    FilterDirective,
    MenuComponent,
  ],
  imports: [
  ],
  exports: [
    SpriteComponent,
    TextComponent,
    FilterComponent,
    FilterDirective,
    MenuComponent,
  ],
  providers: [
    AssetService,
    PixiService
  ]
})
export class PixiModule { }