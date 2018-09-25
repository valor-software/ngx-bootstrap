
// linked-list

export interface Node<T> {
  value: T;
  next: undefined | Node<T>;
  previous: undefined | Node<T>;
}

export interface NodeComponent<T> {
  index: number;
  value: T;
}

// triggers

export interface Alias {
  hover?: string[];
  focus?: string[];
  dblclick?: string;
  keydown?: string;
  mouseenter?: string;
  click?: string;
  [key: string]: string[] | string;
}
