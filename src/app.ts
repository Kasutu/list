export abstract class List<T> {
  public abstract add(item: T): void;
  public abstract unshift(item: T): void;
  public abstract get(index: number): T | undefined;
  public abstract get length(): number;
}

export class ArrayList<T> extends List<T> {
  private data: T[] = Object.seal(new Array(5).fill(null));
  private count = 0;

  public unshift(item: T): void {
    throw new Error('Method not implemented.');
  }

  public add(item: T): void {
    if (this.count >= this.data.length) {
      const temp: T[] = Array.from(this.data);
      this.data = Object.seal(new Array(this.data.length * 2).fill(null));

      for (let i = 0; i < temp.length; i++) {
        this.data[i] = temp[i];
      }
    }

    this.data[this.count] = item;
    this.count++;
  }

  public get(index: number): T | undefined {
    return this.data[index];
  }

  public get length() {
    return this.count;
  }
}

class LinkedListNode<T> {
  constructor(public data: T, public next?: LinkedListNode<T>) {}
}

class LinkedList<T> extends List<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;
  private count = 0;

  public unshift(item: T): void {
    // unshift implementation

    // all the data
    let oldHead = this.head;

    this.head = new LinkedListNode(item);
    this.head.next = oldHead;

    this.count++;
  }

  public add(item: T): void {
    if (!this.head) {
      this.head = new LinkedListNode(item);
      this.tail = this.head;
    } else {
      this.tail!.next = new LinkedListNode<T>(item);
      this.tail = this.tail!.next;
    }

    this.count++;
  }

  public get(index: number): T | undefined {
    let current = this.head;
    let hops = 0;

    while (current !== null && hops !== index) {
      current = current?.next;
      hops++;
    }

    return current?.data;
  }

  public get length() {
    return this.count;
  }
}

function test() {
  let list: List<string> = new LinkedList();

  list.add('iron man');
  list.add('tail');
  list.add('tail');
  list.add('tail');
  list.add('endgame');

  list.unshift('newItemHAHAHAHHAWEEEEEEEEEEEEEEEEEEEEEEEE');
  list.unshift('heheh');
  list.unshift('lodii');
  list.unshift('bwahahahhahaha');
  list.unshift('ez');

  for (let i = 0; i < list.length; i++) {
    console.log(list.get(i));
  }
}

test();
