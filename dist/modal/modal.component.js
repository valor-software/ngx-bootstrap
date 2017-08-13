/* tslint:disable:max-file-line-count */
// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer, ViewContainerRef } from '@angular/core';
import { document } from '../utils/facade/browser';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ClassName, modalConfigDefaults, DISMISS_REASONS } from './modal-options.class';
import { window } from '../utils/facade/browser';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
var TRANSITION_DURATION = 300;
var BACKDROP_TRANSITION_DURATION = 150;
/** Mark any code with directive to show it's content in modal */
export var ModalDirective = (function () {
    function ModalDirective(_element, _viewContainerRef, _renderer, clf) {
        /** This event fires immediately when the `show` instance method is called. */
        this.onShow = new EventEmitter();
        /** This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete) */
        this.onShown = new EventEmitter();
        /** This event is fired immediately when the hide instance method has been called. */
        this.onHide = new EventEmitter();
        /** This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete). */
        this.onHidden = new EventEmitter();
        // seems like an Options
        this.isAnimated = true;
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this._element = _element;
        this._renderer = _renderer;
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    }
    Object.defineProperty(ModalDirective.prototype, "config", {
        get: function () {
            return this._config;
        },
        /** allows to set modal configuration via element property */
        set: function (conf) {
            this._config = this.getConfig(conf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDirective.prototype, "isShown", {
        get: function () {
            return this._isShown;
        },
        enumerable: true,
        configurable: true
    });
    ModalDirective.prototype.onClick = function (event) {
        if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    };
    // todo: consider preventing default and stopping propagation
    ModalDirective.prototype.onEsc = function () {
        if (this.config.keyboard) {
            this.dismissReason = DISMISS_REASONS.ESC;
            this.hide();
        }
    };
    ModalDirective.prototype.ngOnDestroy = function () {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    };
    ModalDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._config = this._config || this.getConfig();
        setTimeout(function () {
            if (_this._config.show) {
                _this.show();
            }
        }, 0);
    };
    /* Public methods */
    /** Allows to manually toggle modal visibility */
    ModalDirective.prototype.toggle = function () {
        return this._isShown ? this.hide() : this.show();
    };
    /** Allows to manually open modal */
    ModalDirective.prototype.show = function () {
        var _this = this;
        this.dismissReason = null;
        this.onShow.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (document && document.body) {
            if (document.body.classList.contains(ClassName.OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.setElementClass(document.body, ClassName.OPEN, true);
            }
        }
        this.showBackdrop(function () {
            _this.showElement();
        });
    };
    /** Allows to manually close modal */
    ModalDirective.prototype.hide = function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
        }
        this.onHide.emit(this);
        // todo: add an option to prevent hiding
        if (!this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.setElementClass(this._element.nativeElement, ClassName.IN, false);
        if (!isBs3()) {
            this._renderer.setElementClass(this._element.nativeElement, ClassName.SHOW, false);
        }
        // this._addClassIn = false;
        if (this.isAnimated) {
            this.timerHideModal = setTimeout(function () { return _this.hideModal(); }, TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    };
    /** Private methods @internal */
    ModalDirective.prototype.getConfig = function (config) {
        return Object.assign({}, modalConfigDefaults, config);
    };
    /**
     *  Show dialog
     *  @internal
     */
    ModalDirective.prototype.showElement = function () {
        var _this = this;
        // todo: replace this with component loader usage
        if (!this._element.nativeElement.parentNode ||
            (this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
            // don't move modals dom position
            if (document && document.body) {
                document.body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setElementAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setElementStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setElementProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this.isAnimated) {
            Utils.reflow(this._element.nativeElement);
        }
        // this._addClassIn = true;
        this._renderer.setElementClass(this._element.nativeElement, ClassName.IN, true);
        if (!isBs3()) {
            this._renderer.setElementClass(this._element.nativeElement, ClassName.SHOW, true);
        }
        var transitionComplete = function () {
            if (_this._config.focus) {
                _this._element.nativeElement.focus();
            }
            _this.onShown.emit(_this);
        };
        if (this.isAnimated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    };
    /** @internal */
    ModalDirective.prototype.hideModal = function () {
        var _this = this;
        this._renderer.setElementAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop(function () {
            if (!_this.isNested) {
                if (document && document.body) {
                    _this._renderer.setElementClass(document.body, ClassName.OPEN, false);
                }
                _this.resetScrollbar();
            }
            _this.resetAdjustments();
            _this.focusOtherModal();
            _this.onHidden.emit(_this);
        });
    };
    // todo: original show was calling a callback when done, but we can use promise
    /** @internal */
    ModalDirective.prototype.showBackdrop = function (callback) {
        var _this = this;
        if (this._isShown && this.config.backdrop && (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(ModalBackdropComponent)
                .to('body')
                .show({ isAnimated: this.isAnimated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this.isAnimated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            var callbackRemove = function () {
                _this.removeBackdrop();
                if (callback) {
                    callback();
                }
            };
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    };
    /** @internal */
    ModalDirective.prototype.removeBackdrop = function () {
        this._backdrop.hide();
    };
    /** Events tricks */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    ModalDirective.prototype.focusOtherModal = function () {
        var otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        this._renderer.invokeElementMethod(otherOpenedModals[otherOpenedModals.length - 1], 'focus');
    };
    /** @internal */
    ModalDirective.prototype.resetAdjustments = function () {
        this._renderer.setElementStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setElementStyle(this._element.nativeElement, 'paddingRight', '');
    };
    /** Scroll bar tricks */
    /** @internal */
    ModalDirective.prototype.checkScrollbar = function () {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    ModalDirective.prototype.setScrollbar = function () {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = (this.originalBodyPadding + this.scrollbarWidth) + "px";
        }
    };
    ModalDirective.prototype.resetScrollbar = function () {
        document.body.style.paddingRight = this.originalBodyPadding;
    };
    // thx d.walsh
    ModalDirective.prototype.getScrollbarWidth = function () {
        var scrollDiv = this._renderer.createElement(document.body, 'div', void 0);
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    ModalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsModal]',
                    exportAs: 'bs-modal'
                },] },
    ];
    /** @nocollapse */
    ModalDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ViewContainerRef, },
        { type: Renderer, },
        { type: ComponentLoaderFactory, },
    ]; };
    ModalDirective.propDecorators = {
        'config': [{ type: Input },],
        'onShow': [{ type: Output },],
        'onShown': [{ type: Output },],
        'onHide': [{ type: Output },],
        'onHidden': [{ type: Output },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
        'onEsc': [{ type: HostListener, args: ['keydown.esc',] },],
    };
    return ModalDirective;
}());
//# sourceMappingURL=modal.component.js.map