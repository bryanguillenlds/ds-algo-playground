/**
 * WHAT IS TIME COMPLEXITY?
 *
 * Time complexity helps us understand how the runtime of our code grows as the input size increases.
 * It answers questions like: "If I give my function more data to process, how much longer will it take?"
 * We use Big O notation (like O(n) or O(1)) to describe this relationship between input size and runtime.
 * This helps us write more efficient code by choosing algorithms that scale well with larger inputs.
 */


/* O(n) --> LINEAR TIME COMPLEXITY
	Means that the time it takes to run the function is directly proportional to the size of the input.
	The more items in the array, the longer it takes to find Nemo.
	This is because the function has to iterate through the entire array to find Nemo.
*/

const nemo = ['nemo'];
const everyone = ['dory', 'bruce', 'marlin', 'nemo', 'gill', 'bloat', 'nigel', 'squirt', 'darla', 'hank'];

function findNemo(array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === 'nemo') {
			console.log('LINEAR TIME OUTPUT:Found NEMO!');
		}
	}
}

findNemo(everyone);

/* O(1) --> CONSTANT TIME COMPLEXITY
	Means that the time it takes to run the function is the same regardless of the size of the input.
	The function will always take the same amount of time to run, no matter how many items are in the array.
	Even if the array is 1000 items long, the function will still take the same amount of time to run.
*/

const boxes = [0, 1, 2, 3, 4, 5];

function logFirstTwoBoxes(boxes) {
	console.log('CONSTANT TIME OUTPUT: ', boxes[0], boxes[1]);
}

logFirstTwoBoxes(boxes);

/* RULE 1: WORST CASE SCENARIO
	This means that we should always consider the worst case scenario when analyzing the time complexity of a function.
	For example, if we have a function that finds the first item in an array, we should consider the worst case scenario
	which is when the item is not in the array or is the last item in the array.
*/

const array = [1, 2, 3, 4, 5];

function findItem(array, item) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === item) {
			return i;
		}
	}
	return -1;
}

findItem(array, 6);

/* RULE 2: REMOVE CONSTANTS
	This means that we should remove constants from the time complexity of a function.
	For example, if we have a function that finds the first item in an array, we should remove the constant 1 from the time complexity.
*/

function printFirstItemThenNItems(items) {
	console.log(items[0]); // O(1)

	for(let i = 0; i < items.length; i++) { // O(n)
		console.log(items[i]); // O(n)
	}
}
// Time Complexity: O(1 + n) --> O(n)
// We drop the constant 1 since it becomes insignificant as n grows


/* RULE 3: DIFFERENT TERMS FOR INPUTS
	This means that we should consider the different terms for inputs when analyzing the time complexity of a function.
	For example, if we have a function that finds the first item in an array, we should consider the different terms for inputs
	which is when the item is not in the array.
*/

const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function findItem3(array, item) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			console.log(array[i], array[j]);
		}
	}
}

findItem3(array3, 6);

/* RULE 4: DROP NON-DOMINANT TERMS
	This means that we should drop non-dominant terms when analyzing the time complexity of a function.
	For example, if we have a function that finds the first item in an array, we should drop the non-dominant term
	which is when the item is not in the array.
*/

const array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function findItem4(array, item) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			console.log(array[i], array[j]);
		}
	}
}

findItem4(array4, 6);