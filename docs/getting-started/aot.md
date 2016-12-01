### How to use ng2-bootstrap in Angular2 with AoT compilation using ngc and rollup

The compilation process is described on the official Angular2 website here: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html

Note that you also have to include bootstrap CSS from the official Bootrstrap site or Bootstrap CDN in your index.html HEAD section.
 
#### 1) Install `ng2-bootstrap`

```bash
npm install ng2-bootstrap bootstrap --save
```
 
#### 2) Edit Angular 2 module

Open the module file where you want to include ng2-bootstrap (most probably `app.module.ts`) and import either specific ng2-bootstrap modules by listing them in the import statement and then in the import array of the Angular 2 module

```typescript
import { AlertModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
...

@NgModule({
   ...
   imports: [AlertModule, ModalModule, ... ],
   ... 
})
```

 or use Ng2BootstrapModule to import all of the modules at once:

```typescript
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
...

@NgModule({
   ...
   imports: [Ng2BootstrapModule, ... ],
   ... 
})
```

#### 3) Edit rollup configuration (rollup-config.js)

You have to use CommonJS rollup plugin, which you should be using anyway due to RxJS. If for some reason not, install it:

```bash
npm install rollup-plugin-commonjs --save --dev
```

Then you have to import the CommonJS plugin, include it in the plugins array and add ng2-bootstrap to the list of modules:

```javascript
...
import commonjs from 'rollup-plugin-commonjs';
...

//paths are relative to the execution path
export default {
	...
	plugins: [
		...
		commonjs({
			include: [
				'node_modules/rxjs/**',
				'node_modules/ng2-bootstrap/**'
			]
		}),
		...
	]
}
```

#### 4) Run compilation the standard way

e.g.

```bash
ngc -p tsconfig-aot.json
rollup -c rollup-config.js
```
