# ngx-bootstrap in Angular with AoT compilation using `ngc` and `rollup`

The compilation process described on the [official Angular2 website](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)

Note that you also have to include bootstrap CSS from the official Bootstrap site or Bootstrap CDN in your index.html HEAD section.

## 1. Install `ngx-bootstrap`

```bash
npm install ngx-bootstrap bootstrap --save
```

## 2. Edit Angular module

Open the module file where you want to include ngx-bootstrap (most probably `app.module.ts`) and import either specific ngx-bootstrap modules by listing them in the import statement. Then in the import array of the Angular module add:

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

## 3. Edit rollup configuration (rollup-config.js)

When using RxJS, remember to use CommonJS rollup plugin. If not installed, install it by:

```bash
npm install rollup-plugin-commonjs --save --dev
```

Then, import the CommonJS plugin, include it in the plugins array and add ngx-bootstrap to the list of modules:

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

## 4. Run compilation the usual way

e.g.:

```bash
ngc -p tsconfig-aot.json
rollup -c rollup-config.js
```
