import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[bsDraggable]',
  exportAs: 'bsDraggable'
})
export class BsDraggableDirective implements AfterViewInit {
  public draggableElementData: any;
  public host: ElementRef;

  /** if true then draggable property is set to false and element couldn't be dragged */
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
    if (this.viewInitialized) {
      this.updateDraggableAttribute();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public onDragStart: (event: DragEvent) => void;
  public onDragEnd: () => void;

  private renderer: Renderer;
  private _disabled: boolean;
  private viewInitialized: boolean;

  public constructor(host: ElementRef, renderer: Renderer) {
    this.host = host;
    this.renderer = renderer;
  }

  public ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.updateDraggableAttribute();
  }

  @HostListener('dragstart', ['$event'])
  public onDragstart(event: DragEvent): void {
    if (!this.disabled) {
      event.dataTransfer.setData('Text', 'placeholder');
      this.onDragStart(event);
    }
  }

  @HostListener('dragend', ['$event'])
  public onDragend(event: DragEvent): void {
    this.onDragEnd();
  }

  private updateDraggableAttribute() {
    this.renderer.setElementAttribute(this.host.nativeElement, 'draggable', this.disabled ? 'false' : 'true');
  }
}
