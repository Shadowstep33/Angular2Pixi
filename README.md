# Angular2Pixi

Create PIXI scenes in Angular 2 with markup!

# Install

```npm install angular2pixi```

# Dependencies

A2P has two main dependencies that should automatically be installed

- GSAP
- PIXI.js

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

# Simple Example

```
	<renderer #renderer [width]="w" [height]="h">
		<home-scene
		[renderer]="renderer"
		(stageUpdated)="homeSceneReady($event)">
			
			<sprite
				[x]="w * 0.5"
				[y]="h * 0.6"
				imgUrl="./assets/demo/person.png"
				*ngIf="homeScene"
				scale="1"
				[container]="homeScene.layers.hud"
			></sprite>
			
		</home-scene>
	</renderer>
```
The above example is the core methodology to follow. Essentially, it:

- creates the pixi renderer
- creates a scene on that renderer (from a custom defined component called home-scene)
- adds a sprite to that scene

Now, there is something subtle but very important happening. stageUpdated accepts a function and passes it access to the scene object that gets created. 

```	homeSceneReady(scene){
		console.log(scene);
		this.homeScene = scene;
	}```
	
This allows you to modify the scene from the parent component. 