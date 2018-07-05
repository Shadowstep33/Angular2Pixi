import { NgModule } from '@angular/core';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';

import { SpriteComponent } from './components/sprite/sprite.component';
import { MenuComponent } from './components/menu/menu.component';

import { FilterDirective } from './components/filters/filters.directive';

@NgModule({
  declarations: [
    SpriteComponent,
    FilterDirective,
    MenuComponent,
  ],
  imports: [
  ],
  exports: [
    SpriteComponent,
    FilterDirective,
    MenuComponent,
  ],
  providers: [
    AssetService,
    PixiService
  ]
})
export class PixiModule { }