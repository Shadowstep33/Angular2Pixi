import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AssetService, PixiService } from './providers';

import { FilterComponent, RendererComponent, SceneComponent, SpriteComponent, TextComponent } from './components';

const PIXI_DIRECTIVES = [
	RendererComponent,
	SceneComponent,
	SpriteComponent,
	TextComponent,
	FilterComponent
];

@NgModule({
	declarations: PIXI_DIRECTIVES,
	exports: PIXI_DIRECTIVES,
	providers: [AssetService, PixiService],
})
export class PixiModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PixiModule,
			providers: [
				AssetService,
				PixiService,
				// { provide: MyService, useFactory: InitMyService, deps:[Router, Items] }
			]
		};
	}
}

export {AssetService, PixiService, FilterComponent, RendererComponent, SceneComponent, SpriteComponent, TextComponent };
