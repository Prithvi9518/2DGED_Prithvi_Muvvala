// Initialization
print("\n\n-- Object Initialization --\n");

let obj;
let person;

// Empty Object
print("\n\n-- Empty Object --\n");
obj = {};

print(obj);

// Person Object
print("\n\n-- Person Object --\n");
person = {
    name: "James Farrell",
    age: 24,
    location: "Ardee"
};

print(person);

// Access Object Property
print("\n\n-- Access Property --\n");
print("Name - " + person.name);
print("Age - " + person["age"]);

print("\n\n-- Function Property --\n");
person = {
    firstName: "James",
    lastName: "Farrell",
    age: 24,
    location: "Ardee",
    eyeColor: "Green",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    },
    students: [
        {
            name: "Conor",
        },
    ],
};

print(person.fullName);
print(person.fullName());
