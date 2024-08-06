class HashMap {
  constructor() {
    this.buckets = [];
    this.size = 16;
    this.loadFactor = 0.75;

    for (let i = 0; i < this.size; i++) {
      // Let's pretend these are linked lists
      this.buckets.push([]);
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key) % this.size;
    const bucket = this.buckets[index];
    const existingEl = bucket.find((el) => el.key === key);

    if (existingEl) {
      existingEl.value = value;
    } else {
      bucket.push({ key, value });
    }
  }

  get(key) {}

  has(key) {}

  remove(key) {}

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
