import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'demo-section',
  templateUrl: './demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() name: string;
  @Input() src: string;
  @Input() html: string;
  @Input() ts: string;

  @Input() componentContent: Object;

  @Input()
  get titleDoc(): string {
    return this._titleDoc;
  }

  set titleDoc(value: string) {
    if (this._sanitizer) {
      this._titleDoc = this._sanitizer.sanitize(SecurityContext.HTML, value);
    }
  }

  @Input()
  get doc(): string {
    return this._doc;
  }

  set doc(value: string) {
    if (this._sanitizer) {
      this._doc = this._sanitizer.sanitize(SecurityContext.HTML, value);
    }
  }

  private _doc: string;
  private _titleDoc: string;
  private _sanitizer: DomSanitizer;

  constructor(_sanitizer: DomSanitizer) {
    this._sanitizer = _sanitizer;
  }
}
