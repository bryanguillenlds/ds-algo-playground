class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BinaryTreeNode(value);

    if (!this.root) {
      this.root = newNode;

      return this;
    }

    let currentRoot = this.root;

    while(currentRoot) {
      if(newNode.value === currentRoot.value) {
        return this;
      }

      if(newNode.value < currentRoot.value) {
        if(!currentRoot.left) {
          currentRoot.left = newNode;
          return this;
        }
        currentRoot = currentRoot.left;
      } else {
        if(!currentRoot.right) {
          currentRoot.right = newNode;
          return this;
        }
        currentRoot = currentRoot.right;
      }
    }

    return this;
  }

  lookup(value) {
    if (!this.root) return false;

    let currentRoot = this.root;

    while(currentRoot) {
      if (value === currentRoot.value) {
        return true;
      }

      if (value < currentRoot.value) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot = currentRoot.right;
      }
    }

    return false;
  }

  remove(value) {
    if (!this.root) return false;

    let currentNode = this.root;
    let currentNodeParent = null;
    let cameFrom = null;

    // Loop while there is a node
    while (currentNode) {
      // If we found the node
      if (value === currentNode.value) {
        // 1. NODE HAS NO CHILDREN (leaf node)
        if (!currentNode.right && !currentNode.left) {
          // if the node is a lone root with no children
          // set it to null and return it
          if (!currentNodeParent) {
            this.root = null;
          } else if (cameFrom === 'R') {
            //if we came to the right, make parent point to null
            //to unlink the child
            currentNodeParent.right = null;
          } else {
            //if we came to the left, make parent point to null
            //to unlink the child
            currentNodeParent.left = null;
          }
        }

        // 2. NODE HAS ONLY 1 CHILD (right)
        if (currentNode.right && !currentNode.left) {
          if (!currentNodeParent) {
            // Removing lone root with one child and assigning new root
            this.root = currentNode.right;
          } else if (cameFrom === 'L') {
            //if we came to the left, make parent point to the left to it's right grandchild
            //to unlink the child
            currentNodeParent.left = currentNode.right;
          } else {
            //if we came to the right, make parent point to the right to it's right grandchild
            //to unlink the child
            currentNodeParent.right = currentNode.right;
          }
        } else if (currentNode.left && !currentNode.right) {
          //ONE CHILD (LEFT CHILD ONLY)
          if (!currentNodeParent) {
            // Removing lone root with one child and assigning new root
            this.root = currentNode.left;
          } else if (cameFrom === 'L') {
            //if we came to the left, make parent point to the left to it's left grandchild
            //to unlink the child
            currentNodeParent.left = currentNode.left;
          } else {
            //if we came to the right, make parent point to the right to it's left grandchild
            //to unlink the child
            currentNodeParent.right = currentNode.left;
          }
        }

        // 3. NODE HAS TWO CHILDREN
        // My Policy (pick smallest from bigger child):
        // Go to right child once, then keep going left until left is null (leftmost leaf node).
        // Copy its value into the node to be removed,
        // then delete that successor node from its original spot (it has no left child).
        if (currentNode.right && currentNode.left) {
          let successorParent = currentNode;
          let successorNode = currentNode.right;

          // Find the leftmost node in the right subtree (stop when left is null
          // meaning we reached the leftmost node. It may have a right child, but no left anymore)
          while(successorNode.left) {
            successorParent = successorNode;
            successorNode = successorNode.left;
          }

          // Copy the successor node's value to the current node
          // we will unlink the successor node later but we want it's value to replace
          // the value of the node to be deleted
          currentNode.value = successorNode.value;

          // if the successor was the immediate right child of the node to be removed
          if (successorParent === currentNode) {
            // We can just point to the right child of the successor
            // (Successor has no left child by definition; its right may exist or be null, so we point to that)
            successorParent.right = successorNode.right;
          } else {
            // successor was somewhere down the left chain of the right subtree
            // now we make it point to the right child of the successor
            // we are just disconnecting the successor
            // (because we already got its value copied to the node to be removed)
            // so garbage collection will take care of it
            successorParent.left = successorNode.right;
          }
        }

        return true;
      }

      // if current is less than value we are looking for
      if (currentNode.value < value) {
        currentNodeParent = currentNode; //make currentnode new parent for next iteration
        currentNode = currentNode.right; //advance to where the bigger nodes are
        cameFrom = 'R'; //signal that we have moved to the right
      } else {
        // if current is greater than value we're looking for
        currentNodeParent = currentNode; //make currentnode new parent for next iteration
        currentNode = currentNode.left; //advance to where the smaller nodes are
        cameFrom = 'L'; //signal that we have moved to the left
      }
    }

    return false;
  }
}