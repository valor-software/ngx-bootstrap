```typescript
// RECOMMENDED
import { TabsModule } from 'ng2-bootstrap/tabs';
// or
import { TabsModule } from 'ng2-bootstrap';

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
