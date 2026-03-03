// Original array
let arr = [1, 2, 3, 4, 5,6];

// New array to store reversed values
let reversed = [];

// Loop through array using for...of
for (let value of arr) {
    reversed.unshift(value); // add element at the beginning
}

// Print reversed array
console.log("Original Array:", arr);


console.log("Reversed Array:", reversed);

let sec=[...reversed, ...arr];
let t=[...sec, ...arr];

console.log("copied Array:", t);
