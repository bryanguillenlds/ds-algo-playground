class Stack {
  constructor() {
    this.array = [];
  }

  push(value) {
    this.array.push(value);
    return this;
  }

  pop() {
    if (this.array.length === 0) {
      return null;
    }

    this.array.pop();
    return this;
  }

  peek() {
    if (this.array.length === 0) {
      return null;
    }

    return this.array[this.array.length - 1];
  }

  isEmpty() {
    return this.array.length === 0;
  }
}