function bubbleSort(array) {
  //avoid going out of bounds since we will be comparing to the next element always
  const length = array.length - 1;

  // Flag to check if any swaps were made in the inner loop
  let swapped = false;

  // Loop through the entire array
  for (let i = 0; i < length; i++) {
    // Another loop to compare the elements
    // For every element in the array, compare it with the next element
    // We don't need to compare the last element since it will be the largest after the first pass
    // This is why we subtract i from the length (i represents the number of passes we've made so far)
    for (let j = 0; j < length - i; j++) {
      // If the current element is greater than the next element, swap them
      if (array[j] > array[j + 1]) {
        let currentEl = array[j];
        array[j] = array[j + 1];
        array[j + 1] = currentEl;

        swapped = true; //set the flag to true to indicate that a swap was made
      }
    }

    if (!swapped) break; //if no swaps were made in the inner loop, the array is sorted and we can break out of the inner loop
  }

  return array;
}


function selectionSort(array) {
  const length = array.length;

  // Loop through all items in array
  for (let i = 0; i < length - 1; i++) {
    // Variable to keep track of the smallest element
    // set to be current position being compared to.
    let smallest = i;
    // Variable to hold the reference to the currentEl so we can swap later
    // when we find the smallest
    let currentEl = array[i];

    //Another loop to find the smallest element in the remaining unsorted portion of the array
    //so we can swap later with the current element
    for (let j = i + 1; j < length; j++) {
      // If the current element is smaller than the current smallest element
      // set the smallest to the current element
      if (array[j] < array[smallest]) {
        smallest = j;
      }
    }

    //After we've determined the smallest, swap with current first element
    //Only swap if the smallest isn't already in the right position
    if (i !== smallest) {
      array[i] = array[smallest];
      array[smallest] = currentEl;
    }
  }
  return array;
}


function insertionSort(array) {
  // Start from the second element (index 1)
  // The first element is considered already "sorted", for now.
  for (let i = 1; i < array.length; i++) {
    // Step 1: "Lift" the current element out, leaving a "hole" at position i
    // Store the current element that we're trying to find a place toinsert
    let currentElement = array[i];

    // Step 2: Start looking left/previous to find where it belongs
    let j = i - 1;

    // Step 3: While we haven't reached the start of the array, and the previous element is
    // greater than our current element, slide/shift that previous/left element to the right
    // to fill the "hole" left by the current element.
    while (j >= 0 && array[j] > currentElement) {
      // Move the larger element one position to the right (hole moves left)
      array[j + 1] = array[j];
      // Move to the previous element to keep comparint to previous elements
      j--;
    }

    // If not the same element (meaning it is NOT already in the correct position)
    if (array[j + 1] !== currentElement) {
      // Step 4: Insert the currentElement in its correct position (the hole we left)
      // j + 1 is where currentElement should go since we moved the larger element to the right already
      array[j + 1] = currentElement;
    }
  }

  return array;
}

function mergeSortedArrays(array1, array2) {
  // If either array is empty, return the other array
  if (array1.length === 0) return array2;
  if (array2.length === 0) return array1;

  //What do I need to track or store?
  // - The current item in array1 (item 0)
  // - The current item in array2 (item 0)
  // - The current index in array1 (start from the second item? I don't see the need for this, couldn't it be item 0?)
  // - The current index in array2 (start from the second item? I don't see the need for this, couldn't it be item 0?)
  // - The merged array (empty to begin with)
  let currentItem1 = array1[0];
  let currentItem2 = array2[0];
  let i = 0;
  let j = 0;
  let mergedArray = [];

  // What are the conditions for the loop?
  // Loop while there's still items in at least one of the arrays (check if current item exists, if not, break)
  // - IF the item in array2 does not exists (meaning we reached the end of that array)
  // OR
  // item from array1 is smaller than the item from array2
  //    - push that item into array
  //    - increase index
  //    - set current item to be the next for next time?
  // - ELSE (if the item from array2 exists (meaning array is not empty)
  // AND
  // the item from array2 is the smaller item)
  //    - push that item into array
  //    - increase index
  //    - set current item to be the next for next time?
  //(the above conditions will make sure leftover items are pushed if the other array has already been exhausted)
  while(currentItem1 !== undefined || currentItem2 !== undefined) {
    if(currentItem2 === undefined || currentItem1 < currentItem2) {
      mergedArray.push(currentItem1);
      i++;
      currentItem1 = array1[i];
    } else {
      mergedArray.push(currentItem2);
      j++;
      currentItem2 = array2[j];
    }
  }

  // Return mergedarray
  return mergedArray;
}

function mergeSort(array) {
  // Base case: If the array is empty or has one element, return the array
  if (array.length === 0 || array.length === 1) return array;

  // Recursive case: Break in halves
  const midPoint = Math.floor(array.length / 2);
  const left = array.slice(0, midPoint);
  const right = array.slice(midPoint);

  // Each mergeSort(...) call stops at the line where it calls another mergeSort and waits for that result.
	// The recursion goes down the left side first (depth-first), all the way to base cases,
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Recursion unwinds (returns), then does the right side, then merges.
  return mergeSortedArrays(sortedLeft, sortedRight);
}