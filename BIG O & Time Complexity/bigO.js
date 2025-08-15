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

/* O(n^2) --> QUADRATIC TIME COMPLEXITY
	Means that the time it takes to run the function is proportional to the square of the size of the input.
	The more items in the array, the longer it takes to find Nemo.
	This is because the function has to iterate through the entire array for each item in the array.
*/
const boxes2 = [0, 1, 2, 3, 4, 5];

function logAllPairsOfBoxes(boxes) {
	for (let i = 0; i < boxes.length; i++) {
		for (let j = 0; j < boxes.length; j++) {
			console.log(boxes[i], boxes[j]);
		}
	}
}

logAllPairsOfBoxes(boxes2);

// ------------------------------------------------------------------------------------------------

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
	For example, if we have a function that takes two different arrays as input parameters, we need to use different variables
	like O(a + b) to represent their sizes, since the arrays could have different lengths. We can't just use O(n) when there
	are multiple independent inputs.
*/

const items = [1, 2, 3, 4, 5];
const items2 = [1, 2, 3, 4, 5];

function compressBoxesTwice(items, items2) {
	items.forEach(item => {
		console.log(item);
	});

	items2.forEach(item => {
		console.log(item);
	});
}

compressBoxesTwice(items, items2);

// Result is O(n + m) because we are looping through two different arrays
// and the time complexity is the sum of the time complexities of the two loops
// O(n) + O(m) = O(n + m)

/* RULE 4: DROP NON-DOMINANT TERMS
	This means that we should drop non-dominant terms when analyzing the time complexity of a function.
	For example, if we have a function that loops through an array and then loops through another array, we should drop the non-dominant term
	which is when the item is not in the array.
*/

const array4 = [1, 2, 3, 4, 5];

function printAllNumbersThenAllPairSums(numbers) {
	for (let i = 0; i < numbers.length; i++) {
		console.log(numbers[i]);
	} // O(n)

	for (let i = 0; i < numbers.length; i++) { // O(n)
		for (let j = 0; j < numbers.length; j++) { // O(n)
			console.log(numbers[i] + numbers[j]); // O(n)
		}
	} // O(n^2)

	// Total time complexity is O(n + n^2)
	// We drop the non-dominant term O(n) because it becomes insignificant as n grows
	// O(n^2) is the dominant term
	// So the time complexity is O(n^2)
}

printAllNumbersThenAllPairSums(array4);