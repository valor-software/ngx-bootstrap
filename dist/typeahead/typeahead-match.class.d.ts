export declare class TypeaheadMatch {
    readonly value: string;
    readonly item: any;
    protected header: boolean;
    constructor(item: any, value?: string, header?: boolean);
    isHeader(): boolean;
    toString(): string;
}
