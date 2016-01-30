export declare class TypeaheadUtils {
    static latinMap: any;
    static latinize(str: string): string;
    static escapeRegexp(queryToEscape: string): string;
    static tokenize(str: string, wordRegexDelimiters?: string, phraseRegexDelimiters?: string): Array<string>;
}
