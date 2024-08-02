function merge(a, b) {
  const merged = [];
  let i = 0;
  let k = 0;
  const aLen = a.length;
  const bLen = b.length;

  while (i < aLen && k < bLen) {
    if (a[i] <= b[k]) {
      merged.push(a[i]);
      i++;
    } else {
      merged.push(b[k]);
      k++;
    }
  }
  while (i < aLen) {
    merged.push(a[i]);
    i++;
  }
  while (k < bLen) {
    merged.push(b[k]);
    k++;
  }
  return merged;
}

function mergeSort(array, l, r) {
  if (l === r) {
    return array.slice(l, r + 1);
  }
  const m = Math.floor((l + r) / 2);
  const a = mergeSort(array, l, m);
  const b = mergeSort(array, m + 1, r);
  return merge(a, b);
}

const array = [3, 8, 1, 12, 9, -8];
console.log(mergeSort(array, 0, array.length - 1));
