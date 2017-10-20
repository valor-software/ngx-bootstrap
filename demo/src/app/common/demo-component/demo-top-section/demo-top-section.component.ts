import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentSection } from '../../../models/content-section.model';

@Component({
  selector: 'demo-top-section',
  templateUrl: './demo-top-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoTopSectionComponent {
  constructor(public section: ContentSection) {}
}
