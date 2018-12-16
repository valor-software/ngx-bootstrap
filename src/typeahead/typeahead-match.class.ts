export class TypeaheadMatch {
  readonly value: string;

// tslint:disable-next-line:no-any
  readonly item: any;
  protected header: boolean;

// tslint:disable-next-line:no-any
  constructor(item: any, value: string = item, header = false) {
    this.item = item;
    this.value = value;
    this.header = header;
  }

  isHeader(): boolean {
    return this.header;
  }

  toString(): string {
    return this.value;
  }
}
