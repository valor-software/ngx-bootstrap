import { Component, Input, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { SliderHelpers } from './slider.helpers';

@Component({
  selector: 'slider',
  template: `
    <div #sliderElem (mouseenter)="showTooltip()" (mouseleave)="hideTooltip()" (mousedown)='onMouseDown($event)' class='slider slider-{{ orientation }}'>
      <div class='slider-track'>
        <div #trackLow class='slider-track-low' [ngClass]="{hide: (type === 'slider' || selection === 'none' || selection === 'after')}"></div>
        <div #trackSelection class='slider-selection' [ngClass]="{hide: (selection === 'none')}"></div>
        <div #trackHigh class='slider-track-high' [ngClass]="{hide: (selection === 'none' || selection === 'before')}"></div>
      </div>
      <div #tooltipMain class="tooltip tooltip-main {{ tooltipPosition }}" role="presentation">
        <div class="tooltip-arrow"></div>
        <div #tooltipMainInner class="tooltip-inner">Current value: {{ value }}</div>
      </div>
      <div #tooltipMin class="tooltip tooltip-min {{ tooltipPosition }}" role="presentation">
        <div class="tooltip-arrow"></div>
        <div #tooltipMinInner class="tooltip-inner"></div>
      </div>
      <div #tooltipMax class="tooltip tooltip-max {{ tooltipPosition }}" role="presentation">
        <div class="tooltip-arrow"></div>
        <div #tooltipMaxInner class="tooltip-inner"></div>
      </div>
      <div #minHandle tabindex="0" (keydown)="keydown(0, $event)" (focus)="showTooltip()" (blur)="hideTooltip()" class='slider-handle min-slider-handle {{ handleType }}' role='slider'></div>
      <div #maxHandle tabindex="0" (keydown)="keydown(1, $event)" (focus)="showTooltip()" (blur)="hideTooltip()" class='slider-handle max-slider-handle {{ handleType }}' [ngClass]="{hide: type === 'slider'}" role='slider'></div>
    </div>
  `
})
export class SliderComponent implements AfterViewInit {
  @Input() public animate: boolean;
  @Input() public enabled: boolean = true;
  @Input() public reversed: boolean;
  @Input() public selection: string = 'before';
  @Input() public touchCapable: boolean = true;
  @Input() public handleType: string = 'round';
  @Input() public type: string = 'slider';
  @Input() public orientation: string = 'horizontal';
  @Input() public tooltipPosition: string = 'top';
  @Input() public tooltipSplit: boolean;
  @Input() public tooltipMode: string = 'hover';
  @ViewChild('sliderElem') private sliderElem: ElementRef;
  @ViewChild('minHandle') private minHandle: ElementRef;
  @ViewChild('maxHandle') private maxHandle: ElementRef;
  @ViewChild('trackHigh') private trackHigh: ElementRef;
  @ViewChild('trackSelection') private trackSelection: ElementRef;
  @ViewChild('trackLow') private trackLow: ElementRef;
  @ViewChild('tooltipMain') private tooltipMain: ElementRef;
  @ViewChild('tooltipMainInner') private tooltipMainInner: ElementRef;
  @ViewChild('tooltipMin') private tooltipMin: ElementRef;
  @ViewChild('tooltipMinInner') private tooltipMinInner: ElementRef;
  @ViewChild('tooltipMax') private tooltipMax: ElementRef;
  @ViewChild('tooltipMaxInner') private tooltipMaxInner: ElementRef;
  private offset: any;
  private dragged: number;
  private percentage: Array<number> = [];
  private size: any;
  private stylePos: string;
  private mousePos: string;
  private sizePos: string;
  private inDrag: boolean;
  private over: boolean;
  private mouseUpReference: any;
  private mouseMoveReference: any;
  private eventRemoveCallback: any = {};
  private _value: Array<number>;
  private _max: number = 100;
  private _min: number = 0;
  private _step: number = 1;

  public constructor(private renderer: Renderer) {
  }

  public ngAfterViewInit(): void {
    if (this.orientation === 'vertical') {
      this.stylePos = 'top';
      this.mousePos = 'pageY';
      this.sizePos = 'offsetHeight';
      if (this.tooltipPosition === 'top' || this.tooltipPosition === 'bottom') {
        this.tooltipPosition = 'right';
      }
    } else {
      this.stylePos = 'left';
      this.mousePos = 'pageX';
      this.sizePos = 'offsetWidth';
      if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
        this.tooltipPosition = 'top';
      }
    }

    if (!Array.isArray(this._value)) {
      this._value = [this._value as number];
    }

    this.value = this._value;
  }

  @Input()
  public get max(): number {
    return this._max;
  }

  public set max(val: number) {
    this._max = val;
    if (this._value) {
      this.value = this.value;
      this.layout();
    }
  }

  @Input()
  public get min(): number {
    return this._min;
  }

  public set min(val: number) {
    this._min = val;
    if (this._value) {
      this.value = this.value;
      this.layout();
    }
  }

  @Input()
  public get step(): number {
    return this._step;
  }

  public set step(val: number) {
    this._step = val;
    if (this._value) {
      this.value = this.value;
      this.layout();
    }
  }

  @Input()
  public get value(): any {
    return this.type === 'range' ? this._value : this._value[0];
  }

  public set value(val: any) {
    if (!val) {
      val = 0;
    }
    if (this.type === 'slider' && Array.isArray(val)) {
      val = val[0];
    }

    // const oldValue = this.getValue();
    this._value = SliderHelpers.validateInputValue(val);

    if (this.type === 'range') {
      this._value[0] = this.applyPrecision(this._value[0]);
      this._value[1] = this.applyPrecision(this._value[1]);

      this._value[0] = Math.max(this.min, Math.min(this.max, this._value[0]));
      this._value[1] = Math.max(this.min, Math.min(this.max, this._value[1]));
      this.renderer.setElementClass(this.maxHandle.nativeElement, 'hide', false);
    } else {
      val = this.applyPrecision(val);
      this._value = [Math.max(this.min, Math.min(this.max, val))];

      this.renderer.setElementClass(this.maxHandle.nativeElement, 'hide', true);
      if (this.selection === 'after') {
        this._value[1] = this.max;
      } else {
        this._value[1] = this.min;
      }
    }

    if (this.max > this.min) {
      this.percentage = [
        this.toPercentage(this._value[0]),
        this.toPercentage(this._value[1]),
        this.step * 100 / (this.max - this.min)
      ];
    } else {
      this.percentage = [0, 0, 100];
    }
    this.layout();

    /*
     FIXME
     let newValue = this.type === 'range' ? this._value : this._value[0];

     if(triggerSlideEvent === true) {
     this.trigger('slide', newValue);
     }
     if( (oldValue !== newValue) && (triggerChangeEvent === true) ) {
     this.trigger('change', {
     oldValue: oldValue,
     newValue: newValue
     });
     }*/
  }

  protected showTooltip(): void {
    if (this.tooltipSplit) {
      this.renderer.setElementClass(this.tooltipMain.nativeElement, 'in', false);
      this.renderer.setElementClass(this.tooltipMin.nativeElement, 'in', true);
      this.renderer.setElementClass(this.tooltipMax.nativeElement, 'in', true);

    } else {
      this.renderer.setElementClass(this.tooltipMain.nativeElement, 'in', true);
      this.renderer.setElementClass(this.tooltipMin.nativeElement, 'in', false);
      this.renderer.setElementClass(this.tooltipMax.nativeElement, 'in', false);
    }
    this.over = true;
  }

  protected hideTooltip(force: boolean = false): void {
    if ((!this.inDrag && this.tooltipMode !== 'always') || force) {
      this.renderer.setElementClass(this.tooltipMain.nativeElement, 'in', false);
      this.renderer.setElementClass(this.tooltipMin.nativeElement, 'in', false);
      this.renderer.setElementClass(this.tooltipMax.nativeElement, 'in', false);
    }
    this.over = false;
  }

  protected onMouseDown(event: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    this.offset = this.calculateOffset(this.sliderElem.nativeElement);
    this.size = this.sliderElem.nativeElement[this.sizePos];

    const percentage = this.getPercentage(event);
    if (this.type === 'range') {
      const diff1: number = Math.abs(this.percentage[0] - percentage);
      const diff2: number = Math.abs(this.percentage[1] - percentage);
      this.dragged = (diff1 < diff2) ? 0 : 1;
      this.adjustPercentageForRangeSliders(percentage);
    } else {
      this.dragged = 0;
    }
    this.percentage[this.dragged] = percentage;
    this.layout();

    this.mouseMoveReference = this.onMouseMove.bind(this);
    this.mouseUpReference = this.onMouseUp.bind(this);

    if (this.eventRemoveCallback['touchmove']) {
      this.eventRemoveCallback['touchmove']();
    }

    if (this.eventRemoveCallback['touchend']) {
      this.eventRemoveCallback['touchend']();
    }

    if (this.eventRemoveCallback['mousemove']) {
      this.eventRemoveCallback['mousemove']();
    }
    if (this.eventRemoveCallback['mouseup']) {
      this.eventRemoveCallback['mouseup']();
    }

    if (this.touchCapable) {
      // Touch: Bind touch events:
      this.eventRemoveCallback['touchmove'] = this.renderer.listenGlobal('document', 'touchmove', this.mouseMoveReference);
      this.eventRemoveCallback['touchend'] = this.renderer.listenGlobal('document', 'touchend', this.mouseUpReference);
    }
    // Bind mouse events:
    this.eventRemoveCallback['mousemove'] = this.renderer.listenGlobal('document', 'mousemove', this.mouseMoveReference);
    this.eventRemoveCallback['mouseup'] = this.renderer.listenGlobal('document', 'mouseup', this.mouseUpReference);

    this.inDrag = true;
    const newValue = this.calculateValue(false);

    // this._trigger('slideStart', newValue);

    this.value = newValue; // , false, true);

    SliderHelpers.pauseEvent(event);

    return true;
  }

  protected keydown(handleIdx: number, ev: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    let dir: number;
    switch ((ev as any).keyCode) {
      case 37: // left
      case 40: // down
        dir = -1;
        break;
      case 39: // right
      case 38: // up
        dir = 1;
        break;
      default: return;
    }

    // use natural arrow keys instead of from min to max
    const ifVerticalAndNotReversed = (this.orientation === 'vertical' && !this.reversed);
    const ifHorizontalAndReversed = (this.orientation === 'horizontal' && this.reversed);

    if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
      dir = -dir;
    }

    let val: any;
    if (this.type === 'range') {
      val = this.value[handleIdx] + dir * this.step;
      val = [(!handleIdx) ? val : this.value[0],
        ( handleIdx) ? val : this.value[1]];
    } else {
      val = this.value + dir * this.step;
    }

    this.value = val;

    SliderHelpers.pauseEvent(ev);

    return false;
  }

  private onMouseMove(event: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    const percentage = this.getPercentage(event);
    this.adjustPercentageForRangeSliders(percentage);
    this.percentage[this.dragged] = percentage;
    this.layout();

    this.value = this.calculateValue(true);

    return false;
  }

  private onMouseUp(): boolean {
    if (!this.enabled) {
      return false;
    }

    if (this.eventRemoveCallback['touchmove']) {
      this.eventRemoveCallback['touchmove']();
    }

    if (this.eventRemoveCallback['touchend']) {
      this.eventRemoveCallback['touchend']();
    }

    if (this.eventRemoveCallback['mousemove']) {
      this.eventRemoveCallback['mousemove']();
    }
    if (this.eventRemoveCallback['mouseup']) {
      this.eventRemoveCallback['mouseup']();
    }

    this.inDrag = false;
    if (this.over === false) {
      this.hideTooltip();
    }

    this.value = this.calculateValue(true);

    return false;
  }

  private layout(): void {
    let positionPercentages: Array<number>;

    if (this.tooltipMode === 'always') {
      this.showTooltip();
    }

    if (this.reversed) {
      positionPercentages = [100 - this.percentage[0], this.type === 'range' ? 100 - this.percentage[1] : this.percentage[1]];
    } else {
      positionPercentages = [this.percentage[0], this.percentage[1]];
    }

    this.renderer.setElementStyle(this.minHandle.nativeElement, this.stylePos, positionPercentages[0] + '%');
    this.renderer.setElementStyle(this.maxHandle.nativeElement, this.stylePos, positionPercentages[1] + '%');

    this.setTooltipPosition();
    /* Position highlight range elements */
    /*
     if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
     for (let i = 0; i < this.options.rangeHighlights.length; i++) {
     let startPercent = this._toPercentage(this.options.rangeHighlights[i].start);
     let endPercent = this._toPercentage(this.options.rangeHighlights[i].end);

     let currentRange = this.createHighlightRange(startPercent, endPercent);

     if (currentRange) {
     if (this.orientation === 'vertical') {
     this.rangeHighlightElements[i].style.top = `${currentRange.start}%`;
     this.rangeHighlightElements[i].style.height = `${currentRange.size}%`;
     } else {
     this.rangeHighlightElements[i].style.left = `${currentRange.start}%`;
     this.rangeHighlightElements[i].style.width = `${currentRange.size}%`;
     }
     } else {
     this.rangeHighlightElements[i].style.display = 'none';
     }
     }
     }*/

    /* Position ticks and labels */
    /*
     if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {

     let styleSize = this.orientation === 'vertical' ? 'height' : 'width';
     let styleMargin = this.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
     let labelSize = this.size / (this.options.ticks.length - 1);

     if (this.tickLabelContainer) {
     let extraMargin = 0;
     if (this.options.ticks_positions.length === 0) {
     if (this.orientation !== 'vertical') {
     this.tickLabelContainer.style[styleMargin] = -labelSize/2 + 'px';
     }

     extraMargin = this.tickLabelContainer.offsetHeight;
     } else {
     // Chidren are position absolute, calculate height by finding the max offsetHeight of a child
     for (i = 0 ; i < this.tickLabelContainer.childNodes.length; i++) {
     if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
     extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
     }
     }
     }
     if (this.orientation === 'horizontal') {
     this.sliderElem.nativeElement.style.marginBottom = extraMargin + 'px';
     }
     }

     for (let i = 0; i < this.options.ticks.length; i++) {

     let percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);

     if (this.reversed) {
     percentage = 100 - percentage;
     }

     this.ticks[i].style[this.stylePos] = percentage + '%';

     // Set class labels to denote whether ticks are in the selection
     this._removeClass(this.ticks[i], 'in-selection');
     if (this.type !== 'range') {
     if (this.options.selection === 'after' && percentage >= positionPercentages[0]){
     this._addClass(this.ticks[i], 'in-selection');
     } else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
     this._addClass(this.ticks[i], 'in-selection');
     }
     } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
     this._addClass(this.ticks[i], 'in-selection');
     }

     if (this.tickLabels[i]) {
     this.tickLabels[i].style[styleSize] = labelSize + 'px';

     if (this.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
     this.tickLabels[i].style.position = 'absolute';
     this.tickLabels[i].style[this.stylePos] = percentage + '%';
     this.tickLabels[i].style[styleMargin] = -labelSize/2 + 'px';
     } else if (this.orientation === 'vertical') {
     this.tickLabels[i].style['marginLeft'] =  this.sliderElem.nativeElement.offsetWidth + 'px';
     this.tickLabelContainer.style['marginTop'] = this.sliderElem.nativeElement.offsetWidth / 2 * -1 + 'px';
     }
     }
     }

     }
     */

    let formattedTooltipVal: string = SliderHelpers.formatter(this.value);
    this.setText(this.tooltipMainInner.nativeElement, formattedTooltipVal);
    if (this.type === 'range') {
      this.tooltipMain.nativeElement.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + '%';

      if (this.orientation === 'vertical') {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }

      if (this.orientation === 'vertical') {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }

      let innerTooltipMinText = SliderHelpers.formatter(this.value[0]);
      this.setText(this.tooltipMinInner.nativeElement, innerTooltipMinText);

      let innerTooltipMaxText = SliderHelpers.formatter(this.value[1]);
      this.setText(this.tooltipMaxInner.nativeElement, innerTooltipMaxText);

      this.tooltipMin.nativeElement.style[this.stylePos] = positionPercentages[0] + '%';

      if (this.orientation === 'vertical') {
        this.renderer.setElementStyle(this.tooltipMin.nativeElement, 'margin-top', -this.tooltipMin.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this.renderer.setElementStyle(this.tooltipMin.nativeElement, 'margin-left', -this.tooltipMin.nativeElement.offsetWidth / 2 + 'px');
      }

      this.tooltipMax.nativeElement.style[this.stylePos] = positionPercentages[1] + '%';

      if (this.orientation === 'vertical') {
        this.renderer.setElementStyle(this.tooltipMax.nativeElement, 'margin-top', -this.tooltipMax.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this.renderer.setElementStyle(this.tooltipMax.nativeElement, 'margin-left', -this.tooltipMax.nativeElement.offsetWidth / 2 + 'px');
      }

    } else {
      this.tooltipMain.nativeElement.style[this.stylePos] = positionPercentages[0] + '%';
      if (this.orientation === 'vertical') {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this.renderer.setElementStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }
    }

    if (this.orientation === 'vertical') {
      this.renderer.setElementStyle(this.trackLow.nativeElement, 'top', '0');
      this.renderer.setElementStyle(this.trackLow.nativeElement, 'height', Math.min(positionPercentages[0], positionPercentages[1]) + '%');

      this.renderer.setElementStyle(this.trackSelection.nativeElement, 'top', Math.min(positionPercentages[0], positionPercentages[1]) + '%');
      this.renderer.setElementStyle(this.trackSelection.nativeElement, 'height', Math.abs(positionPercentages[0] - positionPercentages[1]) + '%');

      this.renderer.setElementStyle(this.trackHigh.nativeElement, 'bottom', '0');
      this.renderer.setElementStyle(this.trackHigh.nativeElement, 'height', (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%');
    } else {
      this.renderer.setElementStyle(this.trackLow.nativeElement, 'left', '0');
      this.renderer.setElementStyle(this.trackLow.nativeElement, 'width', Math.min(positionPercentages[0], positionPercentages[1]) + '%');

      this.renderer.setElementStyle(this.trackSelection.nativeElement, 'left', Math.min(positionPercentages[0], positionPercentages[1]) + '%');
      this.renderer.setElementStyle(this.trackSelection.nativeElement, 'width', Math.abs(positionPercentages[0] - positionPercentages[1]) + '%');

      this.renderer.setElementStyle(this.trackHigh.nativeElement, 'right', '0');
      this.renderer.setElementStyle(this.trackHigh.nativeElement, 'width', (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%');

      let offset_min = this.tooltipMin.nativeElement.getBoundingClientRect();
      let offset_max = this.tooltipMax.nativeElement.getBoundingClientRect();

      if (this.tooltipPosition === 'bottom') {
        if (offset_min.right > offset_max.left) {
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'bottom', false);
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'top', true);
          this.tooltipMax.nativeElement.style.top = '';
          this.tooltipMax.nativeElement.style.bottom = 22 + 'px';
        } else {
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'top', false);
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'bottom', true);
          this.tooltipMax.nativeElement.style.top = this.tooltipMin.nativeElement.style.top;
          this.tooltipMax.nativeElement.style.bottom = '';
        }
      } else {
        if (offset_min.right > offset_max.left) {
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'top', false);
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'bottom', true);
          this.tooltipMax.nativeElement.style.top = 18 + 'px';
        } else {
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'bottom', false);
          this.renderer.setElementClass(this.tooltipMax.nativeElement, 'top', true);
          this.tooltipMax.nativeElement.style.top = this.tooltipMin.nativeElement.style.top;
        }
      }
    }
  }

  private setText(element: any, text: string): void {
    if (typeof element.textContent !== 'undefined') {
      element.textContent = text;
    } else if (typeof element.innerText !== 'undefined') {
      element.innerText = text;
    }
  }

  private offsetLeft(obj: any): number {
    return obj.getBoundingClientRect().left;
  }

  private offsetTop(obj: any): number {
    let offsetTop = obj.offsetTop;
    obj = obj.offsetParent;
    while (obj && !isNaN(obj.offsetTop)) {
      offsetTop += obj.offsetTop;
      if (obj.tagName !== 'BODY') {
        offsetTop -= obj.scrollTop;
      }
      obj = obj.offsetParent;
    }
    return offsetTop;
  }

  private calculateOffset(obj: any): any {
    return {
      left: this.offsetLeft(obj),
      top: this.offsetTop(obj)
    };
  }

  private getPercentage(ev: Event): number {
    if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
      ev = ((ev as any).touches[0] as Event);
    }

    const eventPosition: number = (ev as any)[this.mousePos];
    const sliderOffset: number = this.offset[this.stylePos];
    const distanceToSlide: number = eventPosition - sliderOffset;
    // Calculate what percent of the length the slider handle has slid
    let percentage: number = (distanceToSlide / this.size) * 100;
    percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
    if (this.reversed) {
      percentage = 100 - percentage;
    }

    // Make sure the percent is within the bounds of the slider.
    // 0% corresponds to the 'min' value of the slide
    // 100% corresponds to the 'max' value of the slide
    return Math.max(0, Math.min(100, percentage));
  }

  private adjustPercentageForRangeSliders(percentage: number): void {
    if (this.type === 'range') {
      let precision = SliderHelpers.getNumDigitsAfterDecimalPlace(percentage);
      precision = precision ? precision - 1 : 0;
      const percentageWithAdjustedPrecision = SliderHelpers.applyToFixedAndParseFloat(percentage, precision);
      if (this.dragged === 0 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[1], precision) < percentageWithAdjustedPrecision) {
        this.percentage[0] = this.percentage[1];
        this.dragged = 1;
      } else if (this.dragged === 1 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[0], precision) > percentageWithAdjustedPrecision) {
        this.percentage[1] = this.percentage[0];
        this.dragged = 0;
      }
    }
  }

  /*
   private createHighlightRange(start: number, end: number) {
   if (this.isHighlightRange(start, end)) {
   if (start > end) {
   return {'start': end, 'size': start - end};
   }
   return {'start': start, 'size': end - start};
   }
   return undefined;
   }

   private isHighlightRange(start: number, end: number) {
   if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
   return true;
   }
   else {
   return false;
   }
   }
   */

  private calculateValue(snapToClosestTick: boolean): any {
    let val: any;

    if (this.type === 'range') {
      val = [this.min, this.max];
      if (this.percentage[0] !== 0) {
        val[0] = this.toValue(this.percentage[0]);
        val[0] = this.applyPrecision(val[0]);
      }
      if (this.percentage[1] !== 100) {
        val[1] = this.toValue(this.percentage[1]);
        val[1] = this.applyPrecision(val[1]);
      }
    } else {
      val = this.toValue(this.percentage[0]);
      val = parseFloat(val);
      val = this.applyPrecision(val);
    }
    console.log(snapToClosestTick);
    /*
     FIXME
     if (snapToClosestTick) {
     let min = [val, Infinity];
     for (let i = 0; i < this.ticks.length; i++) {
     let diff = Math.abs(this.ticks[i] - val);
     if (diff <= min[1]) {
     min = [this.ticks[i], diff];
     }
     }
     if (min[1] <= this.ticks_snap_bounds) {
     return min[0];
     }
     }*/

    return val;
  }

  private applyPrecision(val: number): number {
    const precision = SliderHelpers.getNumDigitsAfterDecimalPlace(this.step);
    return SliderHelpers.applyToFixedAndParseFloat(val, precision);
  }

  private toPercentage(value: number): number {
    if (this.max === this.min) {
      return 0;
    }
    /*
     if (this.options.ticks_positions.length > 0) {
     let minv, maxv, minp, maxp = 0;
     for (let i = 0; i < this.options.ticks.length; i++) {
     if (value  <= this.options.ticks[i]) {
     minv = (i > 0) ? this.options.ticks[i-1] : 0;
     minp = (i > 0) ? this.options.ticks_positions[i-1] : 0;
     maxv = this.options.ticks[i];
     maxp = this.options.ticks_positions[i];

     break;
     }
     }
     if (i > 0) {
     let partialPercentage = (value - minv) / (maxv - minv);
     return minp + partialPercentage * (maxp - minp);
     }
     }*/

    return 100 * (value - this.min) / (this.max - this.min);
  }

  private toValue(percentage: number): number {
    const rawValue = percentage / 100 * (this.max - this.min);
    const shouldAdjustWithBase = true;
    /*
     if (this.options.ticks_positions.length > 0) {
     let minv, maxv, minp, maxp = 0;
     for (let i = 1; i < this.options.ticks_positions.length; i++) {
     if (percentage <= this.options.ticks_positions[i]) {
     minv = this.options.ticks[i-1];
     minp = this.options.ticks_positions[i-1];
     maxv = this.options.ticks[i];
     maxp = this.options.ticks_positions[i];

     break;
     }
     }
     let partialPercentage = (percentage - minp) / (maxp - minp);
     rawValue = minv + partialPercentage * (maxv - minv);
     shouldAdjustWithBase = false;
     }
     */
    const adjustment = shouldAdjustWithBase ? this.min : 0;
    const value = adjustment + Math.round(rawValue / this.step) * this.step;
    if (value < this.min) {
      return this.min;
    } else if (value > this.max) {
      return this.max;
    } else {
      return value;
    }
  }

  private setTooltipPosition(): void {
    const tooltips = [this.tooltipMain, this.tooltipMin, this.tooltipMax];
    if (this.orientation === 'vertical') {
      const tooltipPos = this.tooltipPosition || 'right';
      const oppositeSide = (tooltipPos === 'left') ? 'right' : 'left';
      tooltips.forEach((tooltip: ElementRef) => {
        this.renderer.setElementClass(tooltip.nativeElement, tooltipPos, true);
        tooltip.nativeElement.style[oppositeSide] = '100%';
      });
    } else if (this.tooltipPosition === 'bottom') {
      tooltips.forEach((tooltip: ElementRef) => {
        this.renderer.setElementClass(tooltip.nativeElement, 'bottom', true);
        tooltip.nativeElement.style.top = 22 + 'px';
      });
    } else {
      tooltips.forEach((tooltip: ElementRef) => {
        this.renderer.setElementClass(tooltip.nativeElement, 'top', true);
        tooltip.nativeElement.style.top = -tooltip.nativeElement.style.outerHeight - 14 + 'px';
      });
    }
  }
}
