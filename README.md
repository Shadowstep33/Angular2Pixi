# Angular2Pixi

Create PIXI scenes in Angular 2 with markup!

# Install

```npm install angular2pixi```

# Getting Started

Include the module in your app

```
import {PixiModule}

@NgModule({
	...
	
  imports: [
	PixiModule
	]
	
	...

```

And voila, you should now have access to the module!


A2P contains a few basic components:

- renderer: used to create the canvas
- sprites: extendable component used to create PIXI.Sprites and support animations and interactions
- text: similar to the sprite component, but uses PIXI.Text instead

and a few services

- pixi: gives access to pixi itself and initializes your Pixi workspace
- scene: utilitarian service for managing scenes
- asset: load up assets and do stuff when they're ready




