export class TypeaheadMatch {
  readonly value: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly item: any;
  protected header: boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
