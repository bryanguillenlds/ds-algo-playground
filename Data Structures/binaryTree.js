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

    while(currentNode) {
      if (value === currentNode.value) {
        //figure out re-linking

        //No children / leaf node
        if (!currentNode.right && !currentNode.left) {
          if (!currentNodeParent) {
            // Removing lone root with no children
            this.root = null;
          } else if (cameFrom === 'R') {
            currentNodeParent.right = null;
          } else {
            currentNodeParent.left = null;
          }
        }

        //One child (right)
        if (currentNode.right && !currentNode.left) {
          if (!currentNodeParent) {
            // Removing lone root with one child
            this.root = currentNode.right;
          } else if (cameFrom === 'L') {
            currentNodeParent.left = currentNode.right;
          } else {
            currentNodeParent.right = currentNode.right;
          }
        } else if (currentNode.left && !currentNode.right) {
          //One child (left)
          if (!currentNodeParent) {
            // Removing lone root with one child
            this.root = currentNode.left;
          } else if (cameFrom === 'L') {
            currentNodeParent.left = currentNode.left;
          } else {
            currentNodeParent.right = currentNode.left;
          }
        }

        // Two children:
        // go to right child, then keep going left until left is null (leftmost).
        // Copy its value here, then delete that successor node from its original spot (it has no left child).
        if (currentNode.right && currentNode.left) {
          let successorParent = currentNode;
          let successorNode = currentNode.right;

          // Find the leftmost node in the right subtree (stop when left is null)
          while(successorNode.left) {
            successorParent = successorNode;
            successorNode = successorNode.left;
          }

          // Copy the successor node's value to the current node
          currentNode.value = successorNode.value;

          // if the successor was the immediate right child of the current node
          if (successorParent === currentNode) {
            // we know the successor right pointer is null, so we can just point to the right child of the successor
            successorParent.right = successorNode.right;
          } else {
            // successor was somewhere down the left chain of the right subtree
            successorParent.left = successorNode.right;
          }
        }
      }

      if (value < currentNode.value) {
        currentNodeParent = currentNode;
        currentNode = currentNode.left;
        cameFrom = 'L';
      } else {
        currentNodeParent = currentNode;
        currentNode = currentNode.right;
        cameFrom = 'R';
      }
    }
  }
}