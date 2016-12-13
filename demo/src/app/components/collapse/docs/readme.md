### Annotations
```typescript
// class Collapse
@Directive({ selector: '[collapse]' })
export class CollapseDirective {
  @Input() public set collapse(value:boolean) {}
}
```

### Collapse properties
- `collapse` (`boolean=false`) - if `false` collapse block will be expanded
