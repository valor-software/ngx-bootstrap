import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-carousel-basic',
  templateUrl: './basic.html'
})
export class DemoCarouseBasicComponent implements AfterViewInit{
  activeSlideIndex = 1;

  constructor(
    private cdr: ChangeDetectorRef
  ){}

  ngAfterViewInit() {
      this.activeSlideIndex = 1;
      this.cdr.detectChanges();
  }
}
