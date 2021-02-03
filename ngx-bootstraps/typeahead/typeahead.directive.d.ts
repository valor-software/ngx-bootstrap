import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { TypeaheadConfig } from './typeahead.config';
import { TypeaheadOrder } from './typeahead-order.class';
import { TypeaheadOptionItemContext, TypeaheadOptionListContext } from './models';
import * as i0 from "@angular/core";
declare type TypeaheadOption = string | {
    [key in string | number]: any;
};
declare type Typeahead = TypeaheadOption[] | Observable<TypeaheadOption[]>;
export declare class TypeaheadDirective implements OnInit, OnDestroy {
    private changeDetection;
    private element;
    private ngControl;
    private renderer;
    /** options source, can be Array of strings, objects or
     * an Observable for external matching process
     */
    typeahead: Typeahead;
    /** minimal no of characters that needs to be entered before
     * typeahead kicks-in. When set to 0, typeahead shows on focus with full
     * list of options (limited as normal by typeaheadOptionsLimit)
     */
    typeaheadMinLength: number;
    /** sets use adaptive position */
    adaptivePosition: boolean;
    /** turn on/off animation */
    isAnimated: boolean;
    /** minimal wait time after last character typed before typeahead kicks-in */
    typeaheadWaitMs: number;
    /** maximum length of options items list. The default value is 20 */
    typeaheadOptionsLimit: number;
    /** when options source is an array of objects, the name of field
     * that contains the options value, we use array item as option in case
     * of this field is missing. Supports nested properties and methods.
     */
    typeaheadOptionField: string;
    /** when options source is an array of objects, the name of field that
     * contains the group value, matches are grouped by this field when set.
     */
    typeaheadGroupField: string;
    /** Used to specify a custom order of matches. When options source is an array of objects
     * a field for sorting has to be set up. In case of options source is an array of string,
     * a field for sorting is absent. The ordering direction could be changed to ascending or descending.
     */
    typeaheadOrderBy: TypeaheadOrder;
    /** should be used only in case of typeahead attribute is Observable of array.
     * If true - loading of options will be async, otherwise - sync.
     * true make sense if options array is large.
     */
    typeaheadAsync: boolean;
    /** match latin symbols.
     * If true the word súper would match super and vice versa.
     */
    typeaheadLatinize: boolean;
    /** Can be use to search words by inserting a single white space between each characters
     *  for example 'C a l i f o r n i a' will match 'California'.
     */
    typeaheadSingleWords: boolean;
    /** should be used only in case typeaheadSingleWords attribute is true.
     * Sets the word delimiter to break words. Defaults to space.
     */
    typeaheadWordDelimiters: string;
    /** Can be used to conduct a search of multiple items and have suggestion not for the
     * whole value of the input but for the value that comes after a delimiter provided via
     * typeaheadMultipleSearchDelimiters attribute. This option can only be used together with
     * typeaheadSingleWords option if typeaheadWordDelimiters and typeaheadPhraseDelimiters
     * are different from typeaheadMultipleSearchDelimiters to avoid conflict in determining
     * when to delimit multiple searches and when a single word.
     */
    typeaheadMultipleSearch: boolean;
    /** should be used only in case typeaheadMultipleSearch attribute is true.
     * Sets the multiple search delimiter to know when to start a new search. Defaults to comma.
     * If space needs to be used, then explicitly set typeaheadWordDelimiters to something else than space
     * because space is used by default OR set typeaheadSingleWords attribute to false if you don't need
     * to use it together with multiple search.
     */
    typeaheadMultipleSearchDelimiters: string;
    /** should be used only in case typeaheadSingleWords attribute is true.
     * Sets the word delimiter to match exact phrase.
     * Defaults to simple and double quotes.
     */
    typeaheadPhraseDelimiters: string;
    /** used to specify a custom item template.
     * Template variables exposed are called item and index;
     */
    typeaheadItemTemplate: TemplateRef<TypeaheadOptionItemContext>;
    /** used to specify a custom options list template.
     * Template variables: matches, itemTemplate, query
     */
    optionsListTemplate: TemplateRef<TypeaheadOptionListContext>;
    /** specifies if typeahead is scrollable  */
    typeaheadScrollable: boolean;
    /** specifies number of options to show in scroll view  */
    typeaheadOptionsInScrollableView: number;
    /** used to hide result on blur */
    typeaheadHideResultsOnBlur: boolean;
    /** fired when an options list was opened and the user clicked Tab
     * If a value equal true, it will be chosen first or active item in the list
     * If value equal false, it will be chosen an active item in the list or nothing
     */
    typeaheadSelectFirstItem: boolean;
    /** makes active first item in a list */
    typeaheadIsFirstItemActive: boolean;
    /** fired when 'busy' state of this component was changed,
     * fired on async mode only, returns boolean
     */
    typeaheadLoading: EventEmitter<boolean>;
    /** fired on every key event and returns true
     * in case of matches are not detected
     */
    typeaheadNoResults: EventEmitter<boolean>;
    /** fired when option was selected, return object with data of this option. */
    typeaheadOnSelect: EventEmitter<TypeaheadMatch>;
    /** fired when option was previewed, return object with data of this option. */
    typeaheadOnPreview: EventEmitter<TypeaheadMatch>;
    /** fired when blur event occurs. returns the active item */
    typeaheadOnBlur: EventEmitter<TypeaheadMatch>;
    /**
     * A selector specifying the element the typeahead should be appended to.
     */
    container: string;
    /** This attribute indicates that the dropdown should be opened upwards */
    dropup: boolean;
    /** if false restrict model values to the ones selected from the popup only will be provided */
    /** if false the first match automatically will not be focused as you type */
    /** format the ng-model result after selection */
    /** if true automatically select an item when there is one option that exactly matches the user input */
    /**  if true select the currently highlighted match on blur */
    /**  if false don't focus the input element the typeahead directive is associated with on selection */
    activeDescendant: string;
    isOpen: boolean;
    list: string;
    _container: TypeaheadContainerComponent;
    isActiveItemChanged: boolean;
    isFocused: boolean;
    cancelRequestOnFocusLost: boolean;
    protected keyUpEventEmitter: EventEmitter<string>;
    protected _matches: TypeaheadMatch[];
    protected placement: string;
    private _typeahead;
    private _subscriptions;
    private _outsideClickListener;
    private _allEnteredValue;
    constructor(cis: ComponentLoaderFactory, config: TypeaheadConfig, changeDetection: ChangeDetectorRef, element: ElementRef, ngControl: NgControl, renderer: Renderer2, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    onInput(e: any): void;
    onChange(event: KeyboardEvent): void;
    onFocus(): void;
    onBlur(): void;
    onKeydown(event: KeyboardEvent): void;
    changeModel(match: TypeaheadMatch): void;
    get matches(): TypeaheadMatch[];
    show(): void;
    hide(): void;
    onOutsideClick(): void;
    ngOnDestroy(): void;
    protected asyncActions(): void;
    protected syncActions(): void;
    protected normalizeOption(option: TypeaheadOption): string;
    protected tokenizeQuery(currentQuery: string | string[]): string | string[];
    protected normalizeQuery(value: string): string | string[];
    protected testMatch(match: string, test: string[] | string): boolean;
    protected finalizeAsyncCall(matches: TypeaheadOption[]): void;
    protected prepareMatches(options: TypeaheadOption[]): void;
    protected orderMatches(options: TypeaheadOption[]): TypeaheadOption[];
    protected hasMatches(): boolean;
    protected checkDelimitersConflict(): void;
    protected haveCommonCharacters(str1: string, str2: string): boolean;
    static ɵfac: i0.ɵɵFactoryDef<TypeaheadDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<TypeaheadDirective, "[typeahead]", ["bs-typeahead"], { "typeahead": "typeahead"; "typeaheadMinLength": "typeaheadMinLength"; "adaptivePosition": "adaptivePosition"; "isAnimated": "isAnimated"; "typeaheadWaitMs": "typeaheadWaitMs"; "typeaheadOptionsLimit": "typeaheadOptionsLimit"; "typeaheadOptionField": "typeaheadOptionField"; "typeaheadGroupField": "typeaheadGroupField"; "typeaheadOrderBy": "typeaheadOrderBy"; "typeaheadAsync": "typeaheadAsync"; "typeaheadLatinize": "typeaheadLatinize"; "typeaheadSingleWords": "typeaheadSingleWords"; "typeaheadWordDelimiters": "typeaheadWordDelimiters"; "typeaheadMultipleSearch": "typeaheadMultipleSearch"; "typeaheadMultipleSearchDelimiters": "typeaheadMultipleSearchDelimiters"; "typeaheadPhraseDelimiters": "typeaheadPhraseDelimiters"; "typeaheadItemTemplate": "typeaheadItemTemplate"; "optionsListTemplate": "optionsListTemplate"; "typeaheadScrollable": "typeaheadScrollable"; "typeaheadOptionsInScrollableView": "typeaheadOptionsInScrollableView"; "typeaheadHideResultsOnBlur": "typeaheadHideResultsOnBlur"; "typeaheadSelectFirstItem": "typeaheadSelectFirstItem"; "typeaheadIsFirstItemActive": "typeaheadIsFirstItemActive"; "container": "container"; "dropup": "dropup"; }, { "typeaheadLoading": "typeaheadLoading"; "typeaheadNoResults": "typeaheadNoResults"; "typeaheadOnSelect": "typeaheadOnSelect"; "typeaheadOnPreview": "typeaheadOnPreview"; "typeaheadOnBlur": "typeaheadOnBlur"; }, never>;
}
export {};
//# sourceMappingURL=typeahead.directive.d.ts.map