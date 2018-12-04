## Steps to install and test with [angular-seed](https://github.com/mgechev/angular-seed)

```bash
npm install --save ngx-bootstrap bootstrap
```

### In `project.config.ts`

```typescript
//uncomment this
import { ExtendPackages } from './seed.config.interfaces';

// Add `NPM` third-party libraries to be injected/bundled.
this.NPM_DEPENDENCIES = [
  ...this.NPM_DEPENDENCIES,
  // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
  // {src: 'lodash/lodash.min.js', inject: 'libs'},
  { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
  { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }, // inject into css section
  // Uncomment when using Bootstrap v3. Bootstrap v4 removed bootstrap-theme
  // { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true }, // inject into css section
  // { src: 'bootstrap/dist/css/bootstrap-theme.min.css.map', inject: true }, // inject into css section
];

// *towards the bottom, replace extended packages with this:

const additionalPackages: ExtendPackages[] = [
// required for dev build
{
  name: 'ngx-bootstrap',
  path: 'node_modules/ngx-bootstrap',
  packageMeta: {
    main: 'bundles/ngx-bootstrap.umd.min.js',
    defaultExtension: 'js'
  }
},

// required for prod build
{
  name: 'ngx-bootstrap/*',
  path: 'node_modules/ngx-bootstrap/*',
  packageMeta: {
    main: 'bundles/ngx-bootstrap.umd.min.js',
    defaultExtension: 'js'
  }
}
];
this.addPackagesBundles(additionalPackages);
```

### Verify by adding an alert to the home module and html:

#### In `home.module.ts`:

```typescript
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, AlertModule.forRoot()],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
```

### In `home.component.html`:

```html
    <alert type="success">
      <strong>Well done!</strong> You successfully read this important alert message.
    </alert>
```

**Big thanks to [Keslavi](https://github.com/keslavi) for contributing to this doc**
