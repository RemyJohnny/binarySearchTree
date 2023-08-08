/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */

/** **************** NODE FACTORY ***************** */

function NODE(data) {
  return { data, left: null, right: null };
}

/** **************** TREE CLASS ********************* */

export default class Tree {
  constructor(array) {
    const cleanArr = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(cleanArr, 0, cleanArr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2, 10);
    let node = NODE(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  /* insert(data, root = this.root) {
    if (root === null) {
      root = NODE(data);
      return root;
    }
    if (data < root.data) {
      root.left = this.insert(data, root.left);
    } else if (data > root.data) {
      root.right = this.insert(data, root.right);
    }
    return root;
  } */
  insert(data) {
    if (this.root === null) {
      this.root = NODE(data);
      return;
    }
    let prev = null;
    let temp = this.root;
    while (temp !== null) {
      if (data < temp.data) {
        prev = temp;
        temp = temp.left;
      } else if (data > temp.data) {
        prev = temp;
        temp = temp.right;
      }
    }
    if (data < prev.data) prev.left = NODE(data);
    else prev.right = NODE(data);
  }

  delete(data, root = this.root) {
    if (root === null) {
      return root;
    }
    // recursion
    if (data < root.data) {
      root.left = this.delete(data, root.left);
      return root;
    } else if (data > root.data) {
      root.right = this.delete(data, root.right);
      return root;
    }
    // ***
    // set to null if one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      root = null;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      root = null;
      return temp;
    } else {
      let sucParent = root;
      let suc = root.right;
      while (suc.left !== null) {
        sucParent = suc;
        suc = suc.left;
      }
      if (sucParent !== root) {
        sucParent.left = suc.right;
      } else {
        sucParent.right = suc.right;
      }
      root.data = suc.data;

      suc = null;
      return root;
    }
  }

  find(data, temp = this.root) {
    while (temp !== null) {
      if (data === temp.data) {
        return temp;
      }
      if (data < temp.data) {
        temp = temp.left;
      } else if (data > temp.data) {
        temp = temp.right;
      }
    }
    return null;
  }

  // Level Order BREADTH-FIRST traverser

  levelOrder(callback, root = this.root) {
    if (root === null) return [];
    let queue = [];
    let result = [];
    queue.push(root);
    while (queue.length !== 0) {
      let node = queue.shift();
      result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      if (callback) callback(node);
    }
    if (!callback) return result;
  }

  // preOrder DEPTH-FIRST traverser

  preOrder(callback, root = this.root, res = []) {
    if (root === null) return [];

    res.push(root.data);
    if (callback) callback(root);
    this.preOrder(callback, root.left, res);
    this.preOrder(callback, root.right, res);
    if (!callback) return res;
  }

  // inOrder DEPTH-FIRST traverser

  inOrder(callback, root = this.root, res = []) {
    if (root === null) return [];

    this.inOrder(callback, root.left, res);
    res.push(root.data);
    if (callback) callback(root);
    this.inOrder(callback, root.right, res);
    if (!callback) return res;
  }

  // postOrder DEPTH-FIRST traverser

  postOrder(callback, root = this.root, res = []) {
    if (root === null) return [];

    this.postOrder(callback, root.left, res);
    this.postOrder(callback, root.right, res);
    res.push(root.data);
    if (callback) callback(root);
    if (!callback) return res;
  }
  // ***

  height(node, found = this.find(node)) {
    if (found === null) return -1;
    let left = this.height(node, found.left);
    let right = this.height(node, found.right);
    if (left > right) {
      return left + 1;
    } else return right + 1;
  }

  depth(data, temp = this.root) {
    let depth = 0;
    while (temp !== null) {
      if (data === temp.data) {
        return depth;
      }
      if (data < temp.data) {
        temp = temp.left;
      } else if (data > temp.data) {
        temp = temp.right;
      }
      depth += 1;
    }
    return -1;
  }

  isBalanced(tree = this.root) {
    let diff = 0;
    let left = this.height(tree.data, tree.left);
    let right = this.height(tree.data, tree.right);
    if (left > right) diff = left - right;
    else diff = right - left;

    if (diff < 2) return true;
    return false;
  }

  reBalance() {
    const arr = this.inOrder();
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
}
