import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'demo-section',
  templateUrl: './demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() public name: string;
  @Input() public src: string;
  @Input() public html: string;
  @Input() public ts: string;

  @Input()
  public get titleDoc(): string {
    return this._titleDoc;
  }

  public set titleDoc(value: string) {
    if (this._sanitizer) {
      this._titleDoc = this._sanitizer
        .sanitize(SecurityContext.HTML, value);
    }
  }

  @Input()
  public get doc(): string {
    return this._doc;
  }

  public set doc(value: string) {
    if (this._sanitizer) {
      this._doc = this._sanitizer
        .sanitize(SecurityContext.HTML, value);
    }
  }

  private _doc: string;
  private _titleDoc: string;
  private _sanitizer: DomSanitizer;

  public constructor(_sanitizer: DomSanitizer) {
    this._sanitizer = _sanitizer;
  }
}
