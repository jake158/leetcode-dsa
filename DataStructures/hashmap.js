class HashMap {
  constructor() {
    this.size = 16;
    this.itemsStored = 0;
    this.loadFactor = 0.75;
    this.#initializeBuckets();
  }

  #initializeBuckets() {
    this.buckets = [];
    for (let i = 0; i < this.size; i++) {
      // Let's pretend these are linked lists
      this.buckets.push([]);
    }
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  #getBucket(forKey) {
    const index = this.#hash(forKey) % this.size;
    return this.buckets[index];
  }

  set(key, value) {
    const bucket = this.#getBucket(key);
    const existingEl = bucket.find((el) => el.key === key);

    if (existingEl) {
      existingEl.value = value;
    } else {
      bucket.push({ key, value });
      this.itemsStored++;
    }
  }

  get(key) {
    const bucket = this.#getBucket(key);
    const existingEl = bucket.find((el) => el.key === key);
    return existingEl ? existingEl.value : null;
  }

  has(key) {
    const bucket = this.#getBucket(key);
    const existingEl = bucket.find((el) => el.key === key);
    return existingEl ? true : false;
  }

  remove(key) {
    const bucket = this.#getBucket(key);
    const itemIndex = bucket.indexOf((el) => el.key === key);

    if (itemIndex) {
      bucket.splice(itemIndex, 1);
      this.itemsStored--;
      return true;
    }
    return false;
  }

  length() {
    return this.itemsStored;
  }

  clear() {
    this.#initializeBuckets();
  }

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
