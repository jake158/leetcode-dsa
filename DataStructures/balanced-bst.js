class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const sorted = array.sort((a, b) => a - b);
    this.root = this.buildTree(sorted, 0, sorted.length - 1);
    this.prettyPrint(this.root);
  }

  buildTree(sortedArray, left, right) {
    if (left > right) {
      return null;
    }
    const m = Math.floor((left + right) / 2);

    const node = new Node(sortedArray[m]);
    node.left = this.buildTree(sortedArray, left, m - 1);
    node.right = this.buildTree(sortedArray, m + 1, right);
    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
new Tree(arr);
