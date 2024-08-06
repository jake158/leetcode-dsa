class HashMap {
  constructor() {
    this.size = 16;
    this.loadFactor = 0.75;
    this.#initializeBuckets();
  }

  #initializeBuckets() {
    this.itemsStored = 0;
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

  #rebalance() {
    if (this.itemsStored > this.size * this.loadFactor) {
      console.log(this.buckets);
      console.log('\nRebalancing...\n');

      const currentEntries = this.entries();
      this.size *= 2;
      this.#initializeBuckets();
      for (const [key, value] of currentEntries) {
        this.set(key, value);
      }

      console.log(this.buckets);
    }
  }

  set(key, value) {
    const bucket = this.#getBucket(key);
    const existingEl = bucket.find((el) => el.key === key);

    if (existingEl) {
      existingEl.value = value;
    } else {
      bucket.push({ key, value });
      this.itemsStored++;
      this.#rebalance();
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

  keys() {
    const keyArray = [];
    for (const bucket of this.buckets) {
      for (const element of bucket) {
        keyArray.push(element.key);
      }
    }
    return keyArray;
  }

  values() {
    const valArray = [];
    for (const bucket of this.buckets) {
      for (const element of bucket) {
        valArray.push(element.value);
      }
    }
    return valArray;
  }

  entries() {
    const entArray = [];
    for (const bucket of this.buckets) {
      for (const element of bucket) {
        entArray.push([element.key, element.value]);
      }
    }
    return entArray;
  }
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
test.set('lion', 'even more golden');

// Causes rebalance:
test.set('moon', 'silver');
