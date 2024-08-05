class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }
    if (!this.head) {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }
    this.head = node;
    this.size++;
  }

  at(index) {
    let currPos = 0;
    let curr = this.head;
    while (currPos < index) {
      curr = curr.next;
      currPos++;
    }
    return curr;
  }

  pop() {
    let curr = this.head;
    if (!curr) return;

    while (curr.next && curr.next != this.tail) {
      curr = curr.next;
    }
    curr.next = null;
    this.tail = curr;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  contains(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  find(value) {
    let curr = this.head;
    let index = 0;
    while (curr) {
      if (curr.value === value) {
        return index;
      }
      index++;
      curr = curr.next;
    }
    return null;
  }

  toString() {
    let out = '';
    let curr = this.head;
    while (curr) {
      out += `( ${curr.value} ) -> `;
      curr = curr.next;
    }
    out += 'null';
    return out;
  }
}

const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('hamster');
list.append('snake');
list.prepend('turtle');
list.prepend('parrot');

console.log(list.toString());
console.log(list.find('snake'));
