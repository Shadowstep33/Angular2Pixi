# Angular2Pixi

Create PIXI scenes in Angular 2 with markup! Make sure to check out the [wiki](https://github.com/Shadowstep33/Angular2Pixi/wiki) for more information on usage. There is also a repo with working demos found at: https://github.com/Shadowstep33/a2p-demos

# Install

```npm install --save angular2pixi```

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

- sprites: extendable component used to create PIXI.Sprites and support animations and interactions
- text: similar to the sprite component, but uses PIXI.Text instead
- filters: allows you to add effects to Containers

and a few services

- pixi: gives access to pixi itself and initializes your Pixi workspace
- asset: load up assets and do stuff when they're ready

# Simple Example

```
<sprite
	[x]="w * 0.5"
	[y]="h * 0.6"
	imgUrl="./assets/demo/person.png"
	*ngIf="homeScene"
	scale="1"
	[container]="homeScene.layers.hud"
></sprite>
```

Please refer to the wiki for more details.
