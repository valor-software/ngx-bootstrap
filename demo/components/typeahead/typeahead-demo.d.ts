export declare class TypeaheadDemo {
    selected: string;
    asyncSelected: string;
    typeaheadLoading: boolean;
    typeaheadNoResults: boolean;
    states: Array<string>;
    statesComplex: Array<any>;
    private _cache;
    private _prevContext;
    getContext(): any;
    getAsyncData(context: any): Function;
    changeTypeaheadLoading(e: boolean): void;
    changeTypeaheadNoResults(e: boolean): void;
    typeaheadOnSelect(e: any): void;
}
