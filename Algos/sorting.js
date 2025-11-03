/**
 * BUBBLE SORT
 *
 * Mental Map: Like bubbles rising to the surface, larger elements gradually "bubble up"
 * to the end of the array by repeatedly comparing adjacent pairs and swapping them if
 * they're in the wrong order. Each pass guarantees the largest unsorted element reaches
 * its correct position at the end.
 *
 * When to use:
 * - Small arrays (typically < 50 elements)
 * - Educational purposes to understand sorting concepts
 * - Nearly sorted data (with optimization flag)
 * - Simple code requirement (easy to implement and understand)
 *
 * Input type: Array of comparable elements (numbers, strings, etc.)
 *
 * When NOT to use:
 * - Large arrays (O(n²) time complexity makes it inefficient)
 * - Performance-critical applications
 * - When stability isn't required (though bubble sort is stable)
 */
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


/**
 * SELECTION SORT
 *
 * Mental Map: Like finding the smallest toy from a box and placing it first, then the
 * second smallest, and so on. The algorithm repeatedly finds the minimum element from
 * the unsorted portion and places it at the beginning of the sorted portion.
 *
 * When to use:
 * - Small arrays (< 50 elements)
 * - When minimizing the number of swaps is important (only n swaps total)
 * - When memory writes are expensive (limited writes)
 * - Simple implementation needed
 *
 * Input type: Array of comparable elements (numbers, strings, etc.)
 *
 * When NOT to use:
 * - Large arrays (O(n²) time complexity)
 * - When stability is required (selection sort is NOT stable - equal elements may change order)
 * - Performance-critical applications
 * - When you need adaptive sorting (doesn't benefit from partially sorted data)
 */
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


/**
 * INSERTION SORT
 *
 * Mental Map: Like sorting playing cards in your hand - you pick up each card and insert
 * it into its correct position by comparing it with cards already in your hand, shifting
 * larger cards to the right to make room.
 *
 * When to use:
 * - Small arrays (< 50 elements)
 * - Nearly sorted or partially sorted arrays (very efficient - O(n) best case)
 * - Online algorithms (sorting data as it arrives one item at a time)
 * - Stable sort is required (preserves relative order of equal elements)
 * - Simple implementation needed
 * - Adaptive sorting (performance improves with partially sorted data)
 *
 * Input type: Array of comparable elements (numbers, strings, etc.)
 *
 * When NOT to use:
 * - Large arrays (O(n²) worst case)
 * - Random/unsorted data where O(n²) performance is unacceptable
 * - When worst-case performance is critical
 */
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

/**
 * MERGE SORT (Helper function)
 *
 * Merges two already-sorted arrays into a single sorted array by comparing elements
 * from both arrays and selecting the smaller one at each step.
 */
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
    if(currentItem2 === undefined || currentItem1 <= currentItem2) {
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

/**
 * MERGE SORT
 *
 * Mental Map: Divide and conquer approach - like splitting a deck of cards into halves
 * recursively until you have single cards, then merging them back together in sorted
 * order. The "divide" phase splits the array in half repeatedly until base case (1 element).
 * The "conquer" phase merges sorted halves back together.
 *
 * When to use:
 * - Large arrays where O(n log n) guaranteed performance is needed
 * - When worst-case O(n log n) is required (stable and predictable)
 * - External sorting (works well with large datasets that don't fit in memory)
 * - When stability is required (preserves relative order of equal elements)
 * - Linked lists (efficient merge operation)
 * - When consistent performance matters more than best-case speed
 *
 * Input type: Array of comparable elements (numbers, strings, etc.)
 *
 * When NOT to use:
 * - Very small arrays (overhead of recursion/merging may outweigh benefits)
 * - When space is extremely limited (requires O(n) additional memory)
 * - When in-place sorting is required (merge sort needs extra space)
 * - Arrays that are already mostly sorted (other algorithms like insertion sort may be faster)
 * - When random access is expensive (merge sort needs frequent array access)
 */
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

/**
 * QUICK SORT (Helper function)
 *
 * Partitions the array around a pivot element - all elements smaller than the pivot
 * go to the left, all larger go to the right, then returns the final index of the pivot.
 */
function pivot(array, startIndex = 0, endIndex = array.length - 1) {

  //method that swaps two elements in an array
  const swapper = (array, index1, index2) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };

  // Index to keep track of where pivot should end up
  let pivotIndexTracker = startIndex;
  // Chosen pivot (first element)
  const pivot = array[startIndex];

  // Loop through whole array (starting at the second element, because the first is our chosen pivot)
  // to find where the chosen pivot should end up
  for (let i = startIndex + 1; i <= endIndex; i++) {
    // If chosen pivot is greater than current element (we choose the pivot to be the first element)...
    if (pivot > array[i]) {
      // increment the pivotIndexTracker
      pivotIndexTracker++;

      // swap current element with elevement where the tracker currently is
      swapper(array, i, pivotIndexTracker);
    }
  }

  // Swap our chosen pivot (first element of array) with the element where the tracker ended up after all swaps
  swapper(array, startIndex, pivotIndexTracker);

  return pivotIndexTracker;
}

/**
 * QUICK SORT
 *
 * Mental Map: Like organizing books on a shelf - pick a "pivot" book, put smaller books
 * to its left and larger books to its right. Then recursively sort the left and right
 * sections using the same approach until everything is sorted.
 *
 * When to use:
 * - Large arrays where average-case O(n log n) performance is acceptable
 * - General-purpose sorting (often fastest in practice due to small constants)
 * - In-place sorting preferred (sorts in-place with only O(log n) extra space for recursion)
 * - When average performance matters more than worst-case guarantee
 * - Real-world data (typically well-distributed)
 *
 * Input type: Array of comparable elements (numbers, strings, etc.)
 *
 * When NOT to use:
 * - When worst-case O(n log n) guarantee is required (worst case is O(n²))
 * - Nearly sorted or reverse-sorted data (if pivot selection is naive - picks first/last element)
 * - When stability is required (standard quick sort is NOT stable)
 * - Small arrays (overhead of recursion may be slower than simpler algorithms)
 * - When you need consistent performance regardless of input distribution
 * - When space is extremely limited (even O(log n) recursion stack may matter)
 */
function quickSort(array, left = 0, right = array.length - 1) {
  // If left index is less than right index,
  // it means there are still elements to be sorted (more than one element)
  if (left < right) {
    // Get the pivot index
    let pivotIndex = pivot(array, left, right);

    // Recursive call quicksort on the left side of the pivot (from the start of the array to the pivot index - 1)
    quickSort(array, left, pivotIndex - 1);

    // Recursive call quicksort on the right side of the pivot (from the pivot index + 1 to the end of the array)
    quickSort(array, pivotIndex + 1, right);
  }

  // Base case: if we don't get into the condition above,
  // it means there are no elements to be sorted
  // (there is only one element left, by definition already sorted)
  return array;
}