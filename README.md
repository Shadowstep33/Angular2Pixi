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

# Advanced configuration

## Use `pixi.js-legacy` instead of `pixi.js`

If you want your app to be widely supported (eg. browsers not supporting WebGL), you'll need the legacy build of pixi.js, which can be found in another package.

First, install [pixi.js-legacy](https://www.npmjs.com/package/pixi.js-legacy).

```sh
npm install --save pixi.js-legacy
```

Then, we need to customize our angular *webpack* config using [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) to replace imports of `pixi.js` with imports of `pixi.js-legacy`.

```sh
npm install -save-dev @angular-builders/custom-webpack
```

Edit your `angular.json` to use a custom webpack config:

```json
{
  "projects": {
    "{{example-app}}": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "browserTarget": "{{example-app}}:build"
          }
        }
      }
    }
  }
}
```

Finally, create a file `webpack.config.js` with this content:

```js
const webpack = require('webpack');
const {resolve} = require('path');

module.exports = {
	plugins: [
		new webpack.NormalModuleReplacementPlugin(
            // For every import of `pixi.js`
			/pixi\.js/,
			resource => {
                if(
                    // If the import is not from a node-module (so, from our app code)
                    !resource.context.startsWith(resolve(__dirname, 'node_modules')) ||
                    // Or if the import is from Angular2Pixi
                    resource.context.startsWith(resolve(__dirname, 'node_modules/angular2pixi'))
                ){
                    // Replace the import with the `legacy` build of pixi.
					resource.request = require.resolve('pixi.js-legacy');
				}
				return resource
			}
		),
	]
};
```

You're all set !