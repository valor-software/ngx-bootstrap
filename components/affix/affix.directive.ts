import {Directive, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy, HostBinding} from 'angular2/core';
import {positionService, ElemPosition} from '../position';

export enum AffixStatus {AFFIX, AFFIX_TOP, AFFIX_BOTTOM}

export class AffixStatusChange {
    constructor(public oldStatus:AffixStatus, public newStatus:AffixStatus) {
    }
}

@Directive({
    selector: '[affix]'
})
export class Affix implements OnInit, OnDestroy {

    @Input()
    public affixOffsetTop:number = 0;
    @Input()
    public affixOffsetBottom:number = 0;

    @HostBinding('class.affix')
    private isAffix:boolean = true;
    @HostBinding('class.affix-top')
    private isAffixedTop:boolean = true;
    @HostBinding('class.affix-bottom')
    private isAffixedBottom:boolean = true;
    @HostBinding('style.top.px')
    private top:number = null;

    @Output()
    public affixChange:EventEmitter<AffixStatusChange> = new EventEmitter(false);

    private status:AffixStatus = null;
    private body:HTMLBodyElement;
    private window:Window;
    private pinnedOffset:number = null;
    private debouncedCheckPosition:Function = Affix.debounce(() => this.checkPosition(), 5);
    private eventListener:Function = (ev:UIEvent) => this.debouncedCheckPosition();

    constructor(private el:ElementRef) {
        this.body = el.nativeElement.ownerDocument.body;
        this.window = el.nativeElement.ownerDocument.defaultView;
    }

    ngOnInit() {
        this.el.nativeElement.ownerDocument.defaultView.addEventListener('scroll', this.eventListener);
        this.checkPosition();
    }

    ngOnDestroy():any {
        this.el.nativeElement.ownerDocument.defaultView.removeEventListener('scroll', this.eventListener);
        return undefined;
    }

    private checkPosition():void {
        let elemPos = positionService.position(this.el.nativeElement);
        if (elemPos.height === 0 || elemPos.width === 0) {
            // Element is not visible
            return;
        }
        let scrollHeight:number = Math.max(this.window.innerHeight, this.body.scrollHeight);
        let nativeElemPos:ElemPosition = positionService.offset(this.el.nativeElement);

        let newAffixStatus:AffixStatus = this.getState(scrollHeight, nativeElemPos, this.affixOffsetTop, this.affixOffsetBottom);

        if (this.status !== newAffixStatus) {

            this.top = newAffixStatus === AffixStatus.AFFIX_BOTTOM ? this.getPinnedOffset() : null;

            this.affixChange.emit(new AffixStatusChange(this.status, newAffixStatus));
            this.status = newAffixStatus;
            this.isAffix = false;
            this.isAffixedBottom = false;
            this.isAffixedTop = false;
            switch (this.status) {
                case AffixStatus.AFFIX_TOP:
                    this.isAffixedTop = true;
                    break;
                case AffixStatus.AFFIX_BOTTOM:
                    this.isAffixedBottom = true;
                    break;
                default:
                    this.isAffix = true;
                    break;
            }
        }

        if (newAffixStatus === AffixStatus.AFFIX_BOTTOM) {
            this.top = scrollHeight - nativeElemPos.height - this.affixOffsetBottom;
        }
    }

    private getState(scrollHeight:number, nativeElemPos:ElemPosition, offsetTop:number, offsetBottom:number):AffixStatus {
        let scrollTop:number = this.body.scrollTop; // current scroll position in pixels from top
        let targetHeight:number = this.window.innerHeight; // Height of the window / viewport area

        if (offsetTop !== null && this.status === AffixStatus.AFFIX_TOP) {
            if (scrollTop < offsetTop) {
                return AffixStatus.AFFIX_TOP;
            }
            return AffixStatus.AFFIX;
        }

        if (this.status === AffixStatus.AFFIX_BOTTOM) {
            if (offsetTop !== null) {
                if (scrollTop + this.pinnedOffset <= nativeElemPos.top) {
                    return AffixStatus.AFFIX;
                }
                return AffixStatus.AFFIX_BOTTOM;
            }
            if (scrollTop + targetHeight <= scrollHeight - offsetBottom) {
                return AffixStatus.AFFIX;
            }
            return AffixStatus.AFFIX_BOTTOM;
        }

        if (offsetTop != null && scrollTop <= offsetTop) {
            return AffixStatus.AFFIX_TOP;
        }

        let initializing:boolean = this.status === null;
        let lowerEdgePosition:number  = initializing ? scrollTop + targetHeight : nativeElemPos.top + nativeElemPos.height;
        if (offsetBottom != null && (lowerEdgePosition >= scrollHeight - offsetBottom)) {
            return AffixStatus.AFFIX_BOTTOM;
        }

        return AffixStatus.AFFIX;
    }

    private getPinnedOffset():number {
        if (this.pinnedOffset !== null) {
            return this.pinnedOffset;
        }
        let scrollTop:number = this.body.scrollTop;
        let position:ElemPosition = positionService.offset(this.el.nativeElement);

        this.pinnedOffset = position.top - scrollTop;
        return this.pinnedOffset;
    }

    private static debounce(func:Function, wait:number):Function {
        let timeout:any;
        let args:Array<any>;
        let timestamp:number;

        return function () {
            // save details of latest call
            args = [].slice.call(arguments, 0);
            timestamp = Date.now();

            // this is where the magic happens
            let later = function () {

                // how long ago was the last call
                let last = Date.now() - timestamp;

                // if the latest call was less that the wait period ago
                // then we reset the timeout to wait for the difference
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                    // or if not we can null out the timer and run the latest
                } else {
                    timeout = null;
                    func.apply(this, args);
                }
            };

            // we only need to set the timer now if one isn't already running
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };
}
