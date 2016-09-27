// FIX: in order to update to rc.1 had to disable animation, sorry
import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer } from '@angular/core';
// import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';

// import {animate, animation, state, style, transition} from '@angular/core';

/*@Directive({
 selector: '[collapse]',
 // templateUrl: 'app/panel.html',
 // styleUrls: ['app/panel.css'],
 animations: [
 animation('active', [
 state('void', style({ height: 0 })),
 state('closed', style({ height: 0 })),
 state('open', style({ height: '*' })),
 transition('void => closed', [ animate(0) ]),
 transition('closed => open', [ animate('350ms ease-out') ]),
 transition('open => closed', [ animate('350ms ease-out') ])
 ])
 ]
 })*/
// fix: replace with // '@angular/animate';
// when https://github.com/angular/angular/issues/5984 will be fixed

// TODO: remove ElementRef
// TODO: add on change
// TODO: #576 add callbacks: expanding, collapsing after adding animation
@Directive({selector: '[collapse]'})
export class CollapseDirective implements OnInit {
  // private animation:any;
  @Output() public collapsed:EventEmitter<any> = new EventEmitter<any>(false);
  @Output() public expanded:EventEmitter<any> = new EventEmitter<any>(false);
  // style
  // @HostBinding('style.height')
  // private height:string;
  @HostBinding('style.display')
  public display:string;
  // shown
  @HostBinding('class.in')
  @HostBinding('attr.aria-expanded')
  public isExpanded:boolean = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  public isCollapsed:boolean = false;
  // stale state
  @HostBinding('class.collapse')
  public isCollapse:boolean = true;
  // animation state
  @HostBinding('class.collapsing')
  public isCollapsing:boolean = false;

  // @Input() private transitionDuration:number = 500; // Duration in ms

  @Input()
  public set collapse(value:boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  public get collapse():boolean {
    return this.isExpanded;
  }

  // private open: boolean;
  // private _ab:AnimationBuilder;
  private _el:ElementRef;
  private _renderer:Renderer;

  public constructor(/*_ab:AnimationBuilder, */_el:ElementRef, _renderer:Renderer) {
    // this._ab = _ab;
    this._el = _el;
    this._renderer = _renderer;
  }

  public ngOnInit():void {
    // this.animation = this._ab.css();
    // this.animation.setDuration(this.transitionDuration);
  }

  public toggle():void {
    // this.open = !this.open;
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  public hide():void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = false;
    this.isCollapsed = true;

    this.isCollapse = true;
    this.isCollapsing = false;

    this.display = 'none';
    this.collapsed.emit(this);

    /*  setTimeout(() => {
     // this.height = '0';
     // this.isCollapse = true;
     // this.isCollapsing = false;
     this.animation
     .setFromStyles({
     height: this._el.nativeElement.scrollHeight + 'px'
     })
     .setToStyles({
     height: '0',
     overflow: 'hidden'
     });

     this.animation.start(this._el.nativeElement)
     .onComplete(() => {
     if (this._el.nativeElement.offsetHeight === 0) {
     this.display = 'none';
     }

     this.isCollapse = true;
     this.isCollapsing = false;
     });
     }, 4);*/
  }

  public show():void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = true;
    this.isCollapsed = false;

    this.display = 'block';
    // this.height = 'auto';
    this.isCollapse = true;
    this.isCollapsing = false;
    this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
    this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
    this.expanded.emit(this);
    /*setTimeout(() => {
     // this.height = 'auto';
     // this.isCollapse = true;
     // this.isCollapsing = false;
     this.animation
     .setFromStyles({
     height: this._el.nativeElement.offsetHeight,
     overflow: 'hidden'
     })
     .setToStyles({
     height: this._el.nativeElement.scrollHeight + 'px'
     });

     this.animation.start(this._el.nativeElement)
     .onComplete(() => {
     this.isCollapse = true;
     this.isCollapsing = false;
     this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
     this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
     });
     }, 4);*/
  }
}
