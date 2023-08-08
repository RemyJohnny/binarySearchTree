// eslint-disable-next-line import/extensions
import Tree from "./BST.js";

/** *******************ODIN PRETTY PRINTER************************ */

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// generates random numbers and returns an  array of them
function randomArr(num, limit, from = 0) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(Math.floor(Math.random() * limit) + from);
  }
  return arr;
}
// adds random numbers to the tree passed to it
function addNumbers(len, tree) {
  const array = randomArr(len, 100, 100);
  for (let i = 0; i < len; i += 1) {
    tree.insert(array[i]);
  }
}
const tree = new Tree(randomArr(9, 100));

prettyPrint(tree.root); // prints the tree
console.log(tree.isBalanced()); // true

console.log(tree.levelOrder()); // Consoles d tree elements as array in level Order (BREADTH_FIRST)
console.log(tree.preOrder()); // Consoles the tree elements as array in pre-Order (DEPTH_FIRST)
console.log(tree.postOrder()); // Consoles the tree elements as array in post-Order (DEPTH_FIRST)
console.log(tree.inOrder()); // Consoles the tree elements as array in in-Order (DEPTH_FIRST)

addNumbers(5, tree); // Add extra numbers to the tree
prettyPrint(tree.root); // prints the tree
console.log(tree.isBalanced()); // false

tree.reBalance(); // reBalances the tree
prettyPrint(tree.root); // prints the tree
console.log(tree.isBalanced()); // true

console.log(tree.levelOrder()); // Consoles d tree elements as array in level Order (BREADTH_FIRST)
console.log(tree.preOrder()); // Consoles the tree elements as array in pre-Order (DEPTH_FIRST)
console.log(tree.postOrder()); // Consoles the tree elements as array in post-Order (DEPTH_FIRST)
console.log(tree.inOrder()); // Consoles the tree elements as array in in-Order (DEPTH_FIRST)

/*
console.log(tree.find(50));
console.log(tree.height(10));
console.log(tree.depth(10));
*/
