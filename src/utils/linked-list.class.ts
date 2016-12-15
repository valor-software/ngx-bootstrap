export default class LinkedList <T> extends Array {

  public length: number = 0;
  protected head: any;
  protected tail: any;
  protected current: any;
  protected asArray: T[] = [];

  protected getNode(position: number): any {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    let current = this.head;

    for (let index = 0; index < position; index++) {
      current = current.next;
    }
    return current;
  }

  protected createInternalArrayRepresentation(): void {
    let outArray: any[] = [];
    let current = this.head;

    while (current) {
      outArray.push(current.value);
      current = current.next;
    }
    this.asArray = outArray;
  }

  public get(position: number): T {
    if (this.length === 0 || position < 0 || position >= this.length) {
      return void 0;
    }

    let current = this.head;

    for (let index = 0; index < position; index++) {
      current = current.next;
    }
    return current.value;
  }

  public add(value: T, position: number = this.length): void {
    if (position < 0 || position > this.length) {
      throw new Error('Position is out of the list');
    }

    let node = {
      value: value as any,
      next: undefined as any,
      previous: undefined as any
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.current = node;
    } else {
      if (position === 0) {
        // first node
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
      } else if (position === this.length) {
        // last node
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
      } else {
        // node in middle
        let currentPreviousNode = this.getNode(position - 1);
        let currentNextNode = currentPreviousNode.next;

        currentPreviousNode.next = node;
        currentNextNode.previous = node;

        node.previous = currentPreviousNode;
        node.next = currentNextNode;
      }

    }
    this.length++;
    this.createInternalArrayRepresentation();
  }

  public remove(position: number = 0): void {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    if (position === 0) {
      // first node
      this.head = this.head.next;

      if (this.head) {
        // there is no second node
        this.head.previous = undefined;
      } else {
        // there is no second node
        this.tail = undefined;
      }
    } else if (position === this.length - 1) {
      // last node
      this.tail = this.tail.previous;
      this.tail.next = undefined;
    } else {
      // middle node
      let removedNode = this.getNode(position);
      removedNode.next.previous = removedNode.previous;
      removedNode.previous.next = removedNode.next;
    }

    this.length--;
    this.createInternalArrayRepresentation();
  }

  public set(position: number, value: T): void {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    let node = this.getNode(position);
    node.value = value;
    this.createInternalArrayRepresentation();
  }

  public toArray(): T[] {
    return this.asArray;
  }

  public findAll(fn: any): any[] {
    let current = this.head;
    let result: any[] = [];
    for (let index = 0; index < this.length; index++) {
      if (fn(current.value, index)) {
        result.push({index, value: current.value});
      }
      current = current.next;
    }
    return result;
  }
  // Array methods overriding start
  public push(...args: T[]): number {
    args.forEach((arg: any) => {
      this.add(arg);
    });
    return this.length;
  }

  public pop(): T {
    if (this.length === 0) {
      return undefined;
    }
    const last = this.tail;
    this.remove(this.length - 1);
    return last.value;
  }

  public unshift(...args: T[]): number {
    args.reverse();
    args.forEach((arg: any) => {
      this.add(arg, 0);
    });
    return this.length;
  }

  public shift(): T {
    if (this.length === 0) {
      return undefined;
    }
    const lastItem = this.head.value;
    this.remove();
    return lastItem;
  }

  public forEach(fn: any): void {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      fn(current.value, index);
      current = current.next;
    }
  }

  public indexOf(value: T): number {
    let current = this.head;
    let position = 0;

    for (let index = 0; index < this.length; index++) {
      if (current.value === value) {

        position = index;
        break;
      }
      current = current.next;
    }
    return position;
  }

  public some(fn: any): boolean {
    let current = this.head;
    let result  = false;
    while (current && !result) {
      if (fn(current.value)) {
        result = true;
        break;
      }
      current = current.next;
    }
    return result;
  }

  public every(fn: any): boolean {
    let current = this.head;
    let result  = true;
    while (current && result)  {
      if (!fn(current.value)) {
        result = false;
      }
      current = current.next;
    }
    return result;
  }

  public toString(): string {
    return '[Linked List]';
  }

  public find(fn: any): T {
    let current = this.head;
    let result: T;
    for (let index = 0; index < this.length; index++) {
      if (fn(current.value, index)) {
        result = current.value;
        break;
      }
      current = current.next;
    }
    return result;
  }

  public findIndex(fn: any): number {
    let current = this.head;
    let result: number;
    for (let index = 0; index < this.length; index++) {
      if (fn(current.value, index)) {
        result = index;
        break;
      }
      current = current.next;
    }
    return result;
  }

  // Array methods overriding END
}
