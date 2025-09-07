/* Static Arrays are fixed length arrays.
 * Dynamic Arrays are arrays that can grow in size.
 *
 * Dynamic arrays allow you to do more things, but in javascript, if we use the push method,
 * it will create a new array in memory and then copy the elements to the new array. It usually doubles the size of the array.
 *
 * Why it might be O(n) to add an element to the end of an array but must of the time it is O(1)?
 *
 * It is O(n) because if the array is full (the originally alocated space in memory), it will create a new array
 * and copy the elements to the new array.
 * But most of the time, the array is not full, so it is O(1). And how do we know most of the time is not full?
 * Because it doubles the size of the array when allocating new memory.
 *
 */

/* Implementation of an array in javascrit */
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return {
      item,
      length: this.length
    };
  }

  pop() {
    if (this.length === 0) {
      throw new Error("Array is empty");
    }

    const lastItem = this.data[this.length - 1];

    delete this.data[this.length - 1];
    this.length--;

    return {
      item: lastItem,
      length: this.length
    };
  }

  delete(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    const item = this.data[index];

    delete this.data[index];

    //shift items to the left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.length - 1];

    this.length--;

    return {
      item,
      length: this.length
    };
  }
}

/* Implement a function that reverses a string */
function reverseString(string) {

  if (typeof string !== 'string' ) {
    throw new Error("Input must be a string");
  } else if (string.length < 2) {
    throw new Error("String to be reversed must be more than 1 character");
  }

  // string.split('').reverse().join(''); // Option with built in methods.

  const reversedString = [];

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString.push(string[i]);
  }

  return reversedString.join('');
}

// console.log(reverseString("hello"));

/* Implement a method to merge two sorted arrays into a new sorted array */
function mergeSortedArrays(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error("Input must be an array");
  }
  if (array1.length === 0 && array2.length) {
    return array2;
  }
  if (array2.length === 0 && array1.length) {
    return array1;
  }

  const mergedArray = [];
  let array1CurrentItem = array1[0]; // To keep track of the current item in array1, we start with the first item
  let array2CurrentItem = array2[0]; // To keep track of the current item in array2, we start with the first item
  let i = 1; // To keep track of the current index in array1, we start with the second item
  let j = 1; // To keep track of the current index in array2, we start with the second item

  // Keep looping while there are still items in one of the arrays
  /*
    -Start with the first item from each array
    -Compare them and take the smaller one
    -Move to the next item in the array you just took from
    -Repeat until one array is empty
    -Add all remaining items from the non-empty array
  */
  while (array1CurrentItem || array2CurrentItem) {
    /* Add array1CurrentItem if EITHER:
      -Array2 current item is undefined (we've reached the end of the array)
        OR
      -The current item in array1 is smaller than the current item in array2
    */
    if (!array2CurrentItem || array1CurrentItem < array2CurrentItem) {
      mergedArray.push(array1CurrentItem);
      array1CurrentItem = array1[i]; //Update the current item in array1
      i++; //Move to the next item in array1
    } else {
      /* Add array2CurrentItem if BOTH:
        -Array2 is NOT empty (array2CurrentItem exists)
          AND
        -Array2's current item is smaller or equal
      */
      mergedArray.push(array2CurrentItem);
      array2CurrentItem = array2[j]; //Update the current item in array2
      j++; //Move to the next item in array2
    }
  }

  return mergedArray;
}

// console.log(mergeSortedArrays([1, 3, 7, 9], [2, 4, 6, 8, 10]));