export declare class LinkedList<T> {
    length: number;
    protected head: any;
    protected tail: any;
    protected current: any;
    protected asArray: T[];
    protected getNode(position: number): any;
    protected createInternalArrayRepresentation(): void;
    get(position: number): T;
    add(value: T, position?: number): void;
    remove(position?: number): void;
    set(position: number, value: T): void;
    toArray(): T[];
    findAll(fn: any): any[];
    push(...args: T[]): number;
    pop(): T;
    unshift(...args: T[]): number;
    shift(): T;
    forEach(fn: any): void;
    indexOf(value: T): number;
    some(fn: any): boolean;
    every(fn: any): boolean;
    toString(): string;
    find(fn: any): T;
    findIndex(fn: any): number;
}
