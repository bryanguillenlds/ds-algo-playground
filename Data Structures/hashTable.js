// Hashing is one way.
// Hashing is idempotent. No matter how many times you hash the same value, you will always get the same output.

//For hash tables, the result of the hash function is an address in memory.


class HashTable {
	constructor(size) {
		this.data = new Array(size);
	}

	#hash(key) {
		let hash = 0;
		// Loop through the key and get the char code of each character of the key
		// Multiply the char code by the index of the character
		// Add the result to the hash
		// Return the hash
		for (let i = 0; i < key.length; i++) {
			hash = (hash + key.charCodeAt(i) * i) % this.data.length;
		}
		return hash;
	}

  set(key, value) {
    let address = this.#hash(key);

    if (!this.data[address]) {
      this.data[address] = [key, value];
    } else {
      this.data[address].push([key, value]);
    }

    return true;
  }

  get(key) {
    let address = this.#hash(key);

    if (!this.data[address]) {
      throw new Error('Address not found');
    } else {
      // Search through the array at that addressto find the matching key
      for (let [storedKey, value] of this.data[address]) {
        if (storedKey === key) {
          return value;
        }
      }
    }
  }
}