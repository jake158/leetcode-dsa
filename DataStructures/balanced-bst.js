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
    const noDuplicates = [...new Set(sorted)];
    this.root = this.buildTree(noDuplicates, 0, noDuplicates.length - 1);
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
      if (value === curr.data) {
        // Item already exists
        return;
      } else if (value <= curr.data) {
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

    if (!curr) {
      // Item not found
      return;
    } else if (!curr.left && !curr.right) {
      parent[isLeftChild ? 'left' : 'right'] = null;
    } else if ((!curr.left && curr.right) || (!curr.right && curr.left)) {
      parent[isLeftChild ? 'left' : 'right'] = curr.right ?? curr.left;
    } else {
      const smallestBiggerChild = this.#findSmallestNode(curr.right);
      this.deleteItem(smallestBiggerChild.data);
      curr.data = smallestBiggerChild.data;
    }
  }

  #findSmallestNode(subTree) {
    return subTree.left ? this.#findSmallestNode(subTree.left) : subTree;
  }

  find(value) {
    let curr = this.root;
    let parent = null;

    while (curr && curr.data != value) {
      if (value <= curr.data) {
        parent = curr;
        curr = curr.left;
      } else if (value > curr.data) {
        parent = curr;
        curr = curr.right;
      }
    }
    return curr ?? -1;
  }

  levelOrder(callback) {
    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const curr = queue.shift();
      if (curr) {
        queue.push(curr.left);
        queue.push(curr.right);
        callback(curr);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (!node) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!node) {
      return;
    }
    this.inOrder(callback, node.left);
    this.inOrder(callback, node.right);
    callback(node);
  }

  postOrder(callback, node = this.root) {
    if (!node) {
      return;
    }
    callback(node);
    this.inOrder(callback, node.left);
    this.inOrder(callback, node.right);
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
tree.deleteItem(8);
tree.prettyPrint(tree.root);
tree.inOrder((el) => console.log(el.data));
