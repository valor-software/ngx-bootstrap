// tslint:disable:max-file-line-count max-line-length
import { ChangeDetectorRef, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { isBs3, Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { latinize } from './typeahead-utils';
import { typeaheadAnimation } from './typeahead-animations';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
import * as i2 from "@angular/common";
const _c0 = ["ulElement"];
const _c1 = ["liElements"];
function TypeaheadContainerComponent_ng_template_0_Template(rf, ctx) { }
function TypeaheadContainerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const match_r7 = ctx.match;
    const query_r8 = ctx.query;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHtml", ctx_r2.highlight(match_r7, query_r8), i0.ɵɵsanitizeHtml);
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 10, 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r11);
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_ng_template_3_Template(rf, ctx) { }
const _c2 = function (a0, a1, a2, a3) { return { item: a0, index: a1, match: a2, query: a3 }; };
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 12, 11);
    i0.ɵɵlistener("mouseenter", function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template_li_mouseenter_0_listener() { i0.ɵɵrestoreView(_r21); const match_r11 = i0.ɵɵnextContext().$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.selectActive(match_r11); });
    i0.ɵɵelementStart(2, "a", 13);
    i0.ɵɵlistener("click", function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template_a_click_2_listener($event) { i0.ɵɵrestoreView(_r21); const match_r11 = i0.ɵɵnextContext().$implicit; const ctx_r22 = i0.ɵɵnextContext(2); return ctx_r22.selectMatch(match_r11, $event); });
    i0.ɵɵtemplate(3, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_ng_template_3_Template, 0, 0, "ng-template", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext();
    const match_r11 = ctx_r24.$implicit;
    const i_r12 = ctx_r24.index;
    const ctx_r14 = i0.ɵɵnextContext(2);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵclassProp("active", ctx_r14.isActive(match_r11));
    i0.ɵɵproperty("id", ctx_r14.popupId + "-" + i_r12)("@typeaheadAnimation", ctx_r14.animationState);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r14.itemTemplate || _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction4(6, _c2, match_r11.item, i_r12, match_r11, ctx_r14.query));
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_0_Template, 3, 1, "li", 8);
    i0.ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template, 4, 11, "li", 9);
} if (rf & 2) {
    const match_r11 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", match_r11.isHeader());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !match_r11.isHeader());
} }
function TypeaheadContainerComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 5, 6);
    i0.ɵɵtemplate(2, TypeaheadContainerComponent_ng_template_3_ng_template_2_Template, 2, 2, "ng-template", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("overflow-y", ctx_r4.needScrollbar ? "scroll" : "auto")("height", ctx_r4.needScrollbar ? ctx_r4.guiHeight : "auto");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.matches);
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_h6_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h6", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(match_r26);
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_ng_template_2_Template(rf, ctx) { }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15, 11);
    i0.ɵɵlistener("click", function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r35); const match_r26 = i0.ɵɵnextContext().$implicit; const ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.selectMatch(match_r26, $event); })("mouseenter", function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template_button_mouseenter_0_listener() { i0.ɵɵrestoreView(_r35); const match_r26 = i0.ɵɵnextContext().$implicit; const ctx_r36 = i0.ɵɵnextContext(2); return ctx_r36.selectActive(match_r26); });
    i0.ɵɵtemplate(2, TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_ng_template_2_Template, 0, 0, "ng-template", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = i0.ɵɵnextContext();
    const match_r26 = ctx_r38.$implicit;
    const i_r27 = ctx_r38.index;
    const ctx_r29 = i0.ɵɵnextContext(2);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵclassProp("active", ctx_r29.isActive(match_r26));
    i0.ɵɵproperty("id", ctx_r29.popupId + "-" + i_r27)("@typeaheadAnimation", ctx_r29.animationState);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r29.itemTemplate || _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction4(6, _c2, match_r26.item, i_r27, match_r26, ctx_r29.query));
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_5_ng_template_0_h6_0_Template, 2, 1, "h6", 8);
    i0.ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template, 3, 11, "ng-template", 14);
} if (rf & 2) {
    const match_r26 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", match_r26.isHeader());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !match_r26.isHeader());
} }
function TypeaheadContainerComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_5_ng_template_0_Template, 2, 2, "ng-template", 7);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngForOf", ctx_r6.matches);
} }
const _c3 = function (a0, a1, a2, a3) { return { matches: a0, itemTemplate: a1, query: a2, $implicit: a3 }; };
let nextWindowId = 0;
export class TypeaheadContainerComponent {
    constructor(positionService, renderer, element, changeDetectorRef) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        // tslint:disable-next-line: no-output-rename
        this.activeChangeEvent = new EventEmitter();
        this.isFocused = false;
        this.height = 0;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._matches = [];
        this.isScrolledIntoView = function (elem) {
            const containerViewTop = this.ulElement.nativeElement.scrollTop;
            const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
            const elemTop = elem.offsetTop;
            const elemBottom = elemTop + elem.offsetHeight;
            return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
        };
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.popupId);
        this.positionServiceSubscription = this.positionService.event$.subscribe(() => {
            if (this.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                this.changeDetectorRef.detectChanges();
                return;
            }
            this.animationState = 'unanimated';
            this.changeDetectorRef.detectChanges();
        });
    }
    get isBs4() {
        return !isBs3();
    }
    get typeaheadTemplateMethods() {
        /* tslint:disable:no-this-assignment */
        const _that = this;
        return {
            selectMatch: this.selectMatch.bind(_that),
            selectActive: this.selectActive.bind(_that),
            isActive: this.isActive.bind(_that)
        };
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.activeChanged();
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this.positionService.setOptions({
            modifiers: { flip: { enabled: this.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._matches = value;
        this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
        if (this.typeaheadScrollable) {
            setTimeout(() => {
                this.setScrollableMode();
            });
        }
        if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
            this.setActive(this._matches[0]);
            if (this._active.isHeader()) {
                this.nextActiveMatch();
            }
        }
        if (this._active && !this.typeaheadIsFirstItemActive) {
            const concurrency = this._matches.find(match => match.value === this._active.value);
            if (concurrency) {
                this.selectActive(concurrency);
                return;
            }
            this.active = null;
        }
    }
    get isTopPosition() {
        return this.element.nativeElement.classList.contains('top');
    }
    // tslint:disable-next-line:no-any
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    get isAnimated() {
        return this.parent ? this.parent.isAnimated : false;
    }
    get adaptivePosition() {
        return this.parent ? this.parent.adaptivePosition : false;
    }
    get typeaheadScrollable() {
        return this.parent ? this.parent.typeaheadScrollable : false;
    }
    get typeaheadOptionsInScrollableView() {
        return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
    }
    get typeaheadIsFirstItemActive() {
        return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
    }
    // tslint:disable-next-line:no-any
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    selectActiveMatch(isActiveItemChanged) {
        if (this._active && this.parent.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    }
    activeChanged() {
        const index = this.matches.indexOf(this._active);
        this.activeChangeEvent.emit(`${this.popupId}-${index}`);
    }
    prevActiveMatch() {
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1]);
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    }
    nextActiveMatch() {
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1]);
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    }
    selectActive(value) {
        this.isFocused = true;
        this.setActive(value);
    }
    highlight(match, query) {
        let itemStr = match.value;
        let itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let startIdx;
        let tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                            `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                            `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }
        return itemStr;
    }
    focusLost() {
        this.isFocused = false;
        this.setActive(null);
    }
    isActive(value) {
        return this.active === value;
    }
    selectMatch(value, e = void 0) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(() => this.parent.typeaheadOnSelect.emit(value), 0);
        return false;
    }
    setScrollableMode() {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements.first) {
            const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            const height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    }
    scrollPrevious(index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements) {
            const liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    }
    scrollNext(index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements) {
            const liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    }
    ngOnDestroy() {
        this.positionServiceSubscription.unsubscribe();
    }
    setActive(value) {
        this._active = value;
        let preview = value;
        if ((this._active === null) || (this._active.isHeader())) {
            preview = null;
        }
        this.parent.typeaheadOnPreview.emit(preview);
    }
    scrollToBottom() {
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    }
    scrollToTop() {
        this.ulElement.nativeElement.scrollTop = 0;
    }
}
TypeaheadContainerComponent.ɵfac = function TypeaheadContainerComponent_Factory(t) { return new (t || TypeaheadContainerComponent)(i0.ɵɵdirectiveInject(i1.PositioningService), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
TypeaheadContainerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TypeaheadContainerComponent, selectors: [["typeahead-container"]], viewQuery: function TypeaheadContainerComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
        i0.ɵɵviewQuery(_c1, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ulElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.liElements = _t);
    } }, hostAttrs: [1, "dropdown", "open", "bottom", 2, "position", "absolute", "display", "block"], hostVars: 9, hostBindings: function TypeaheadContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseleave", function TypeaheadContainerComponent_mouseleave_HostBindingHandler() { return ctx.focusLost(); })("blur", function TypeaheadContainerComponent_blur_HostBindingHandler() { return ctx.focusLost(); });
    } if (rf & 2) {
        i0.ɵɵattribute("role", ctx.isBs4 ? "listbox" : null);
        i0.ɵɵstyleProp("height", ctx.isBs4 && ctx.needScrollbar ? ctx.guiHeight : "auto")("visibility", "inherit");
        i0.ɵɵclassProp("dropdown-menu", ctx.isBs4)("dropup", ctx.dropup);
    } }, outputs: { activeChangeEvent: "activeChange" }, decls: 7, vars: 7, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["bsItemTemplate", ""], ["bs3Template", ""], ["bs4Template", ""], [3, "innerHtml"], ["role", "listbox", 1, "dropdown-menu"], ["ulElement", ""], ["ngFor", "", 3, "ngForOf"], ["class", "dropdown-header", 4, "ngIf"], ["role", "option", 3, "id", "active", "mouseenter", 4, "ngIf"], [1, "dropdown-header"], ["liElements", ""], ["role", "option", 3, "id", "mouseenter"], ["href", "#", "tabindex", "-1", 3, "click"], [3, "ngIf"], ["role", "option", 1, "dropdown-item", 3, "id", "click", "mouseenter"]], template: function TypeaheadContainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
        i0.ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, TypeaheadContainerComponent_ng_template_3_Template, 3, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(5, TypeaheadContainerComponent_ng_template_5_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        const _r3 = i0.ɵɵreference(4);
        const _r5 = i0.ɵɵreference(6);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.optionsListTemplate || (ctx.isBs4 ? _r5 : _r3))("ngTemplateOutletContext", i0.ɵɵpureFunction4(2, _c3, ctx.matches, ctx.itemTemplate || _r1, ctx.query, ctx.typeaheadTemplateMethods));
    } }, directives: [i2.NgTemplateOutlet, i2.NgForOf, i2.NgIf], styles: [".dropdown[_nghost-%COMP%] {\n      z-index: 1000;\n    }\n\n    .dropdown-menu[_nghost-%COMP%], .dropdown-menu[_ngcontent-%COMP%] {\n      overflow-y: auto;\n      height: 100px;\n    }"], data: { animation: [typeaheadAnimation] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TypeaheadContainerComponent, [{
        type: Component,
        args: [{
                selector: 'typeahead-container',
                templateUrl: './typeahead-container.component.html',
                host: {
                    class: 'dropdown open bottom',
                    '[class.dropdown-menu]': 'isBs4',
                    '[style.height]': `isBs4 && needScrollbar ? guiHeight: 'auto'`,
                    '[style.visibility]': `'inherit'`,
                    '[class.dropup]': 'dropup',
                    style: 'position: absolute;display: block;',
                    '[attr.role]': `isBs4 ? 'listbox' : null `
                },
                styles: [
                    `
    :host.dropdown {
      z-index: 1000;
    }

    :host.dropdown-menu, .dropdown-menu {
      overflow-y: auto;
      height: 100px;
    }
  `
                ],
                animations: [typeaheadAnimation]
            }]
    }], function () { return [{ type: i1.PositioningService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { activeChangeEvent: [{
            type: Output,
            args: ['activeChange']
        }], ulElement: [{
            type: ViewChild,
            args: ['ulElement', { static: false }]
        }], liElements: [{
            type: ViewChildren,
            args: ['liElements']
        }], focusLost: [{
            type: HostListener,
            args: ['mouseleave']
        }, {
            type: HostListener,
            args: ['blur']
        }] }); })();
//# sourceMappingURL=typeahead-container.component.js.map