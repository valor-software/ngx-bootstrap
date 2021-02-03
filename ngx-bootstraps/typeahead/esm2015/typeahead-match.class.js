export class TypeaheadMatch {
    // tslint:disable-next-line:no-any
    constructor(item, value = item, header = false) {
        this.item = item;
        this.value = value;
        this.header = header;
    }
    isHeader() {
        return this.header;
    }
    toString() {
        return this.value;
    }
}
//# sourceMappingURL=typeahead-match.class.js.map