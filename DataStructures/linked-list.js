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
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }
    this.head = node;
  }

  at(index) {}

  insertAt(value, index) {}

  removeAt(index) {}

  pop() {}

  contains(value) {}

  find(value) {}

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
