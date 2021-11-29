// Initialization
print("\n\n-- Arrays Initialization --\n");
 
let arr;
let arrReturn;
 
// Empty Array
arr = new Array();
arr = [];
 
// One Number in an Array
arr = new Array(10);
arr = [10];
 
// One String in an Array
arr = new Array("10");
arr = ["10"];
 
// Three Numbers in an Array
arr = new Array(10, 20, 30);
arr = [10, 20, 30];
 
// Mixed Array
arr = new Array(10, "10");
arr = [10, "10"];
 
// Accessing Array
print("\n\n-- Accessing Array --\n");
 
// Print First Element
print(arr[0]);
 
// Print Second Element
print(arr[1]);
 
// Update First Element
print("\n\n-- Update First Element --\n");
arr[0] = 20;
 
print(arr[0]);
 
// Create New Array
arr = [1, 2, 3, 4, 5, 6];
arrReturn = 0;
 
// Array Length
print("\n\n-- Array Length --\n");
print(arr.length);
 
// Iterate Over Array
print("\n\n-- Iterate Over Array--\n");
arr.forEach(function (item, index) {
    console.log(item, index);
});
 
print("\n");
 
for (element in arr) {
    print(element);
}
 
// Add to End of Array
print("\n\n-- Add to End --\n");
arrReturn = arr.push(7);
 
print(arr);
print(arrReturn);
 
// Remove from End of Array
print("\n\n-- Remove from End --\n");
arrReturn = arr.pop();
 
print(arr);
print(arrReturn);
 
// Remove from Front of Array
print("\n\n-- Remove from Front --\n");
arrReturn = arr.shift();
 
print(arr);
print(arrReturn);
 
// Add to Front of Array
print("\n\n-- Add to Front --\n");
arrReturn = arr.unshift(1);
 
print(arr);
print(arrReturn);
 
// Find Index of Included Element in Array
print("\n\n-- Find Index of Included Element --\n");
arrReturn = arr.indexOf(5);
 
print(arr);
print(arrReturn);
 
// Find Index of Missing Element in Array
print("\n\n-- Find Index of Missing Element --\n");
arrReturn = arr.indexOf(10);
 
print(arr);
print(arrReturn);
 
// Remove 1 Element at Index
print("\n\n-- Remove Middle Two Elements --\n");
 
//                   Find Mid Point        Remove Two Elements
//                                |        |
//                                v        v
arrReturn = arr.splice(arr.length / 2 - 1, 2)
 
print(arr);
print(arrReturn);
 
// Copy Array
print("\n\n-- Copy Array --\n");
arrReturn = arr.slice();
 
print(arr);
print(arrReturn);
 
arr = [1, 4, 2, 9, 16, 12, 3, 8];
 
// Sort Array (Alphanumeric!)
print("\n\n-- Sort Array --\n");
arrReturn = arr.sort();
 
print(arr);
print(arrReturn);
 
// Filter Array
print("\n\n-- Filter Array --\n");
 
// Filtering allows us to create a copy of an array which
// only contains elements that pass a certain test
//
// This certain test is known as a filter function
//
// In this case, we will create a function that returns
// 'true' if element is greater than 5, or 'false' otherwise
function filterFunction (element) {
    return element > 5;
}
 
// Like with variables, functions can be passed as a parameter
// In this case, we pass our filterFunction to filter()
let filteredArr = arr.filter(filterFunction);
 
// filter() works by stepping through each element of the array
// As it steps through our array, it applies our filter function to
// each element
//
// If the element passes our test (i.e., if our filterFunction
// returns true), then that element will be copied over to our new
// array. Otherwise, it will be ignored
 
print(arr);
print(filteredArr);
 
// Note, that in our previous example, we wrote the filter function
// seperately
//
// We also have the option of writing the function direclty into
// filter() - the same result will be produced
//
// Also note that the original arr did not change - this is because
// filter is a non-destructive operation (i.e. it does not change
// the original data)
filteredArr = arr.filter(function (element) {
    return element > 5;
});
 
print(arr);
print(filteredArr);
 
// Map Array Values
print("\n\n-- Map Array --\n");
 
// Mapping allows us to modify each element in an array using a
// function that we provide
//
// In this case, we multiply each element in the array by two
 
// Note that map is also a non-destructive operation, meaning that
// it will not change the original contents of arr
let mappedArr = arr.map(function (element) {
    return element * 2;
});
 
print(arr);
print(mappedArr);
 
// Reduce Array
print("\n\n-- Reduce Array --\n");
 
// The reduce function allows us to step through an array, performing
// some action at each step
//
// The output of each step feeds directly into the input of the next
// step, allowing us to perform operations that chain together over
// time
 
// For example, imagine that we had an array with 6 numbers in it.
// Using reduce(), we can create a function that adds up each element
// in the array to determine its total value
 
// Below, I have written a small function which takes two values and
// adds them together
function sumFunction(a, b) {
    return a + b;
}
 
// I then pass that function to reduce (just like I did with filter())
let reducedArr = arr.reduce(sumFunction);
 
print(arr);
print(reducedArr);