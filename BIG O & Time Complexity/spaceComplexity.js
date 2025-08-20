function boo(n) {
	for (let i = 0; i < n.length; i++) { // O(1) because of creating variable i
		console.log('boo');
	}
}

boo([1, 2, 3, 4, 5, 6]);

// When we talk about space complexity, we mean other than the input
// Space Complexity: O(1) because we are not using any additional space

function arrayOfHiNTimes(n) {
	const hiArray = []; // O(1) because of creating variable hiArray

	for (let i = 0; i < n.length; i++) { // O(1) because of creating variable i
		hiArray.push('hi'); // O(n) because of adding n items to the array (takes memory allocation)
	}

	return hiArray;
}

// Space Complexity: O(n) because we are using n space to store new items to the array
