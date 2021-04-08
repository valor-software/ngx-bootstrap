interface ListNode<T> {
  value: T,
  next?: ListNode<T>,
  previous?: ListNode<T>
}

export class LinkedList<T> {
  length = 0;
  protected head?: ListNode<T>;
  protected tail?: ListNode<T>;
  protected current?: ListNode<T>;
  protected asArray: T[] = [];

  get(position: number): T | undefined {
    if (this.length === 0 || position < 0 || position >= this.length) {
      return void 0;
    }

    let current = this.head;

    for (let index = 0; index < position; index++) {
      current = current?.next;
    }

    return current?.value;
  }

  add(value: T, position: number = this.length): void {
    if (position < 0 || position > this.length) {
      throw new Error('Position is out of the list');
    }

    const node: ListNode<T> = {
      value,
      next: undefined,
      previous: undefined
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.current = node;
    } else {
      if (position === 0 && this.head) {
        // first node
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
      } else if (position === this.length && this.tail) {
        // last node
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
      } else {
        // node in middle
        const currentPreviousNode = this.getNode(position - 1);
        const currentNextNode = currentPreviousNode?.next;
        if (currentPreviousNode && currentNextNode) {
          currentPreviousNode.next = node;
          currentNextNode.previous = node;
          node.previous = currentPreviousNode;
          node.next = currentNextNode;
        }
      }
    }
    this.length++;
    this.createInternalArrayRepresentation();
  }

  remove(position = 0): void {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    if (position === 0 && this.head) {
      // first node
      this.head = this.head.next;

      if (this.head) {
        // there is no second node
        this.head.previous = undefined;
      } else {
        // there is no second node
        this.tail = undefined;
      }
    } else if (position === this.length - 1 && this.tail?.previous) {
      // last node
      this.tail = this.tail.previous;
      this.tail.next = undefined;
    } else {
      // middle node
      const removedNode = this.getNode(position);
      if (removedNode?.next && removedNode.previous) {
        removedNode.next.previous = removedNode.previous;
        removedNode.previous.next = removedNode.next;
      }
    }

    this.length--;
    this.createInternalArrayRepresentation();
  }

  set(position: number, value: T): void {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    const node = this.getNode(position);
    if (node) {
      node.value = value;
      this.createInternalArrayRepresentation();
    }
  }

  toArray(): T[] {
    return this.asArray;
  }

  findAll(fn: (value: T, index: number) => boolean): { index: number, value: T }[] {
    let current = this.head;
    const result: { index: number, value: T }[] = [];

    if (!current) {
      return result;
    }

    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return result;
      }
      if (fn(current.value, index)) {
        result.push({ index, value: current.value });
      }
      current = current.next;

    }

    return result;
  }

  // Array methods overriding start
  push(...args: T[]): number {
    args.forEach((arg: T) => {
      this.add(arg);
    });

    return this.length;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }
    const last = this.tail;
    this.remove(this.length - 1);

    return last?.value;
  }

  unshift(...args: T[]): number {
    args.reverse();
    args.forEach((arg: T) => {
      this.add(arg, 0);
    });

    return this.length;
  }

  shift(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }
    const lastItem = this.head?.value;
    this.remove();

    return lastItem;
  }

  forEach(fn: (value: T, index: number) => void): void {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return;
      }
      fn(current.value, index);
      current = current.next;
    }
  }

  indexOf(value: T): number {
    let current = this.head;
    let position = -1;

    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return position;
      }
      if (current.value === value) {
        position = index;
        break;
      }
      current = current.next;
    }

    return position;
  }

  some(fn: (value: T) => boolean): boolean {
    let current = this.head;
    let result = false;
    while (current && !result) {
      if (fn(current.value)) {
        result = true;
        break;
      }
      current = current.next;
    }

    return result;
  }

  every(fn: (value: T) => boolean): boolean {
    let current = this.head;
    let result = true;
    while (current && result) {
      if (!fn(current.value)) {
        result = false;
      }
      current = current.next;
    }

    return result;
  }

  toString(): string {
    return '[Linked List]';
  }

  find(fn: (value: T, index: number) => boolean): T | void {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return;
      }
      if (fn(current.value, index)) {
        return current.value;
      }
      current = current.next;
    }
  }

  findIndex(fn: (value: T, index: number) => boolean): number {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return -1;
      }

      if (fn(current.value, index)) {
        return index;
      }

      current = current.next;
    }

    return -1;
  }

  protected getNode(position: number): ListNode<T>|undefined {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error('Position is out of the list');
    }

    let current = this.head;

    for (let index = 0; index < position; index++) {
      current = current?.next;
    }

    return current;
  }

  protected createInternalArrayRepresentation(): void {
    const outArray: T[] = [];
    let current = this.head;

    while (current) {
      outArray.push(current.value);
      current = current.next;
    }
    this.asArray = outArray;
  }

  // Array methods overriding END
}
