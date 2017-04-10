### How to use ngx-bootstrap in Angular2 with AoT compilation using ngc and rollup

The compilation process is described on the official Angular2 website here: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html

Note that you also have to include bootstrap CSS from the official Bootrstrap site or Bootstrap CDN in your index.html HEAD section.
 
#### 1) Install `ngx-bootstrap`

```bash
npm install ngx-bootstrap bootstrap --save
```
 
#### 2) Edit Angular module

Open the module file where you want to include ngx-bootstrap (most probably `app.module.ts`) and import either specific ngx-bootstrap modules by listing them in the import statement and then in the import array of the Angular module

```typescript
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
...

@NgModule({
   ...
   imports: [AlertModule.forRoot(), ModalModule.forRoot(), ... ],
   ... 
})
```

 **NOT RECOMMENDED**: or use Ng2BootstrapModule to import all of the modules at once:

```typescript
import { Ng2BootstrapModule } from 'ngx-bootstrap';
...

@NgModule({
   ...
   imports: [Ng2BootstrapModule.forRoot(), ... ],
   ... 
})
```

#### 3) Edit rollup configuration (rollup-config.js)

You have to use CommonJS rollup plugin, which you should be using anyway due to RxJS. If for some reason not, install it:

```bash
npm install rollup-plugin-commonjs --save --dev
```

Then you have to import the CommonJS plugin, include it in the plugins array and add ngx-bootstrap to the list of modules:

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
				'node_modules/ngx-bootstrap/**'
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
