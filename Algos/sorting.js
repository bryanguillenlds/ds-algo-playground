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

    //After we've determined the smallest, swap with current first elementee
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