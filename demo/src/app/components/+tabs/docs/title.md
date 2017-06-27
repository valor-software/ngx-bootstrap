```typescript
// RECOMMENDED (doesn't work with system.js)
import { TabsModule } from 'ngx-bootstrap/tabs';
// or
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [TabsModule.forRoot(),...]
})
export class AppModule(){} 
```

```html
<tabset>
  <tab heading='Tab 1'>Tab 1 content</tab>
  <tab>
    <template tabHeading>Tab 2</template>
    Tab 2 content
  </tab>
</tabset>
```
