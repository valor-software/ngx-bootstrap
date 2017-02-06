import { ViewChild, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DraggableElementDirective, SortableModule } from '../sortable';

@Component({
  selector: 'test-draggable-element',
  template: `<div bsDraggableElement [disabled]="disabled"></div>`
})
class TestComponent {
  @ViewChild(DraggableElementDirective) public draggableElementDirective: DropZoneDirective;
  public disabled: boolean = false;
}

describe('Directive: DraggableElementDirective', () => {
  let directive: DraggableElementDirective;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ SortableModule.forRoot() ]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directive = fixture.componentInstance.draggableElementDirective;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set draggable=true if disable is false', () => {
    // arrange
    // act
    // assert
    expect((directive.host.nativeElement as HTMLElement).getAttribute('draggable')).toBe('true');
  });

  it('should set draggable=false if disable is true', () => {
    // arrange
    directive.disabled = true;
    // act
    fixture.detectChanges();
    // assert
    expect((directive.host.nativeElement as HTMLElement).getAttribute('draggable')).toBe('false');
  });

  it('should call onDragStart when dragstart', () => {
    // arrange
    const spy = jasmine.createSpy('onDragStart callback');
    directive.onDragStart = spy;
    // act
    directive.onDragstart({ dataTransfer: { setData: () => void 0 } } as any);
    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call onDragStart when disabled', () => {
    // arrange
    const spy = jasmine.createSpy('onDragStart callback');
    directive.onDragStart = spy;
    directive.disabled = true;
    fixture.detectChanges();
    // act
    directive.onDragstart({ dataTransfer: { setData: () => void 0 } } as any);
    // assert
    expect(spy).not.toHaveBeenCalled();
  });

  it('should fill dataTransfer property on dragstart', () => {
    // arrange
    const spy = jasmine.createSpy('dataTransfer.setData callback');
    directive.onDragStart = () => void 0;
    // act
    directive.onDragstart({ dataTransfer: { setData: spy } } as any);
    // assert
    expect(spy).toHaveBeenCalledWith('Text', 'placeholder');
  });

  it('should call onDragEnd when dragend', () => {
    // arrange
    const spy = jasmine.createSpy('onDragEnd callback');
    directive.onDragEnd = spy;
    // act
    directive.onDragend(undefined);
    // assert
    expect(spy).toHaveBeenCalled();
  });
});
