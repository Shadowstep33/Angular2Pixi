import { NgModule } from '@angular/core';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';

import { SpriteComponent } from './components/sprite/sprite.component';
import { FilterComponent } from './components/filters/filters.component';
import { MenuComponent } from './components/menu/menu.component';

import { FilterDirective } from './components/filters/filters.directive';

@NgModule({
  declarations: [
    SpriteComponent,
    FilterComponent,
    FilterDirective,
    MenuComponent,
  ],
  imports: [
  ],
  exports: [
    SpriteComponent,
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