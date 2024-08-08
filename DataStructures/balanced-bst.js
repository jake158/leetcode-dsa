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

  insert(value) {
    let curr = this.root;
    let parent = null;
    let isLeftChild = null;

    while (curr) {
      if (value <= curr.data) {
        parent = curr;
        isLeftChild = true;
        curr = curr.left;
      } else if (value > curr.data) {
        parent = curr;
        isLeftChild = false;
        curr = curr.right;
      }
    }

    if (!parent) {
      this.root = new Node(value);
    } else if (isLeftChild) {
      parent.left = new Node(value);
    } else {
      parent.right = new Node(value);
    }
  }

  deleteItem(value) {
    let curr = this.root;
    let parent = null;
    let isLeftChild = null;

    while (curr && curr.data != value) {
      if (value <= curr.data) {
        parent = curr;
        isLeftChild = true;
        curr = curr.left;
      } else if (value > curr.data) {
        parent = curr;
        isLeftChild = false;
        curr = curr.right;
      }
    }

    if (!parent) {
      // Implement
      return;
    } else if (!curr.left && !curr.right) {
      parent[isLeftChild ? 'left' : 'right'] = null;
    } else if ((!curr.left && curr.right) || (!curr.right && curr.left)) {
      parent[isLeftChild ? 'left' : 'right'] = curr.right ?? curr.left;
    } else {
      // Implement
      const smallestBiggerChild = this.#findSmallestNode(curr.right);
    }
  }

  #findSmallestNode(subTree) {
    return subTree.left ? this.#findSmallestNode(subTree.left) : subTree;
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
const tree = new Tree(arr);
tree.insert(-1);
tree.prettyPrint(tree.root);
