import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { ComponentLoaderFactory } from '../component-loader/index';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
export declare class TypeaheadDirective implements OnInit, OnDestroy {
    private ngControl;
    private element;
    private renderer;
    private changeDetection;
    /** options source, can be Array of strings, objects or
     * an Observable for external matching process
     */
    typeahead: any;
    /** minimal no of characters that needs to be entered before
     * typeahead kicks-in. When set to 0, typeahead shows on focus with full
     * list of options (limited as normal by typeaheadOptionsLimit)
     */
    typeaheadMinLength: number;
    /** minimal wait time after last character typed before typeahead kicks-in */
    typeaheadWaitMs: number;
    /** maximum length of options items list */
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
    /** should be used only in case of typeahead attribute is array.
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
    /** should be used only in case typeaheadSingleWords attribute is true.
     * Sets the word delimiter to match exact phrase.
     * Defaults to simple and double quotes.
     */
    typeaheadPhraseDelimiters: string;
    /** used to specify a custom item template.
     * Template variables exposed are called item and index;
     */
    typeaheadItemTemplate: TemplateRef<any>;
    /** used to specify a custom options list template.
     * Template variables: matches, itemTemplate, query
     */
    optionsListTemplate: TemplateRef<any>;
    /** specifies if typeahead is scrollable  */
    typeaheadScrollable: boolean;
    /** specifies number of options to show in scroll view  */
    typeaheadOptionsInScrollableView: number;
    /** fired when 'busy' state of this component was changed,
     * fired on async mode only, returns boolean
     */
    typeaheadLoading: EventEmitter<boolean>;
    /** fired on every key event and returns true
     * in case of matches are not detected
     */
    typeaheadNoResults: EventEmitter<boolean>;
    /** fired when option was selected, return object with data of this option */
    typeaheadOnSelect: EventEmitter<TypeaheadMatch>;
    /** fired when blur event occurres. returns the active item */
    typeaheadOnBlur: EventEmitter<any>;
    /**
     * A selector specifying the element the typeahead should be appended to.
     * Currently only supports "body".
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
    _container: TypeaheadContainerComponent;
    isTypeaheadOptionsListActive: boolean;
    protected keyUpEventEmitter: EventEmitter<any>;
    protected _matches: TypeaheadMatch[];
    protected placement: string;
    private _typeahead;
    private _subscriptions;
    private _outsideClickListener;
    constructor(ngControl: NgControl, element: ElementRef, viewContainerRef: ViewContainerRef, renderer: Renderer2, cis: ComponentLoaderFactory, changeDetection: ChangeDetectorRef);
    ngOnInit(): void;
    onInput(e: any): void;
    onChange(e: any): void;
    onFocus(): void;
    onBlur(): void;
    onKeydown(e: any): void;
    changeModel(match: TypeaheadMatch): void;
    readonly matches: any[];
    show(): void;
    hide(): void;
    onOutsideClick(): void;
    ngOnDestroy(): any;
    protected asyncActions(): void;
    protected syncActions(): void;
    protected normalizeOption(option: any): any;
    protected normalizeQuery(value: string): any;
    protected testMatch(match: string, test: any): boolean;
    protected finalizeAsyncCall(matches: any[]): void;
    protected prepareMatches(options: any[]): void;
    protected hasMatches(): boolean;
}
