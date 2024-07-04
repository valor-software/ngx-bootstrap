// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TypeaheadMatch<ItemType = any> {
  readonly value: string;

  readonly item: ItemType;
  protected header: boolean;

  constructor(item: ItemType, value = item as string, header = false) {
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
