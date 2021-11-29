// This is a single-line comment
 
/*
 * This is a multi line comment
 *
 */
 
 
 
/*
 * Loosely Typed vs. Strongly Typed
 *
 * JavaScript is a loosely-typed language
 * This means that variables do not require a data type when they are initialised
 * The interpreter will interpret what data type to use, and will update the program accordingly
 * 
 * Java is a strongly typed language
 * When initialising a variable in Java, we must also declare the type of data that we are using (int, string, bool)
 * 
 */
 
 
 
/*
 * Data Types
 *
 * 
 * Basic Data Types in Java
 * 
 * Integer
 * Double
 * String
 * Float
 * Long
 * Boolean
 * 
 * 
 * Basic Data Types in JavaScript
 * 
 * Number
 * String
 * Boolean
 * Null
 * Undefined
 * 
 */
 
 
 
/*
 * Variable Initialisation
 * 
 * 
 */
 
// var      a variable that exists within the global scope
var x = 5;
 
// let      a variable that exists within the local scope
let y = 5;
 
// const    a variable that does not change
const gravity = -9.81;
 
 
 
/*
 * Functions
 *
 * 
 */
 
print("\n\n-- Functions --\n");
 
// Function Declaration
function printHelloWorld() {
    console.log("Hello World");
};
 
// Function Call
printHelloWorld();
 
// Passing Parameters
function print(value) {
    console.log(value);
}
 
print("Some text");
 
// Return Statements
function sum(x, y) {
    return x + y;
}
 
let z = sum(x, y);
 
print(z);
 
 
 
/*
 * Control Structures
 *
 */
 
controlStructures();
 
function controlStructures() {
 
    let x = 15;
    let y = 25;
    let z = 35;
 
    print("\n\n-- If Statements --\n");
 
    // If Statement
    if (x !== null) {
        print(x);
    }
 
    // If Else Statement
    if (x > y) {
        print(x);
    }
    else {
        print(y);
    }
 
    // Else If Statement
    if (x > z) {
        print(x);
    }
    else if (y > z) {
        print(y);
    }
    else {
        print(z);
    }
 
    print("\n\n-- Switch Statements --\n");
 
    // Switch Statements
    let day = 1;
 
    switch (day) {
        case 1:
            print("Monday");
            break;
 
        case 2:
            print("Tuesday");
            break;
 
        case 3:
            print("Wednesday");
            break;
 
        case 4:
            print("Thursday");
            break;
 
        case 5:
            print("Friday");
            break;
 
        case 6:
            print("Saturday");
            break;
 
        case 7:
            print("Sunday");
            break;
 
        default:
            print("Invalid Day");
            break;
    }
 
    print("\n\n-- Loops --\n");
 
    // For Loop
    for (let x = 0; x < 3; x++) {
        print(x);
    }
 
    let a = 0;
 
    // While loop
    while (a < 3) {
        print(a);
        a++;
    }
 
    a = 0;
 
    // Post Increment
    while (a < 3) {
        print(a++);
    }
 
    a = 0;
 
    // Pre Increment
    while (a < 3) {
        print(++a);
    }
}
 
 
 
/*
 * Logic
 *
 * AND -> &&
 * OR  -> ||
 * NOT -> !
 *    
 */
 
 
 
/*
 * Assignment (assigning a value to a variable)
 *
 */
 
let w = 0;
 
 
 
/*
 * Equality
 *
 */
 
print("\n\n-- Equality --\n");
 
let i = 30;
let j = "30";
 
// Non-Strict Equality
if (i == j) {
    print("i and j are equal");
}
else {
    print("i and j are not equal");
}
 
// Strict Equality
if (i === j) {
    print("i and j are strictly equal");
}
else {
    print("i and j are not strictly equal")
}
 
// Non-Strict Equality
if (null == undefined) {
    print("null and undefined are equal");
}
else {
    print("null and undefined are not equal");
}
 
// Strict Equality
if (null === undefined) {
    print("null and undefined are strictly equal");
}
else {
    print("null and undefined are not strictly equal")
}
 
/*
 * Concatentation
 *
 */
 
print("\n\n-- Concatenation --\n");
 
// In this case, the value 3 is concatenated to the end of the string "3"
// Therefore, the output will be 33
print("3" + 3);
 
/*
 * Ternary Operators
 *
 */
 
print("\n\n-- Ternary Operators --\n");
 
let p;
 
// Rather than writing an if statement like below
if (5 > 4) {
    p = "Hello";
}
else {
    p = "World";
}
 
// We can write it like this instead
p = (5 > 4)
    ? "Hello"
    : "World";
 
print(p);
 
// Overall, it a ternary operator uses the same principle as an if statement
//
// First we evaluate a statement - is 5 greater than 4?
// If the result is true - we choose the first option
// If the result is false - we choose the second option
//
// Ternary Operators are a great way for condensing code
 
/*
 * Interacting with the DOM
 * 
 */
 
let test;
 
// Get Element by ID
print("\n\n-- Get Element by ID --\n");
test = document.getElementById("testIDElement");
 
print(test);
 
// Get Elements by Class Name
print("\n\n-- Get Elements by Class Name --\n");
test = document.getElementsByClassName("testClassElement");
 
print(test);
 
// Get Elements by Tag
print("\n\n-- Get Elements by Tag --\n");
test = document.getElementsByTagName("div");
 
print(test);
 
// Edit Element
print("\n\n-- Edit Element --\n");
test = document.getElementById("testIDElement").innerHTML = "Edit Element";
 
print(test);
 
// Events - Add a Clickable Button
print("\n\n-- Add Button --\n");
test = document.getElementById("testIDElement").innerHTML = "<button onClick='clickMe()'>Click Me!</button>";
 
function clickMe() {
    let elements = document.getElementsByClassName("testClassElement");
 
    elements[0].innerHTML = "This is the first class element";
    elements[1].innerHTML = "This is the second class element";
}
 
print(test);
