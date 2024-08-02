function contains(object, val) {
  let result = false;
  for (const key of Object.keys(object)) {
    result =
      typeof object[key] === 'object'
        ? contains(object[key], val)
        : object[key] === val;
    return result;
  }
}

const nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: 'foo2',
            thingy: {},
          },
        },
      },
    },
  },
};

console.log(contains(nestedObject, 44)); // true
console.log(contains(nestedObject, 'foo')); // false
