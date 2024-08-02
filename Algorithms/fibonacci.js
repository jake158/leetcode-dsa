function fibonacciRecursive(n, arr = [0, 1], i = 2) {
  if (i >= n) {
    return arr;
  }
  arr.push(arr[i - 1] + arr[i - 2]);
  return fibonacciRecursive(n, arr, i + 1);
}

function fibonacciIterative(n) {
  const arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

console.log(fibonacciRecursive(6));
console.log(fibonacciIterative(6));
