---
title: 'Modern JavaScript: From Fundamentals to Advanced Concepts'
date: '2025-05-08'
description: >-
  This article walks through the most important parts of JavaScript—from how variables work to how async code runs—covering the kind of things you actually need to remember when coding or going into an interview.
categories:
  - javascript
  - interview
  - development
  - web-development
show: true
---

## Contents

## Introduction

JavaScript is everywhere—from browsers and servers to desktop apps and embedded systems. Whether you're building a small feature or architecting a complex system, having a solid understanding of how JavaScript works under the hood makes a huge difference.

This article isn't just a crash course or a syntax dump. It's a practical walkthrough of the concepts, patterns, and quirks that matter most. We’ll revisit the basics with fresh clarity, dig into core mechanics like closures and the event loop, and explore features you might only bump into during deep debugging sessions or interviews.

If you’ve used JavaScript before but want to truly grasp what’s happening when your code runs, this guide is for you.

## Language Fundamentals

### Variables and Scope (`let`, `const`, `var`)

JavaScript provides three ways to declare variables: `var`, `let`, and `const`. Each has different characteristics with regard to **scope**, **hoisting**, and **mutability**.

**`var`**

- Introduced in ES3.
- **Function-scoped** (not block-scoped).
- Can be **redeclared** and **updated**.
- **Hoisted** to the top of its function scope with `undefined` as the initial value.

```js
function testVar() {
  console.log(x) // undefined (hoisted)
  var x = 10
  console.log(x) // 10
}
testVar()
```

> ⚠️ Variables declared with `var` are hoisted and can lead to bugs due to unexpected behavior in loops or conditional blocks.

**`let`**

- Introduced in ES6.
- **Block-scoped**: limited to the block, statement, or expression where it's defined.
- Can be **updated** but **not redeclared** in the same scope.
- **Hoisted**, but exists in a **Temporal Dead Zone (TDZ)** until the declaration is evaluated.

```js
function testLet() {
  console.log(y) // ReferenceError (TDZ)
  let y = 20
}
```

```js
let a = 1
a = 2 //  okay
let a = 3 // SyntaxError in same scope
```

**`const`**

- Also introduced in ES6.
- **Block-scoped**.
- Must be **initialized** at the time of declaration.
- **Cannot be reassigned**, but the **value it holds (if an object or array) can be mutated**.

```js
const PI = 3.14
PI = 3.14159 // TypeError

const obj = { name: 'Ana' }
obj.name = 'Bea' //  allowed
```

**Scope Summary**

| Declaration | Scope    | Hoisted | Re-assignable | Re-declarable | TDZ (Temporal Dead Zone) |
| ----------- | -------- | ------- | ------------- | ------------- | ------------------------ |
| `var`       | Function | Yes     | Yes           | Yes           | No                       |
| `let`       | Block    | Yes     | Yes           | No            | Yes                      |
| `const`     | Block    | Yes     | No            | No            | Yes                      |

**Best Practices**

- Use `const` by default.
- Use `let` if the variable needs to be reassigned.
- Avoid `var` unless working with legacy code.

**Example:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100)
}
// Output: var: 3 (three times)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 100)
}
// Output: let: 0, 1, 2
```

> `let` creates a new binding in each iteration, while `var` shares the same scope.

### Data Types (primitive vs non-primitive)

JavaScript has two main categories of data types:

**Primitive Types**

Primitive values are **immutable**, **not objects**, and **passed by value**. There are **7 primitive types**:

1. `string` – text
2. `number` – integers, floats, `NaN`, `Infinity`
3. `boolean` – `true` or `false`
4. `null` – intentional absence of any value
5. `undefined` – variable declared but not assigned
6. `symbol` – unique and immutable identifiers
7. `bigint` – large integers beyond `Number.MAX_SAFE_INTEGER`

> 🧠 **Note**: Primitives are compared by **value**, not by reference.

```js
const a = 'hello'
const b = a
console.log(a === b) // true (same value)

a = 'world' // Creates a new string; does not change `b`
```

**Non-Primitive Types (Objects)**

Objects are **reference types**: they hold references to memory locations. They're **mutable** and include:

- `Object`
- `Array`
- `Function`
- `Date`
- `RegExp`
- `Map`, `Set`, `WeakMap`, `WeakSet`

Objects are compared by **reference**, not value.

```js
const obj1 = { x: 1 }
const obj2 = { x: 1 }
console.log(obj1 === obj2) // false (different references)

const obj3 = obj1
console.log(obj1 === obj3) // true (same reference)
```

**Type Checking**

```js
typeof 'hello' // "string"
typeof 42 // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof null // "object" ← historical quirk
typeof Symbol() // "symbol"
typeof 10n // "bigint"

typeof {} // "object"
typeof [] // "object"
typeof function () {} // "function" ← a special type of object
```

**Value vs Reference**

- **Primitives** are **copied by value**.
- **Objects** are **copied by reference**.

```js
let a = 5
let b = a
b = 10
console.log(a) // 5

let objA = { n: 1 }
let objB = objA
objB.n = 2
console.log(objA.n) // 2 (same object)
```

**Summary Table**

| Type        | Category      | Mutable | Compared By | typeof Result  |
| ----------- | ------------- | ------- | ----------- | -------------- |
| `string`    | Primitive     | No      | Value       | "string"       |
| `number`    | Primitive     | No      | Value       | "number"       |
| `boolean`   | Primitive     | No      | Value       | "boolean"      |
| `null`      | Primitive     | No      | Value       | "object" (bug) |
| `undefined` | Primitive     | No      | Value       | "undefined"    |
| `symbol`    | Primitive     | No      | Value       | "symbol"       |
| `bigint`    | Primitive     | No      | Value       | "bigint"       |
| `object`    | Non-Primitive | Yes     | Reference   | "object"       |
| `array`     | Non-Primitive | Yes     | Reference   | "object"       |
| `function`  | Non-Primitive | Yes     | Reference   | "function"     |

> 🧠 Tip: Use `Array.isArray(x)` to check if a value is an array. `typeof x` won’t help — it returns `"object"` for arrays.

### Equality (`==` vs `===`)

In JavaScript, there are two main ways to compare values: **loose equality (`==`)** and **strict equality (`===`)**. Understanding the difference between them is essential for writing safe and predictable code.

**Loose Equality (`==`)**

- Performs **type coercion** before comparison.
- If types are different, it tries to convert them to the same type before comparing.

```js
0 == false // true
'1' == 1 // true
null == undefined // true
'' == 0 // true
```

This can lead to unexpected behavior in many cases and should generally be avoided.

**Strict Equality (`===`)**

- Compares both **value and type**.
- No type conversion is performed.

```js
0 === false // false
'1' === 1 // false
null === undefined // false
'' === 0 // false
1 === 1 //
```

### Type Coercion

**Type coercion** is the automatic or implicit conversion of values from one data type to another by JavaScript. This occurs mainly in loose equality comparisons (`==`), arithmetic operations, and logical expressions.

**Types of Coercion**

- **Implicit Coercion**: done automatically by JavaScript.
- **Explicit Coercion**: done manually by the developer using conversion functions.

**Implicit Coercion Examples**

```js
'5' * 2 // 10     → string "5" is coerced to number 5
'5' + 2 // "52"   → number 2 is coerced to string "2"
true + 1 // 2      → true becomes 1
null + 1 // 1      → null becomes 0
undefined + 1 // NaN    → undefined becomes NaN
```

**Explicit Coercion Examples**

```js
Number('42') // 42
String(100) // "100"
Boolean('') // false
Boolean('abc') // true
```

**Truthy and Falsy Values**

In a Boolean context, JavaScript coerces values to either `true` or `false`.

**Falsy values** (evaluated as false when coerced to Boolean):

- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is **truthy**.

```js
if ('hello') {
  // this block runs because "hello" is truthy
}
if (0) {
  // this block doesn't run because 0 is falsy
}
```

**Common Pitfall: `+` Operator**

The `+` operator is tricky because it serves both for addition and string concatenation.

```js
'5' + 1 // "51" (string concatenation)
5 + '1' // "51" (string concatenation)
5 - '1' // 4    (string is coerced to number)
```

**Best Practices**

- Avoid relying on implicit coercion unless the behavior is well understood.
- Prefer `===` and `!==` for comparison.
- Use explicit conversion functions (`Number()`, `String()`, `Boolean()`) when needed to avoid surprises.

### Default and Rest Parameters

**Default parameters** and **rest parameters** were introduced in ES6 to simplify function signatures and handle dynamic arguments more clearly and safely.

**Default Parameters**

Default parameters let you specify a fallback value for a function argument when `undefined` is passed or no value is provided.

```js
function greet(name = 'Guest') {
  return `Hello, ${name}`
}

greet() // "Hello, Guest"
greet('Ana') // "Hello, Ana"
```

Only `undefined` triggers the default. `null` and falsy values (like `0`, `""`, or `false`) do **not**.

```js
function show(x = 10) {
  console.log(x)
}
show(undefined) // 10
show(null) // null
show(0) // 0
```

**Rest Parameters**

Rest parameters gather all remaining arguments into an actual array. This is useful when dealing with a variable number of inputs.

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0)
}

sum(1, 2, 3) // 6
sum(5, 10, 15, 20) // 50
```

Rest parameters must be the **last parameter** in the function definition.

```js
function log(first, ...rest) {
  console.log('first:', first)
  console.log('rest:', rest)
}

log('a', 'b', 'c')
// first: "a"
// rest: ["b", "c"]
```

**Comparison: `arguments` vs Rest Parameters**

The `arguments` object is an array-like object available in **non-arrow** functions. It contains all passed arguments but lacks array methods like `.map()`.

```js
function legacy() {
  console.log(arguments) // [1, 2, 3]
}
legacy(1, 2, 3)
```

Limitations of `arguments`:

- It is not a real array.
- It does not work inside arrow functions.
- It includes all arguments, even those not named in the function signature.

```js
const arrow = () => {
  console.log(arguments) // ReferenceError
}
```

Rest parameters are a modern replacement:

```js
function modern(...args) {
  console.log(args) // [1, 2, 3]
}
modern(1, 2, 3)
```

**Best Practices**

- Prefer **default parameters** over manual checks like `x = x || 10`.
- Prefer **rest parameters** over `arguments` for modern, safer, and more expressive code.

### Spread Syntax

**Spread syntax** (`...`) allows an iterable (like an array or string) or an object to be **expanded** in places where multiple elements or properties are expected. It is commonly used to copy, merge, or pass elements into functions.

**Spread in Arrays**

You can expand an array into individual elements.

```js
const arr = [1, 2, 3]
const newArr = [...arr, 4, 5] // [1, 2, 3, 4, 5]
```

This creates a **shallow copy** of the array.

```js
const original = [10, 20]
const copy = [...original]
copy[0] = 99
console.log(original[0]) // 10 (not affected)
```

**Combining Arrays**

```js
const a = [1, 2]
const b = [3, 4]
const combined = [...a, ...b] // [1, 2, 3, 4]
```

**Spreading Strings**

```js
const chars = [...'hello'] // ['h', 'e', 'l', 'l', 'o']
```

**Spread in Function Calls**

Instead of using `.apply`, you can use spread to pass arguments.

```js
function sum(a, b, c) {
  return a + b + c
}
const args = [1, 2, 3]
sum(...args) // 6
```

**Spread in Objects**

You can also use spread with objects (ES2018+).

```js
const obj = { a: 1, b: 2 }
const newObj = { ...obj, c: 3 } // { a: 1, b: 2, c: 3 }
```

**Merging Objects**

When spreading multiple objects, later properties overwrite earlier ones.

```js
const base = { a: 1, b: 2 }
const override = { b: 99, c: 3 }
const merged = { ...base, ...override } // { a: 1, b: 99, c: 3 }
```

**Important Notes**

- Spread only performs a **shallow copy**.
- It can only be used in places where zero or more elements or properties are expected (e.g., array literals, function arguments, object literals).
- It does **not** work directly inside `function()` parameter definitions (use rest instead).

**Use Cases**

- Copying arrays or objects
- Merging data structures
- Passing dynamic arguments
- Converting strings to character arrays

**Best Practices**

- Use spread for clean and concise syntax when duplicating or merging.
- Avoid using spread on deeply nested objects/arrays when deep cloning is required.

## Control Flow and Data Structures

### Control Structures (`if`, `switch`, ternary)

Control structures in JavaScript determine how code is executed based on certain conditions. The most common constructs are `if`, `switch`, and the ternary (`? :`) operator.

**if / else if / else**

Used to execute blocks of code based on boolean conditions.

```js
const age = 20

if (age < 13) {
  console.log('Child')
} else if (age < 18) {
  console.log('Teenager')
} else {
  console.log('Adult')
}
```

Multiple `else if` blocks can be chained to handle different ranges or conditions.

**switch**

The `switch` statement is useful when comparing a single value against multiple known constants.

```js
const day = 'Tuesday'

switch (day) {
  case 'Monday':
    console.log('Start of week')
    break
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
    console.log('Midweek')
    break
  case 'Friday':
    console.log('Almost weekend')
    break
  default:
    console.log('Weekend or unknown day')
}
```

**Important Notes**

- `break` prevents fall-through to the next case.
- You can stack cases together when they share logic (e.g. Tuesday–Thursday).

**ternary operator**

A concise way to return one of two values based on a condition.

```js
const isLoggedIn = true
const message = isLoggedIn ? 'Welcome back!' : 'Please log in.'
console.log(message)
```

The ternary operator follows this structure:

```js
condition ? value_if_true : value_if_false
```

It is best used for simple conditional assignments, not complex logic.

**Best Practices**

- Use `if` for general conditional logic.
- Use `switch` when comparing the same value against many possibilities.
- Use the ternary operator for simple expressions, not full statements or nested logic.

### Loops (`for`, `while`, `do...while`, `for...of`, `for...in`)

JavaScript provides several types of loops for iterating over data or repeating operations. Choosing the right loop depends on the use case and data structure being processed.

**for**

The classic `for` loop is ideal when you need a counter or index.

```js
for (let i = 0; i < 5; i++) {
  console.log(i) // 0 to 4
}
```

Used when you know in advance how many times to iterate.

**while**

The `while` loop continues as long as the condition is true. It’s used when the number of iterations is unknown.

```js
let i = 0
while (i < 3) {
  console.log(i)
  i++
}
```

**do...while**

This variant runs the loop body at least once before checking the condition.

```js
let i = 0
do {
  console.log(i)
  i++
} while (i < 3)
```

**for...of**

Used for **iterating over iterable objects** like arrays, strings, Maps, Sets, etc.

```js
const arr = ['a', 'b', 'c']
for (const value of arr) {
  console.log(value) // "a", "b", "c"
}
```

- Provides the **value** on each iteration.
- Cannot be used on plain objects (non-iterables).

**for...in**

Used for **enumerating object keys**.

```js
const obj = { x: 1, y: 2 }
for (const key in obj) {
  console.log(key) // "x", "y"
  console.log(obj[key]) // 1, 2
}
```

- Iterates over **enumerable properties**, including inherited ones.
- Use `Object.hasOwnProperty()` to filter out inherited keys when necessary.

```js
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // your code here
  }
}
```

**Comparison Table**

| Loop Type    | Best For                                           | Output | Iterable Required |
| ------------ | -------------------------------------------------- | ------ | ----------------- |
| `for`        | Index-based iteration                              | Index  | No                |
| `while`      | Unknown number of iterations                       | Any    | No                |
| `do...while` | Ensuring the loop runs at least once               | Any    | No                |
| `for...of`   | Iterating values in iterables (arrays, sets, etc.) | Value  | Yes               |
| `for...in`   | Iterating enumerable object keys                   | Key    | Yes (objects)     |

**Best Practices**

- Use `for...of` when working with arrays or iterable collections.
- Use `for...in` for objects, but combine with `hasOwnProperty()` if needed.
- Avoid using `for...in` on arrays due to possible unexpected inherited keys.
- Prefer `for`, `while`, or `for...of` for clarity and correctness.

### Arrays and Methods (`map`, `filter`, `reduce`, `forEach`, etc.)

Arrays in JavaScript support a variety of built-in methods for transformation, iteration, filtering, and aggregation. Below are the most essential methods, each with its use case and time complexity.

**map()** — $O(n)$

Transforms each element and returns a new array of the same length.

```js
const numbers = [1, 2, 3]
const doubled = numbers.map((n) => n * 2) // [2, 4, 6]
```

**filter()** — $O(n)$

Returns a new array with elements that satisfy the provided condition.

```js
const nums = [1, 2, 3, 4, 5]
const even = nums.filter((n) => n % 2 === 0) // [2, 4]
```

**reduce()** — $O(n)$

Applies a reducer function to accumulate values into a single result.

```js
const values = [1, 2, 3, 4]
const total = values.reduce((acc, val) => acc + val, 0) // 10
```

**forEach()** — $O(n)$

Executes a function once for each array element without returning anything.

```js
const items = ['a', 'b', 'c']
items.forEach((item) => console.log(item))
```

**find()** — $O(n)$

Returns the first element that satisfies the given condition.

```js
const arr = [5, 10, 15]
const found = arr.find((n) => n > 7) // 10
```

**findIndex()** — $O(n)$

Returns the index of the first element that matches the condition.

```js
const idx = arr.findIndex((n) => n > 7) // 1
```

**some()** — $O(n)$

Checks if at least one element satisfies the condition.

```js
const hasNegative = [1, -1, 2].some((n) => n < 0) // true
```

**every()** — $O(n)$

Checks if all elements satisfy the condition.

```js
const allPositive = [1, 2, 3].every((n) => n > 0) // true
```

**includes()** — $O(n)$

Returns `true` if the array contains the specified value.

```js
const items = [10, 20, 30]
items.includes(20) // true
```

**indexOf()** — $O(n)$

Returns the first index at which a given element can be found.

```js
const idx = items.indexOf(20) // 1
```

**slice()** — $O(k)$

Returns a shallow copy of a portion of the array (from index A to B).

```js
const arr = [1, 2, 3, 4]
const part = arr.slice(1, 3) // [2, 3]
```

**splice()** — $O(n)$

Adds or removes elements in place, possibly shifting others.

```js
const arr = [1, 2, 3, 4]
arr.splice(1, 2) // removes 2 elements → [2, 3]
console.log(arr) // [1, 4]
```

**reverse()** — $O(n)$

Reverses the elements in place.

```js
const arr = [1, 2, 3]
arr.reverse() // [3, 2, 1]
```

**sort()** — $O(n log n)$ average, $O(n²)$ worst (implementation dependent)

Sorts the array in place. Provide a compare function for numeric sorting.

```js
const nums = [10, 5, 20]
nums.sort() // [10, 20, 5] ← incorrect
nums.sort((a, b) => a - b) // [5, 10, 20] ← correct
```

**flat()** — $O(n)$

Flattens nested arrays up to a given depth.

```js
const nested = [1, [2, [3]]]
nested.flat(2) // [1, 2, 3]
```

**Best Practices**

- Use `map`, `filter`, and `reduce` for pure transformations.
- Use `forEach` only for side effects (e.g., logging).
- Prefer `slice` over `splice` when preserving the original array.
- Always use a compare function in `sort()` when sorting numbers.
- Avoid `find`, `some`, or `every` in performance-critical paths on very large arrays.

### Destructuring (arrays and objects)

Destructuring is a concise syntax introduced in ES6 that allows you to extract values from arrays or properties from objects into distinct variables.

**Array Destructuring**

Allows you to assign array elements to variables based on their position.

```js
const numbers = [1, 2, 3]
const [a, b, c] = numbers
console.log(a) // 1
console.log(b) // 2
```

You can skip elements by leaving blank spaces.

```js
const [first, , third] = [10, 20, 30]
console.log(first) // 10
console.log(third) // 30
```

Use with rest syntax to collect remaining elements.

```js
const [head, ...tail] = [1, 2, 3, 4]
console.log(head) // 1
console.log(tail) // [2, 3, 4]
```

**Object Destructuring**

Extract properties from objects into variables by matching property names.

```js
const user = { name: 'Ana', age: 25 }
const { name, age } = user
console.log(name) // "Ana"
console.log(age) // 25
```

Rename variables using `:`

```js
const { name: userName } = user
console.log(userName) // "Ana"
```

Set default values for missing properties.

```js
const { city = 'Unknown' } = user
console.log(city) // "Unknown"
```

Destructure nested properties.

```js
const person = { profile: { firstName: 'Ana', lastName: 'Silva' } }
const {
  profile: { firstName }
} = person
console.log(firstName) // "Ana"
```

**Destructuring in Function Parameters**

You can destructure directly in parameter definitions for convenience.

```js
function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`)
}

printUser({ name: 'João', age: 30 })
```

**Best Practices**

- Use destructuring for cleaner, shorter code when accessing multiple values.
- Provide defaults to handle missing values gracefully.
- Avoid overly deep destructuring in a single line; it can harm readability.

### Objects (creation, access, mutation)

Objects in JavaScript are key-value collections used to model structured data. They are one of the most fundamental data structures and support dynamic properties, nesting, and flexible manipulation.

**Creating Objects**

You can create objects using literals or constructors.

```js
const person = {
  name: 'Alice',
  age: 30,
  isAdmin: false
}
```

Or using the `Object` constructor (less common):

```js
const user = new Object()
user.name = 'Bob'
```

You can also define computed keys and shorthand properties.

```js
const role = 'admin'
const username = 'carlos'

const userInfo = {
  role, // shorthand for role: role
  ['is' + role]: true // computed key → isadmin: true
}
```

**Accessing Properties**

Use dot or bracket notation.

```js
console.log(person.name) // "Alice"
console.log(person['age']) // 30

const key = 'isAdmin'
console.log(person[key]) // false
```

Bracket notation is required when:

- The property name is stored in a variable
- The key contains spaces or special characters

**Modifying Properties**

Assign new values or add new keys directly.

```js
person.age = 31
person.city = 'São Paulo'
```

**Deleting Properties**

Remove a key using the `delete` operator.

```js
delete person.isAdmin
```

**Checking for Property Existence**

Use the `in` operator or `hasOwnProperty()`.

```js
'age' in person // true
person.hasOwnProperty('name') // true
```

**Iterating Over Properties**

Use `for...in` or `Object` utility methods.

```js
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key, person[key])
  }
}
```

Other options:

```js
Object.keys(person) // ["name", "age", "city"]
Object.values(person) // ["Alice", 31, "São Paulo"]
Object.entries(person) // [["name", "Alice"], ["age", 31], ["city", "São Paulo"]]
```

**Nested Objects**

Objects can contain other objects or arrays.

```js
const user = {
  name: 'João',
  contact: {
    email: 'joao@email.com',
    phone: '123-456'
  }
}

console.log(user.contact.email) // "joao@email.com"
```

**Copying Objects**

Use the spread operator or `Object.assign()` to create shallow copies.

```js
const clone = { ...person }
const clone2 = Object.assign({}, person)
```

Note: These methods do not deep-copy nested structures.

**Best Practices**

- Use object literals for clarity and conciseness.
- Use `in` or `hasOwnProperty` when checking property existence.
- Use `Object.keys/values/entries` for iteration when you need arrays.
- Avoid deep nesting when possible; it makes access and updates harder to manage.

### `Map` and `Set`

`Map` and `Set` are built-in JavaScript data structures introduced in ES6 that offer more specialized behavior than plain objects and arrays.

They are useful when you need guaranteed key order, unique values, or want to use keys of any type (not just strings or symbols).

**Map**

A `Map` is a collection of key-value pairs where:

- Keys can be **of any type** (not limited to strings or symbols)
- The insertion order is preserved
- It has built-in methods for easy manipulation

**Creating a Map**

```js
const map = new Map()
map.set('name', 'Ana')
map.set(123, 'numeric key')
map.set(true, 'boolean key')
```

**Accessing and Modifying**

```js
map.get('name') // "Ana"
map.has(123) // true
map.delete(true) // removes the key `true`
map.size // 2
```

**Iteration**

```js
for (const [key, value] of map) {
  console.log(key, value)
}
```

Convert to an array:

```js
Array.from(map) // [[key1, value1], [key2, value2], ...]
```

**Object vs Map**

| Feature     | Object                           | Map                                   |
| ----------- | -------------------------------- | ------------------------------------- |
| Key Types   | string, symbol                   | any type                              |
| Order       | Not guaranteed                   | Insertion order preserved             |
| Iteration   | Manual or `for...in`             | Easy with `for...of`, `map.entries()` |
| Performance | Slower for frequent adds/removes | Optimized for additions/removals      |

**Set**

A `Set` is a collection of **unique values**. It automatically removes duplicates and maintains insertion order.

**Creating a Set**

```js
const set = new Set([1, 2, 3])
set.add(4)
set.add(2) // ignored (already exists)
```

**Operations**

```js
set.has(3) // true
set.delete(1) // true
set.size // 3
```

**Iteration**

```js
for (const value of set) {
  console.log(value)
}
```

**Converting Between Set and Array**

```js
const arr = Array.from(set) // Set → Array
const newSet = new Set(arr) // Array → Set
```

**Use Cases**

- `Map`: Use when keys are not limited to strings and you need predictable iteration.
- `Set`: Use to store unique values, remove duplicates, or perform set operations.

**Set Operations (Manual)**

```js
const a = new Set([1, 2, 3])
const b = new Set([3, 4, 5])

// Union
const union = new Set([...a, ...b])

// Intersection
const intersection = new Set([...a].filter((x) => b.has(x)))

// Difference
const difference = new Set([...a].filter((x) => !b.has(x)))
```

**Best Practices**

- Use `Map` instead of objects when you need keys that aren't strings or symbols.
- Use `Set` to enforce uniqueness and to simplify logic involving list membership or filtering.

## Functions and Scope

### Functions (declaration, expression, arrow)

Functions are fundamental building blocks in JavaScript. They define reusable blocks of code that can take input, perform actions, and return output. JavaScript supports multiple syntaxes for creating functions, each with its own characteristics and use cases.

**Function Declaration**

Also called a "named function", it uses the `function` keyword and can be hoisted.

```js
function greet(name) {
  return `Hello, ${name}`
}

greet('Ana') // "Hello, Ana"
```

- Can be called before it's defined due to hoisting
- Added to the environment during the compilation phase

**Function Expression**

A function assigned to a variable. Can be named or anonymous.

```js
const sayHi = function (name) {
  return `Hi, ${name}`
}

sayHi('João') // "Hi, João"
```

- Not hoisted: must be declared before use
- Useful for dynamic assignments or passing as arguments

**Arrow Function**

Introduced in ES6. A shorter syntax for function expressions.

```js
const double = (x) => x * 2
```

More complex version with multiple parameters and statements:

```js
const sum = (a, b) => {
  const total = a + b
  return total
}
```

**Key Differences of Arrow Functions**

- Do **not** have their own `this` (inherit from lexical scope)
- Do **not** have their own `arguments` object
- Cannot be used as constructors (with `new`)
- Cannot use `super` or `new.target`

**Example: `this` Behavior**

```js
const obj = {
  value: 42,
  regular: function () {
    return this.value // refers to obj
  },
  arrow: () => {
    return this.value // refers to outer scope (usually undefined in global)
  }
}
```

**Anonymous vs Named Functions**

Function expressions can be anonymous:

```js
const log = function () {
  console.log('hello')
}
```

Or named, which can help with stack traces:

```js
const log = function logMessage() {
  console.log('hello')
}
```

**Function Constructor (Rarely Used)**

```js
const f = new Function('a', 'b', 'return a + b')
f(1, 2) // 3
```

Generally avoided due to performance and security reasons (similar to `eval`).

**Best Practices**

- Use function declarations for defining top-level functions
- Use function expressions or arrow functions for callbacks and inline behavior
- Prefer arrow functions when lexical `this` is needed (e.g., inside array methods or React components)
- Avoid using the `Function` constructor

### Closures

A **closure** is a function that "remembers" and has access to variables from its **lexical scope**, even when that function is executed outside of that scope. Closures are a foundational concept in JavaScript and are created **every time a function is defined**.

**Definition**

A closure is formed when:

1. A function is defined inside another function
2. The inner function accesses variables from the outer function
3. The outer function has finished executing

```js
function outer() {
  const secret = 'I know the secret'

  function inner() {
    console.log(secret) // inner has access to secret
  }

  return inner
}

const closureFn = outer()
closureFn() // "I know the secret"
```

Even though `outer()` has finished running, `closureFn` still remembers the `secret` variable. That’s a closure.

**Closures Remember Variables, Not Values**

Closures retain **references**, not copies. If the variable changes, the closure sees the change.

```js
function counter() {
  let count = 0
  return function () {
    count++
    return count
  }
}

const increment = counter()
increment() // 1
increment() // 2
```

**Common Uses**

**1. Data Privacy (emulating private variables)**

```js
function makeCounter() {
  let count = 0
  return {
    increment: () => ++count,
    get: () => count
  }
}

const counter = makeCounter()
counter.increment() // 1
counter.get() // 1
```

**2. Factory Functions**

```js
function makeMultiplier(x) {
  return function (y) {
    return x * y
  }
}

const double = makeMultiplier(2)
double(5) // 10
```

**3. Event Handlers and Timers**

```js
function delayedLog(msg) {
  setTimeout(() => {
    console.log(msg) // msg is captured in closure
  }, 1000)
}

delayedLog('Hello from the past')
```

**Pitfall: Loop Closures with `var`**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Prints: 3, 3, 3 — because all closures share the same `i`
```

Use `let` to create a new binding per iteration:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Prints: 0, 1, 2
```

**Best Practices**

- Understand closures to write modular, maintainable code
- Use them to preserve state without polluting the global scope
- Be cautious with closures inside loops when using `var`

### Lexical Scope

**Lexical scope** (also called **static scope**) means that the scope of a variable is determined by its position in the source code — specifically, where functions and blocks are **written**, not where they are **called**.

In JavaScript, **functions are executed using the scope chain that was in effect when they were defined**, not when they are invoked. This is what enables closures to work.

**Scope Chain**

Each function creates a new **scope**. When a variable is not found in the current scope, JavaScript looks outward through the **scope chain** until it finds the variable or hits the global scope.

**Example:**

```js
const x = 10

function outer() {
  const y = 20

  function inner() {
    console.log(x + y)
  }

  return inner
}

const fn = outer()
fn() // 30
```

Explanation:

- `inner()` has access to `y` (from `outer`) and `x` (from global)
- `inner()` remembers the scope in which it was defined — not where it was called
- This is lexical scope in action

**Shadowing**

A variable in an inner scope can **shadow** a variable with the same name from an outer scope.

```js
const message = 'global'

function printMessage() {
  const message = 'local'
  console.log(message)
}

printMessage() // "local"
```

**Not Dynamic Scope**

JavaScript does **not** use dynamic scoping, where the call stack would determine scope access. It always uses lexical scope.

**Incorrect Expectation (not JavaScript):**

```js
const name = 'global'

function sayName() {
  console.log(name)
}

function wrapper() {
  const name = 'wrapper'
  sayName() // prints "global", not "wrapper"
}

wrapper()
```

**Function Definitions vs Calls**

```js
function outer() {
  const outerVar = 'outside'

  function inner() {
    console.log(outerVar)
  }

  return inner
}

const fn = outer()
fn() // accesses outerVar from its lexical scope, even outside `outer`
```

**Best Practices**

- Understand lexical scope to predict variable access and closure behavior
- Avoid naming collisions in nested scopes to reduce shadowing confusion
- Use lexical scoping to encapsulate logic cleanly in factory functions and modules

### `this` Keyword

The `this` keyword in JavaScript refers to the **execution context** — the object that is currently calling the function. Its value depends on **how** a function is invoked, not where it’s defined.

**Global Context**

In non-strict mode, `this` in the global scope refers to the global object (`window` in browsers, `global` in Node.js). In strict mode, it is `undefined`.

```js
console.log(this) // global object (e.g., window)
```

**Inside Regular Functions**

```js
function show() {
  console.log(this)
}

show() // global object (non-strict) or undefined (strict)
```

**Inside Methods**

When a function is called as a method of an object, `this` refers to the object.

```js
const user = {
  name: 'Ana',
  greet() {
    console.log(this.name)
  }
}

user.greet() // "Ana"
```

**Losing Context**

If a method is extracted from its object, `this` no longer refers to the original object.

```js
const greet = user.greet
greet() // undefined or global (depending on mode)
```

**Arrow Functions**

Arrow functions do **not** bind their own `this`. Instead, they inherit it from their lexical (outer) scope.

```js
const obj = {
  name: 'João',
  regular: function () {
    return this.name
  },
  arrow: () => {
    return this.name
  }
}

obj.regular() // "João"
obj.arrow() // undefined (or global.name)
```

**Constructor Functions**

When used with `new`, `this` refers to the newly created object.

```js
function Person(name) {
  this.name = name
}

const p = new Person('Carlos')
console.log(p.name) // "Carlos"
```

**Using `call`, `apply`, and `bind`**

These methods allow you to explicitly control what `this` refers to.

```js
function showName() {
  console.log(this.name)
}

const user = { name: 'Maria' }

showName.call(user) // "Maria"
showName.apply(user) // "Maria"

const bound = showName.bind(user)
bound() // "Maria"
```

**In Event Handlers**

In DOM event handlers, `this` refers to the element that received the event.

```js
document.querySelector('button').addEventListener('click', function () {
  console.log(this) // the button element
})
```

Use arrow functions if you want to capture `this` from the outer lexical context.

```js
document.querySelector('button').addEventListener('click', () => {
  console.log(this) // lexical `this` — likely the window
})
```

**Best Practices**

- Use regular functions when you need dynamic `this` behavior.
- Use arrow functions to inherit `this` from the surrounding scope (especially in callbacks or class methods).
- Avoid confusion by minimizing reassignment of method references outside their object.

### `call()`, `apply()`, `bind()`

The methods `call()`, `apply()`, and `bind()` are used to **explicitly set the value of `this`** when invoking or preparing to invoke a function. They are useful for borrowing methods, controlling context, or preconfiguring functions.

**call()**

Invokes a function immediately, allowing you to specify `this` and pass arguments one by one.

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

const user = { name: 'Ana' }

greet.call(user, 'Hello', '!') // "Hello, Ana!"
```

**apply()**

Similar to `call()`, but it accepts arguments as an array.

```js
greet.apply(user, ['Hi', '.']) // "Hi, Ana."
```

**bind()**

Returns a new function with `this` permanently set to the specified object. Does **not** invoke the function immediately.

```js
const boundGreet = greet.bind(user, 'Hey', '!!')
boundGreet() // "Hey, Ana!!"
```

You can call the bound function later, or assign it elsewhere.

**Practical Use: Method Borrowing**

```js
const person = { name: 'Lucas' }
function sayName() {
  console.log(this.name)
}

sayName.call(person) // "Lucas"
```

**Use Case: Array-like Objects**

Borrow `Array` methods for non-array objects (like `arguments` or `NodeList`):

```js
function sum() {
  return Array.prototype.reduce.call(arguments, (a, b) => a + b)
}

sum(1, 2, 3) // 6
```

**Difference Summary**

| Method  | Invokes Function | Accepts Arguments | Returns Function |
| ------- | ---------------- | ----------------- | ---------------- |
| `call`  | Yes              | Individually      | No               |
| `apply` | Yes              | As array          | No               |
| `bind`  | No               | Optionally preset | Yes              |

**Best Practices**

- Use `call` and `apply` for immediate invocation with a specific `this`
- Use `bind` when you want to create a new function with fixed context
- Prefer `call` over `apply` when arguments are known individually
- Use `apply` when arguments are already in an array-like structure

### Immediately Invoked Function Expressions (IIFE)

An **Immediately Invoked Function Expression (IIFE)** is a function that is **defined and executed immediately** after its creation. It creates a private scope and is commonly used to avoid polluting the global namespace.

**Basic Syntax**

```js
;(function () {
  console.log('Executed immediately')
})()
```

Or using arrow functions:

```js
;(() => {
  console.log('Arrow IIFE')
})()
```

**Why Use IIFE?**

- To **encapsulate variables** and avoid exposing them to the global scope.
- To **run initialization code** immediately.
- To **create closures** that capture private state.

**Example: Scope Isolation**

```js
var globalVar = 'I am global'

;(function () {
  var localVar = 'I am local'
  console.log(globalVar) // accessible
  console.log(localVar) // "I am local"
})()

console.log(typeof localVar) // undefined (not accessible outside)
```

**Returning Values from an IIFE**

```js
const result = (function () {
  const x = 5
  const y = 3
  return x + y
})()

console.log(result) // 8
```

**IIFE with Parameters**

```js
;(function (name) {
  console.log(`Hello, ${name}`)
})('Ana')
```

**Used in Module Patterns**

Before ES6 modules, IIFEs were commonly used to simulate module encapsulation.

```js
const Counter = (function () {
  let count = 0
  return {
    increment: () => ++count,
    get: () => count
  }
})()

Counter.increment() // 1
Counter.get() // 1
```

**Best Practices**

- Use IIFE when you need to create a one-time isolated scope.
- Avoid overusing IIFEs in modern code, as `let`, `const`, and ES modules now provide better scoping and encapsulation.

## Asynchronous JavaScript

### Promises and Async Flow (`then`, `catch`, `finally`)

Promises are a core feature of modern asynchronous JavaScript. They represent a value that may be available now, in the future, or never.

A promise can be in one of three states:

- **Pending**: initial state
- **Fulfilled**: operation completed successfully
- **Rejected**: operation failed

**Creating a Promise**

```js
const promise = new Promise((resolve, reject) => {
  const success = true
  if (success) {
    resolve('Success!')
  } else {
    reject('Failure.')
  }
})
```

**then()**

Used to handle fulfillment.

```js
promise.then((result) => {
  console.log(result) // "Success!"
})
```

**catch()**

Used to handle rejection.

```js
promise
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
```

**finally()**

Runs regardless of fulfillment or rejection.

```js
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('Done'))
```

**Chaining**

`.then()` returns a new promise, allowing chaining.

```js
fetch('/api/user')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    return fetch(`/api/profile/${data.id}`)
  })
  .then((res) => res.json())
  .then((profile) => console.log(profile))
  .catch((err) => console.error('Error:', err))
```

Each `.then()` waits for the previous one to complete, and its return value is passed to the next.

**Returning Promises Inside then()**

You can return a promise inside a `.then()` to wait for another async task.

```js
doTask()
  .then((result) => {
    return doAnotherTask(result) // returns a new promise
  })
  .then((finalResult) => {
    console.log(finalResult)
  })
```

**Promise Resolution Rules**

- If `.then()` returns a value → it's wrapped in a resolved promise.
- If it throws → it's wrapped in a rejected promise.
- If it returns a promise → it waits for that promise to settle.

**Best Practices**

- Use `.catch()` at the end of chains to handle errors gracefully.
- Use `.finally()` for cleanup logic (e.g., hide loading spinners).
- Avoid deeply nested `.then()` calls; prefer chaining or `async/await`.
- Always return promises or values from `.then()` if you want to pass data to the next handler.

### Async/Await

`async` and `await` provide a more readable and imperative syntax for working with promises. They make asynchronous code look and behave like synchronous code, without changing its non-blocking nature.

**Declaring an Async Function**

An `async` function always returns a promise.

```js
async function greet() {
  return 'Hello'
}

greet().then((msg) => console.log(msg)) // "Hello"
```

If you return a non-promise value from an async function, it will be automatically wrapped in a resolved promise.

**Using await**

The `await` keyword pauses execution within an `async` function until the promise resolves or rejects.

```js
async function fetchUser() {
  const response = await fetch('/api/user')
  const data = await response.json()
  console.log(data)
}
```

Execution pauses at each `await` and resumes once the awaited promise settles.

**Error Handling with try/catch**

Use `try/catch` blocks inside `async` functions to handle errors.

```js
async function loadProfile() {
  try {
    const res = await fetch('/api/profile')
    const profile = await res.json()
    console.log(profile)
  } catch (err) {
    console.error('Failed to load profile:', err)
  }
}
```

**Parallel Await with Promise.all**

Use `Promise.all` with `await` to run tasks in parallel.

```js
async function loadResources() {
  const [user, posts] = await Promise.all([
    fetch('/api/user').then((res) => res.json()),
    fetch('/api/posts').then((res) => res.json())
  ])

  console.log(user, posts)
}
```

This is more efficient than awaiting each one sequentially.

**Top-Level await (ES2022)**

In supported environments or inside modules, you can use `await` outside of an `async` function.

```js
const data = await fetch('/api/data').then((res) => res.json())
```

**Behavior Summary**

| Feature       | Description                                  |
| ------------- | -------------------------------------------- |
| `async`       | Marks a function as returning a promise      |
| `await`       | Pauses async function until promise resolves |
| `try/catch`   | Handles errors from awaited promises         |
| `Promise.all` | Awaits multiple promises in parallel         |

**Best Practices**

- Use `async/await` for linear, readable async logic.
- Wrap awaits in `try/catch` to handle rejections.
- Use `Promise.all` for parallel fetches when order doesn't matter.
- Avoid `await` inside loops when tasks can run concurrently.

### `fetch()` and `response.json()`

The `fetch()` function is a modern built-in API used to make HTTP requests in JavaScript. It returns a **Promise** that resolves to a `Response` object representing the response to the request.

**Basic Usage**

```js
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Fetch error:', error))
```

**Why Two `.then()` Calls?**

1. The first `.then()` receives a `Response` object (the raw HTTP response).
2. Calling `response.json()` returns another promise that resolves to the parsed JSON body.

```js
fetch(url)
  .then((res) => res.json()) // parses JSON body
  .then((data) => {
    /* use data */
  })
```

This is required because reading the response body is **asynchronous** — it may not be fully available immediately.

**Using with `async/await`**

```js
async function loadData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}
```

**Checking for HTTP Errors**

`fetch()` only rejects on **network errors**, not for HTTP status codes like 404 or 500. You must check the status manually.

```js
async function fetchWithStatusCheck(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }
  return res.json()
}
```

**Sending Data with POST**

```js
fetch('/api/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Ana' })
})
```

**Other Response Parsers**

- `response.text()` — returns a string
- `response.blob()` — for binary data (e.g., images, files)
- `response.formData()` — for form submissions
- `response.arrayBuffer()` — for low-level binary

**Best Practices**

- Always check `response.ok` before calling `.json()`
- Use `try/catch` to handle network errors
- Set appropriate headers when sending data
- Use `async/await` for cleaner flow in complex logic

### Promise Utilities (`Promise.all`, `race`, `any`, `allSettled`)

JavaScript provides several built-in utilities to manage multiple promises concurrently. These methods help coordinate multiple asynchronous operations with different success/failure handling strategies.

**Promise.all(promises)**

Waits for **all promises to fulfill**. If any promise rejects, the whole call rejects immediately.

```js
const p1 = fetch('/user')
const p2 = fetch('/posts')

Promise.all([p1, p2])
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([user, posts]) => {
    console.log(user, posts)
  })
  .catch((err) => {
    console.error('At least one request failed:', err)
  })
```

- Use when **all results are required** and **failure of one means failure of all**
- **Fails fast** (first rejection aborts the rest)

**Promise.race(promises)**

Returns a promise that settles (fulfills or rejects) as soon as **one of the input promises settles**.

```js
Promise.race([fetch('/slow'), fetch('/fast')])
  .then((res) => console.log('First resolved'))
  .catch((err) => console.error('First error:', err))
```

- Use when you only care about the **first result**
- Useful for implementing **timeouts**

**Promise.any(promises)**

Returns the **first fulfilled promise**. Ignores rejections unless **all** promises reject.

```js
Promise.any([fetch('/maybe-fails1'), fetch('/maybe-fails2'), fetch('/fast-success')])
  .then((res) => console.log('First success:', res))
  .catch((err) => console.error('All failed:', err)) // AggregateError
```

- Great when **any success is enough**
- Rejections are ignored unless all fail

**Promise.allSettled(promises)**

Waits for **all promises to settle** (either fulfilled or rejected). Returns an array of result objects.

```js
Promise.allSettled([fetch('/good'), fetch('/bad')]).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('Success:', result.value)
    } else {
      console.error('Failure:', result.reason)
    }
  })
})
```

- Use when you want to **wait for all results**, regardless of success/failure
- Never fails — it always resolves with all statuses

**Summary Table**

| Method               | Resolves When          | Rejects When        | Use Case                                 |
| -------------------- | ---------------------- | ------------------- | ---------------------------------------- |
| `Promise.all`        | All promises fulfill   | Any promise rejects | Wait for all results (fail fast)         |
| `Promise.race`       | First promise settles  | First one to reject | Compete tasks or timeout handling        |
| `Promise.any`        | First promise fulfills | All promises reject | Use first success, tolerate some failure |
| `Promise.allSettled` | All promises settle    | Never rejects       | Gather all results without failing       |

**Best Practices**

- Use `Promise.all` when **every result is required**.
- Use `Promise.any` when **one good result is enough**.
- Use `Promise.race` for **timeouts** or picking the fastest.
- Use `Promise.allSettled` to **gather all outcomes** without interruption.

## Objects, Classes, and Inheritance

### Classes and Inheritance

JavaScript supports class-based syntax (introduced in ES6) to define objects and implement inheritance. Behind the scenes, it uses prototypes, but the class syntax offers a cleaner, more familiar structure.

**Defining a Class**

```js
class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hello, my name is ${this.name}`
  }
}

const user = new Person('Ana')
user.greet() // "Hello, my name is Ana"
```

- `constructor` is called when a new instance is created with `new`
- Methods defined inside the class body are placed on the prototype

**Class Expressions**

Classes can also be defined anonymously or with a name and assigned to a variable.

```js
const Animal = class {
  speak() {
    return 'Generic sound'
  }
}
```

**Inheritance with `extends`**

Use `extends` to create a subclass that inherits from a parent class.

```js
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    return `${this.name} makes a sound`
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`
  }
}

const d = new Dog('Rex')
d.speak() // "Rex barks"
```

**Calling Parent Methods with `super`**

Use `super()` to call the parent class constructor or methods.

```js
class Cat extends Animal {
  constructor(name, breed) {
    super(name) // calls Animal's constructor
    this.breed = breed
  }

  speak() {
    return super.speak() + ' and meows'
  }
}
```

**Static Methods**

Static methods are called on the class itself, not instances.

```js
class MathUtils {
  static add(a, b) {
    return a + b
  }
}

MathUtils.add(2, 3) // 5
```

**Instance vs Static Methods**

- **Instance methods** operate on individual object instances.
- **Static methods** are utility functions called on the class directly.

**Class Fields (Public and Private)**

Public fields:

```js
class Example {
  count = 0
}
```

Private fields (ES2022+):

```js
class Counter {
  #count = 0

  increment() {
    this.#count++
    return this.#count
  }
}
```

**Best Practices**

- Use `extends` and `super` for clear inheritance.
- Avoid deep inheritance chains; favor composition when possible.
- Use private fields to encapsulate internal state when needed.
- Prefer class syntax for defining reusable object blueprints.

### Prototypes and the Prototype Chain

JavaScript is a prototype-based language. Every object has an internal link to another object called its **prototype**, which forms the basis for **inheritance** and **shared behavior**.

**Prototype**

The `prototype` is a special object from which other objects can inherit properties and methods.

```js
function Person(name) {
  this.name = name
}

Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`
}

const user = new Person('Ana')
user.greet() // "Hello, I'm Ana"
```

In this example:

- `greet` is defined once on `Person.prototype`
- All `Person` instances share it through inheritance

**Prototype Chain**

When accessing a property or method:

1. JavaScript looks on the object itself
2. If not found, it looks up the prototype chain
3. This continues until it finds the property or reaches `null`

```js
console.log(user.toString()) // from Object.prototype
```

**Inspecting the Prototype**

```js
Object.getPrototypeOf(user) // returns Person.prototype
user.__proto__ === Person.prototype // true
```

**Classes Use Prototypes Too**

The `class` syntax is syntactic sugar over prototypes.

```js
class Animal {
  speak() {
    return 'generic sound'
  }
}

const a = new Animal()
console.log(Object.getPrototypeOf(a)) // Animal.prototype
```

**Custom Inheritance**

You can manually set the prototype of one object to another.

```js
const parent = {
  greet() {
    return 'hi'
  }
}
const child = Object.create(parent)

child.greet() // "hi"
```

**Prototype Chain Example**

```js
const grandparent = { a: 1 }
const parent = Object.create(grandparent)
const child = Object.create(parent)

console.log(child.a) // 1 — found via prototype chain
```

**Built-in Prototypes**

All standard objects like `Array`, `Function`, and `Object` have prototypes.

```js
const arr = [1, 2, 3]
arr.__proto__ === Array.prototype // true
```

**Best Practices**

- Avoid modifying built-in prototypes (`Array.prototype`, `Object.prototype`)
- Use `Object.create()` for prototype-based inheritance when needed
- Prefer `class` and `extends` syntax for clarity unless low-level control is necessary

### When to Use Class vs Object Literal

Choosing between a `class` and an object literal depends on the use case, design requirements, and whether instantiation or inheritance is needed.

**Use `class` when:**

- You need to create **multiple instances** that share structure and behavior
- You want to implement **inheritance** (via `extends`)
- You need **instance methods**, **constructors**, or **private fields**
- You want to model entities like `User`, `Product`, `Animal`, etc.

```js
class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }

  getLabel() {
    return `${this.name} - $${this.price}`
  }
}

const p1 = new Product('Book', 29.99)
const p2 = new Product('Pen', 3.5)
```

**Use object literals when:**

- You need a **single configuration or data structure**
- You don’t need inheritance or instantiation
- You are working with static values or one-off utilities

```js
const config = {
  appName: 'MyApp',
  version: '1.0.0',
  debug: true
}
```

**Summary**

| Use Case                                 | Prefer         |
| ---------------------------------------- | -------------- |
| Creating many instances                  | `class`        |
| Need for constructors and private fields | `class`        |
| One-time structured data or constants    | Object literal |
| Global settings or configuration         | Object literal |
| Utility namespaces                       | Object literal |

## Execution Model

### Hoisting

**Hoisting** is JavaScript’s behavior of **moving declarations to the top** of their containing scope during the compilation phase, before code execution begins. This affects variables (`var`, `let`, `const`) and functions.

**Variable Hoisting**

- `var` declarations are hoisted and initialized with `undefined`.
- `let` and `const` are hoisted but **not initialized**. Accessing them before declaration causes a **ReferenceError** due to the **Temporal Dead Zone (TDZ)**.

```js
console.log(a) // undefined
var a = 5

console.log(b) // ReferenceError: Cannot access 'b' before initialization
let b = 10

console.log(c) // ReferenceError
const c = 15
```

**Function Hoisting**

Function declarations are fully hoisted — you can call them before they are defined.

```js
sayHello() // "Hello"

function sayHello() {
  console.log('Hello')
}
```

**Function expressions**, whether using `const`, `let`, or `var`, are not hoisted as callable functions — only the variable declaration is hoisted, not the function value.

```js
greet() // TypeError: greet is not a function

const greet = function () {
  console.log('Hi')
}
```

**Arrow functions** behave the same as function expressions.

```js
sayHi() // TypeError

let sayHi = () => {
  console.log('Hi')
}
```

**Hoisting Summary**

| Construct            | Hoisted | Initialized       | Usable Before Declaration |
| -------------------- | ------- | ----------------- | ------------------------- |
| `var`                | Yes     | Yes (`undefined`) | Yes (but risky)           |
| `let` / `const`      | Yes     | No (TDZ)          | No                        |
| Function Declaration | Yes     | Yes               | Yes                       |
| Function Expression  | Yes     | No                | No                        |
| Arrow Function       | Yes     | No                | No                        |

**Best Practices**

- Always declare variables at the top of their scope to make hoisting behavior explicit.
- Use `let` and `const` instead of `var` to avoid accidental bugs.
- Define functions before you use them to keep code readable and predictable.

### The Event Loop and Microtasks

JavaScript is single-threaded and uses an **event loop** to handle asynchronous operations like timers, promises, and I/O. Understanding how the event loop, the call stack, and task queues work is essential for writing non-blocking and predictable code.

**Call Stack**

The call stack is where JavaScript keeps track of currently executing functions. When a function is invoked, it’s pushed onto the stack; when it finishes, it’s popped off.

```js
function one() {
  two()
}
function two() {
  console.log('Two')
}
one() // Call stack: [one → two]
```

**Event Loop**

The event loop continuously checks whether the call stack is empty. If so, it processes messages from the **task queues** — either the **macro task queue** or the **microtask queue**.

**Macro Tasks vs Microtasks**

- **Macro tasks**: `setTimeout`, `setInterval`, DOM events, etc.
- **Microtasks**: Promises (`.then` / `catch`), `queueMicrotask`, `MutationObserver`

Microtasks are always executed **before** the next macro task.

**Execution Order Example**

```js
console.log('start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise')
})

console.log('end')
```

**Output:**

```
start
end
promise
setTimeout
```

Explanation:

1. `"start"` and `"end"` run synchronously.
2. The microtask (from `.then`) runs **after synchronous code but before** the timer.
3. The `setTimeout` callback runs last, even if the delay is `0`.

**Visual Summary**

1. Run global script (synchronous code)
2. Empty the microtask queue (e.g., promises)
3. Process one macro task (e.g., `setTimeout`)
4. Repeat

**queueMicrotask()**

Used to queue a microtask explicitly.

```js
queueMicrotask(() => {
  console.log('microtask')
})
```

**Why This Matters**

- Long synchronous tasks block all async execution
- Microtasks can delay timers if they accumulate
- Async code order often causes logic bugs if misunderstood

**Best Practices**

- Use promises and `async/await` for cleaner asynchronous flow
- Avoid using too many nested microtasks to prevent starvation of macro tasks
- Be mindful of the task type when expecting execution order

## Advanced Concepts

### Debounce and Throttle

**Debounce** and **throttle** are techniques used to control how often a function is executed, especially in response to high-frequency events like keystrokes, scrolls, or resizes. These help improve performance and prevent excessive function calls.

**Debounce**

Debounce delays the execution of a function until a certain period of inactivity has passed. If the event keeps firing, the timer resets.

```js
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
```

**Use Case:**

```js
window.addEventListener(
  'resize',
  debounce(() => {
    console.log('Resized after pause')
  }, 300)
)
```

- Executes the function only **after** the event stops firing for `delay` ms
- Useful for input validation, resizing, and search autocomplete

**Throttle**

Throttle ensures a function is called at most once in a given interval. It **limits frequency**, not delays execution.

```js
function throttle(fn, limit) {
  let inThrottle = false
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
```

**Use Case:**

```js
window.addEventListener(
  'scroll',
  throttle(() => {
    console.log('Scroll handler (max once every 500ms)')
  }, 500)
)
```

- Ensures the function executes **at most once** per time window
- Useful for scroll, drag, and mouse move events

**Comparison**

**Comparison**

| Feature   | Debounce                            | Throttle                            |
| --------- | ----------------------------------- | ----------------------------------- |
| Behavior  | Delays execution until inactivity   | Limits execution rate               |
| Frequency | Fires once after delay              | Fires at most once per interval     |
| Use Case  | Search inputs, resize, autocomplete | Scroll, drag, continuous mouse move |

**Best Practices**

- Use debounce when you want to wait for the user to stop typing, resizing, etc.
- Use throttle when you need regular updates at a fixed rate but not too often.
- For UI responsiveness, throttle is preferred to prevent overload.

### Symbols

A `Symbol` is a **primitive data type** introduced in ES6. It is used to create **unique and immutable identifiers** for object properties.

**Creating Symbols**

```js
const sym1 = Symbol()
const sym2 = Symbol('description')

console.log(sym1 === sym2) // false — each Symbol is unique
```

Even if two symbols have the same description, they are not equal.

**Using Symbols as Object Keys**

```js
const id = Symbol('id')

const user = {
  name: 'Ana',
  [id]: 123
}

console.log(user[id]) // 123
```

- Symbols allow for hidden or non-colliding property keys
- They do not appear in `for...in`, `Object.keys()`, or `JSON.stringify()`

**Accessing Symbol Properties**

To list symbol properties, use:

```js
Object.getOwnPropertySymbols(user) // [Symbol(id)]
```

**Global Symbol Registry**

You can use `Symbol.for()` to create or reuse a symbol from a shared global registry.

```js
const globalId1 = Symbol.for('id')
const globalId2 = Symbol.for('id')

console.log(globalId1 === globalId2) // true
```

**Built-in Symbols**

JavaScript defines several **well-known symbols** used to customize behavior:

- `Symbol.iterator` — defines default iterator
- `Symbol.toPrimitive` — custom type conversion
- `Symbol.toStringTag` — custom string tag for objects

**Example: Custom Iterator**

```js
const iterable = {
  *[Symbol.iterator]() {
    yield 1
    yield 2
    yield 3
  }
}

for (const value of iterable) {
  console.log(value) // 1, 2, 3
}
```

**Best Practices**

- Use symbols when you want to define properties that won’t clash with other keys
- Prefer `Symbol.for()` when you need global symbol reuse
- Use built-in symbols to customize native behaviors (like iteration)

### Garbage Collection (theory)

**Garbage collection** (GC) in JavaScript is the process by which the JavaScript engine automatically reclaims memory that is no longer needed. Developers don't manually allocate or free memory — instead, the engine identifies and removes data that is unreachable.

**Reachability**

An object is considered **reachable** and kept in memory if it is accessible in some way:

- From a global variable
- From a local variable in an active function
- From a property of another reachable object

If no references to an object remain, it becomes **unreachable** and eligible for garbage collection.

```js
let user = { name: 'Ana' }
user = null // The object is no longer reachable
```

**Mark-and-Sweep Algorithm**

The most common GC algorithm in JavaScript engines (like V8) is **mark-and-sweep**:

1. **Mark** all reachable objects from the roots (global variables, function scopes, etc.)
2. **Sweep** and remove all unmarked (unreachable) objects from memory

This process runs periodically and may momentarily pause execution.

**Circular References**

JavaScript garbage collectors handle circular references properly, as long as nothing in the circle is reachable.

```js
function createCycle() {
  const a = {}
  const b = {}
  a.ref = b
  b.ref = a
}
```

As long as `a` and `b` are out of scope and unreachable, they will be collected.

**Memory Leaks**

Even with GC, memory leaks can occur when objects are unintentionally kept reachable:

- Storing unused data in global variables
- Keeping references in closures
- Not cleaning up timers or event listeners
- Caching too aggressively

**Manual Cleanup**

While JavaScript handles GC automatically, you can help by:

- Nulling out large objects when no longer needed
- Removing event listeners (`element.removeEventListener`)
- Clearing timers (`clearTimeout`, `clearInterval`)
- Cleaning unused references in data stores or caches

**Best Practices**

- Rely on GC, but manage references responsibly
- Avoid unnecessary global variables and long-lived closures
- Clean up timers, intervals, and DOM references when appropriate
- Monitor memory usage in performance-critical applications using browser dev tools

### Immutable vs Mutable Data

Understanding the difference between **mutable** and **immutable** data is essential in JavaScript, especially when managing state or working with functional programming principles.

**Mutable Data**

Mutable data can be **changed in place** — its identity stays the same, but its contents can vary over time.

**Examples:**

```js
const obj = { name: 'Ana' }
obj.name = 'João' // mutation

const arr = [1, 2, 3]
arr.push(4) // mutation
```

- Arrays and objects are mutable by default.
- Functions can have side effects by modifying inputs.

**Immutable Data**

Immutable data **cannot be changed once created**. Any change produces a new copy, leaving the original untouched.

**Examples:**

```js
const str = 'Hello'
const newStr = str.toUpperCase() // "HELLO"
console.log(str) // "Hello" (unchanged)

const a = 5
const b = a + 1 // a is still 5
```

- Primitive types (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) are immutable.
- You can **treat** arrays and objects immutably using copies.

**Immutability with Objects and Arrays**

Use spread or methods like `map`, `filter`, and `slice` to avoid mutation:

```js
const person = { name: 'Ana' }
const updated = { ...person, name: 'João' } // new object

const nums = [1, 2, 3]
const extended = [...nums, 4] // [1, 2, 3, 4]
```

**Benefits of Immutability**

- Easier debugging and reasoning (no side effects)
- Safer in concurrent or async environments
- Helps detect unwanted changes (e.g., in React state)

**Trade-offs**

- May involve more memory or CPU due to copying
- Deep structures require deep copies or structural sharing

**Best Practices**

- Treat primitives as immutable (they are by design)
- Use non-mutating array/object operations to avoid side effects
- Avoid in-place mutations unless explicitly needed and controlled
- Consider using libraries (e.g., Immer, Immutable.js) for complex structures

### Shallow vs Deep Copy

When copying objects or arrays in JavaScript, it's important to distinguish between **shallow copy** and **deep copy**. This determines whether nested structures are duplicated or merely referenced.

**Shallow Copy**

A shallow copy **duplicates only the top-level properties**. Nested objects or arrays remain as **shared references**.

```js
const original = { name: 'Ana', address: { city: 'Lisbon' } }
const shallow = { ...original }

shallow.name = 'João'
shallow.address.city = 'Porto'

console.log(original.name) // "Ana" — not affected
console.log(original.address.city) // "Porto" — affected (shared reference)
```

Common shallow copy methods:

- `Object.assign({}, obj)`
- `{ ...obj }`
- `Array.prototype.slice()`
- `[...array]`

These work fine for flat objects but not for deeply nested structures.

**Deep Copy**

A deep copy **recursively duplicates all levels** of the structure, ensuring no references are shared.

**Manual Deep Copy (Recursive)**

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepClone)

  const copy = {}
  for (const key in obj) {
    copy[key] = deepClone(obj[key])
  }
  return copy
}
```

**Using JSON (for plain objects only)**

```js
const deep = JSON.parse(JSON.stringify(original))
```

Limitations:

- Omits functions, `undefined`, `Date`, `Map`, `Set`, circular references

**Using Structured Clone API**

Modern browsers support structured deep cloning:

```js
const deep = structuredClone(original)
```

Supports more types than `JSON.parse/stringify`, including Dates, Maps, Sets, and circular references.

**Best Practices**

- Use shallow copies for flat structures or when references are acceptable
- Use deep copies for immutable patterns or to avoid shared state bugs
- Use `structuredClone()` or libraries (e.g., Lodash's `_.cloneDeep`) for reliable deep copies

### JSON Methods (`JSON.stringify`, `JSON.parse`)

JavaScript provides two primary methods for converting data to and from JSON (JavaScript Object Notation):

- `JSON.stringify()` — converts a JavaScript value to a JSON string
- `JSON.parse()` — parses a JSON string to produce a JavaScript object

These are commonly used for **data serialization**, **storage**, and **network communication**.

**JSON.stringify()**

Converts objects, arrays, or values into a JSON-formatted string.

```js
const user = { name: 'Ana', age: 30 }
const jsonString = JSON.stringify(user)

console.log(jsonString) // '{"name":"Ana","age":30}'
```

Values that are `undefined`, functions, or symbols are **omitted** when found in objects.

```js
const obj = { a: 1, b: undefined, c: () => {} }
JSON.stringify(obj) // '{"a":1}'
```

You can also pass a **replacer** function or array to filter or transform keys.

```js
JSON.stringify(user, ['name']) // '{"name":"Ana"}'
```

You can format the output using the third `space` argument.

```js
JSON.stringify(user, null, 2)
```

**JSON.parse()**

Parses a JSON string and returns the corresponding JavaScript object.

```js
const jsonStr = '{"name":"Ana","age":30}'
const obj = JSON.parse(jsonStr)

console.log(obj.name) // "Ana"
```

Throws an error if the string is not valid JSON.

```js
JSON.parse("{name: 'Ana'}") // SyntaxError — keys must be in double quotes
```

You can also pass a **reviver** function to transform values during parsing.

```js
const revived = JSON.parse(jsonStr, (key, value) => {
  if (key === 'age') return value + 1
  return value
})
```

**Use Cases**

- Sending and receiving data over HTTP (e.g., `fetch`)
- Storing structured data in `localStorage`
- Serializing logs or configuration files
- Deep copying plain objects (with limitations)

**Limitations**

- Cannot serialize `undefined`, functions, or circular references
- Date objects are converted to strings (use reviver to rehydrate)
- Does not support `Map`, `Set`, `Symbol`, `BigInt`

**Best Practices**

- Always wrap `JSON.parse()` in `try/catch` for error safety
- Use `stringify` with formatting for readable debug logs
- Avoid using JSON for complex or circular data structures
- Use `structuredClone()` for robust deep copying instead of JSON

### `typeof` and `instanceof`

`typeof` and `instanceof` are JavaScript operators used to inspect the type of values, but they serve different purposes and behave differently.

**typeof**

Used to determine the **primitive type** of a value or certain object types. Returns a string.

```js
typeof 42 // "number"
typeof 'hello' // "string"
typeof true // "boolean"
typeof undefined // "undefined"
typeof Symbol() // "symbol"
typeof 10n // "bigint"
typeof null // "object" ← historical bug
typeof [] // "object"
typeof {} // "object"
typeof function () {} // "function"
```

**Limitations of typeof**

- Returns `"object"` for arrays and `null`
- Does not distinguish between different object types

**instanceof**

Used to check whether an object is an instance of a particular **constructor function or class**. Works with inheritance and prototype chains.

```js
;[] instanceof Array // true
;[] instanceof Object // true
new Date() instanceof Date // true
;({}) instanceof Object // true
```

**Custom Class Example**

```js
class Person {}
const user = new Person()

user instanceof Person // true
user instanceof Object // true
```

**Comparing typeof vs instanceof**

| Use Case                 | Use                |
| ------------------------ | ------------------ |
| Check primitive type     | `typeof`           |
| Check object constructor | `instanceof`       |
| Check for null           | `x === null`       |
| Check if array           | `Array.isArray(x)` |

**Checking Arrays Properly**

Avoid using `typeof` for arrays:

```js
typeof [] // "object" ← not useful
Array.isArray([]) // true     ← correct
```

**Best Practices**

- Use `typeof` for primitive types
- Use `instanceof` for object/class identity
- Use `Array.isArray()` to detect arrays
- Be aware of prototype inheritance when using `instanceof`

### Tail Call Optimization (theory)

**Tail Call Optimization (TCO)** is a compiler-level optimization that allows certain recursive function calls to reuse stack frames, preventing stack overflow and improving performance.

**Tail Call Definition**

A **tail call** is a function call that is the **last operation** in a function — its result is immediately returned.

```js
function add(a, b) {
  return a + b // tail call
}
```

In recursion:

```js
function factorial(n, acc = 1) {
  if (n === 0) return acc
  return factorial(n - 1, acc * n) // tail call
}
```

**Why It Matters**

Without TCO, each recursive call adds a new stack frame, leading to potential stack overflow:

```js
function count(n) {
  if (n === 0) return
  return count(n - 1) // not optimized without TCO
}
```

With TCO, the engine can **reuse the current stack frame**, making recursion as efficient as iteration.

**TCO Requirements (in spec)**

For a function call to be optimized:

- It must be in tail position (last action in the function)
- Its result must be returned directly
- No further computation can follow it

**Not Tail Call Optimized Example**

```js
function multiply(x, y) {
  return x * y + 1 // not a tail call — addition follows
}
```

**JavaScript and TCO**

- **ES6 defines TCO in the specification**, but it is **not widely supported** in JavaScript engines
- As of now, **most environments (e.g., V8/Chrome, Node.js)** do **not implement TCO**
- **Safari/WebKit** had partial support

**Practical Implications**

- You cannot rely on TCO in production JavaScript today
- Prefer iteration for large recursive tasks unless using languages that enforce TCO (e.g., Scheme)
- TCO is more of a theoretical concept in JS for now

**Best Practices**

- Use tail recursion for theoretical clarity or portability to other languages
- Use iterative loops (`for`, `while`) when recursion depth might be large
- Monitor stack usage if using recursion in performance-sensitive code

## Error Handling and Defensive Coding

### Error Handling (`try`, `catch`, `throw`, `finally`)

JavaScript provides structured error handling using `try`, `catch`, `throw`, and `finally` blocks. This mechanism allows you to detect and handle exceptions at runtime and recover gracefully from failures.

**Basic Structure**

```js
try {
  // Code that might throw an error
} catch (err) {
  // Code to handle the error
} finally {
  // Code that runs regardless of success or failure
}
```

**throw**

Use `throw` to manually generate an error.

```js
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero')
  return a / b
}
```

**try / catch**

Wrap code that might throw in a `try` block, and handle failures in the `catch`.

```js
try {
  const result = divide(10, 0)
  console.log(result)
} catch (e) {
  console.error('Caught error:', e.message)
}
```

**finally**

The `finally` block always runs, whether an error occurred or not. Use it for cleanup (e.g., closing resources, resetting state).

```js
try {
  console.log('Start')
  throw new Error('Oops')
} catch (e) {
  console.log('Caught:', e.message)
} finally {
  console.log('Always runs')
}
```

**Catching Specific Errors**

You can examine the `name`, `message`, and `stack` properties of errors:

```js
try {
  JSON.parse('{ malformed }')
} catch (e) {
  if (e instanceof SyntaxError) {
    console.error('Invalid JSON:', e.message)
  } else {
    throw e // re-throw unknown errors
  }
}
```

**Custom Error Classes**

Define your own error types for better clarity and control.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

**Best Practices**

- Throw specific error types with meaningful messages
- Catch and handle only expected or recoverable errors
- Use `finally` for cleanup logic like resource release
- Avoid using exceptions for regular control flow
- Consider using custom error classes to categorize error types

### Short-Circuiting and Logical Operators

JavaScript’s logical operators (`&&`, `||`, `??`) not only return Boolean values in comparisons, but also **return actual operands** using **short-circuit evaluation**. This behavior is commonly used for fallback values, conditional execution, and defaults.

**Logical AND (`&&`)**

- Returns the **first falsy operand**, or the **last operand** if all are truthy.
- Useful for conditional execution.

```js
true && 'hello' // "hello"
false && 'hello' // false
0 && 'hello' // 0
'hi' && 123 // 123
```

**Use Case: Conditional Execution**

```js
isLoggedIn && showDashboard()
```

Runs `showDashboard()` only if `isLoggedIn` is truthy.

**Logical OR (`||`)**

- Returns the **first truthy operand**, or the **last operand** if all are falsy.
- Commonly used to provide default values.

```js
'' || 'default' // "default"
false || 0 || 'hi' // "hi"
null || undefined // undefined
'hello' || 'world' // "hello"
```

**Use Case: Fallbacks**

```js
const name = user.name || 'Anonymous'
```

**Nullish Coalescing (`??`)**

- Introduced in ES2020.
- Returns the **right operand only if the left is `null` or `undefined`** (not falsy).
- Prevents false positives from `0`, `""`, or `false`.

```js
null ?? 'default' // "default"
undefined ?? 'set' // "set"
'' ?? 'fallback' // "" (not null or undefined)
0 ?? 42 // 0
```

**Use Case: Safe Defaults**

```js
const count = inputValue ?? 0
```

**Comparison Table**

| Expression | Returns    | Description                      |
| ---------- | ---------- | -------------------------------- | ---------- | ----------------------- |
| `a && b`   | `a` or `b` | `b` if `a` is truthy             |
| `a         |            | b`                               | `a` or `b` | `a` if truthy, else `b` |
| `a ?? b`   | `a` or `b` | `a` if not `null` or `undefined` |

**Best Practices**

- Use `||` for basic fallbacks, but beware of falsy values like `""` or `0`
- Use `??` when you want to preserve valid falsy values
- Use `&&` for conditional execution or short conditional expressions
- Avoid overusing short-circuiting in complex expressions — favor readability

### Memory Management Tips (unsubscribing, nulling refs, etc.)

Although JavaScript includes automatic garbage collection, developers must still manage memory wisely to prevent **leaks** and **unintended retention**. These practices help avoid unnecessary memory consumption and improve app performance.

**1. Remove Event Listeners**

Failing to remove event listeners keeps DOM elements in memory.

```js
const button = document.querySelector('button')
function handleClick() {
  console.log('Clicked')
}

button.addEventListener('click', handleClick)

// Later, to clean up:
button.removeEventListener('click', handleClick)
```

**2. Clear Timers and Intervals**

Timers create references that can persist indefinitely if not cleared.

```js
const id = setInterval(() => {
  console.log('running')
}, 1000)

// Clear when no longer needed
clearInterval(id)
```

Same applies to `setTimeout`.

**3. Null Unused References**

Set variables to `null` when their data is no longer needed, especially for large structures or detached DOM nodes.

```js
let cache = { largeData: new Array(1000000).fill(0) }

// Free memory
cache = null
```

**4. Avoid Global Variables**

Global variables persist throughout the program and can’t be garbage collected until the page unloads.

```js
// Instead of:
window.data = largeObject

// Use local scope or closures
```

**5. Use WeakMap and WeakSet**

These structures allow keys to be garbage collected if there are no other references.

```js
const wm = new WeakMap()
let obj = {}
wm.set(obj, 'data')

obj = null // The entry in WeakMap is eligible for collection
```

**6. Unsubscribe from Observers or Streams**

When using libraries like RxJS, or working with DOM observers:

```js
const observer = new MutationObserver(() => {
  /* ... */
})
observer.observe(document.body, { childList: true })

// Clean up
observer.disconnect()
```

**7. Avoid Retaining DOM References After Removal**

If an element is removed from the DOM but still referenced in JS, it stays in memory.

```js
let element = document.getElementById('my-div')
document.body.removeChild(element)

// Memory still used
element = null // now eligible for GC
```

**8. Profile Memory Usage**

Use browser dev tools (e.g., Chrome's Memory tab) to:

- Take heap snapshots
- Track detached DOM trees
- Monitor memory over time

**Best Practices**

- Always clean up side effects: listeners, timers, observers
- Nullify references to large data when no longer needed
- Use `let` or `const` in limited scope instead of `var` or globals
- Prefer `WeakMap` or `WeakSet` when appropriate to avoid memory retention
- Audit memory periodically in long-running apps or single-page applications (SPAs)

## Modules and Compilation

### ES Modules (`import`, `export`)

ES Modules (ESM) are the official, standardized module system in JavaScript. Introduced in ES6, they allow developers to split code into reusable and maintainable pieces by explicitly declaring dependencies using `import` and `export`.

**Creating a Module**

You define exports in one file:

```js
// math.js
export const PI = 3.14159

export function add(a, b) {
  return a + b
}
```

**Importing a Module**

You consume exports in another file:

```js
// app.js
import { PI, add } from './math.js'

console.log(add(PI, 2)) // 5.14159
```

**Named Exports**

Export multiple values by name.

```js
// utils.js
export const name = 'Ana'
export function greet() {
  return 'Hello'
}
```

Import using curly braces:

```js
import { name, greet } from './utils.js'
```

**Default Exports**

Used when a module exports a single primary value.

```js
// logger.js
export default function log(msg) {
  console.log(msg)
}
```

Import without braces:

```js
import log from './logger.js'
```

You can combine default and named exports:

```js
export default function () {}
export const version = '1.0'
```

**Aliasing Imports/Exports**

You can rename during import or export:

```js
// math.js
export { add as sum }

// app.js
import { sum } from './math.js'
```

**Re-exporting**

You can re-export from another module.

```js
// index.js
export * from './math.js'
export { add as sum } from './math.js'
```

**Module Scope**

Each module has its own top-level scope — variables declared in one module are **not global**.

**Module Type (Browser)**

In HTML, enable ESM using `type="module"`:

```html
<script type="module" src="main.js"></script>
```

This enables features like `import`, strict mode, and top-level `await`.

**Key Features of E**

### Polyfills and Transpilation

Modern JavaScript development often relies on **polyfills** and **transpilation** to ensure compatibility with older environments while using the latest language features.

**Polyfill**

A polyfill is a **piece of code that adds missing functionality** in environments that do not natively support a given feature.

For example, older browsers might not support `Array.prototype.includes`. A polyfill adds it:

```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1
  }
}
```

**Common Polyfills**

- `Promise`
- `Array.prototype.includes`
- `String.prototype.startsWith`
- `fetch`
- `Object.assign`

**How to Use Polyfills**

Use libraries like:

- **core-js** — comprehensive polyfills for modern features
- **whatwg-fetch** — for `fetch` in older browsers

```bash
npm install core-js
```

Then import as needed:

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime' // for async/await
```

**Transpilation**

Transpilation is the process of **converting newer JavaScript code into older equivalent code** using a tool, typically **Babel**.

Example:

```js
// ES6 code
const greet = () => 'Hello'

// Babel-transpiled ES5 code
var greet = function () {
  return 'Hello'
}
```

**Why Transpile**

- Ensures compatibility with older environments (e.g., IE11)
- Converts modern syntax: `class`, `arrow functions`, `let/const`, `async/await`
- Enables modular code using `import/export`

**Popular Tools**

- **Babel** — most common JavaScript transpiler
- **TypeScript** — also compiles modern JavaScript/TS to older JS
- **Webpack / Vite / Rollup** — bundlers that integrate transpilation and polyfills

**Babel Example Setup**

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

`.babelrc` config:

```json
{
  "presets": ["@babel/preset-env"]
}
```

**Targeting Environments**

Use `@babel/preset-env` with a `browserslist` to specify which environments to support. Babel will transpile and include only necessary polyfills.

**Best Practices**

- Use polyfills sparingly; prefer native features where available
- Transpile only the necessary code for your target environments
- Bundle polyfills and transpiled code in production builds
- Test on multiple browsers to ensure compatibility

### BigInt

`BigInt` is a built-in JavaScript primitive type that allows you to represent and work with integers **larger than the safe limit of `Number`** (`2^53 - 1`).

**Why BigInt?**

JavaScript's `Number` type uses 64-bit floating-point representation, which safely supports integers only up to:

```js
Number.MAX_SAFE_INTEGER === 9007199254740991
```

Beyond this, precision errors occur:

````js
console.log(9007199254740991 + 1) // 9007199254740992
console.log(9007199254740991 + 2) // 9007199254740992```

**Creating BigInts**

You can create BigInts in two ways:

```js
const big = 1234567890123456789012345678901234567890n // literal
const alsoBig = BigInt('1234567890123456789012345678901234567890') // constructor
````

**Operations**

You can use standard arithmetic operators (`+`, `-`, `*`, `/`, `%`, `**`) with BigInts:

```js
const a = 10n
const b = 3n

console.log(a + b) // 13n
console.log(a * b) // 30n
console.log(a / b) // 3n (rounded down)
```

**Cannot Mix BigInt with Number**

You must convert one to the other explicitly:

```js
const a = 10n
const b = 2

console.log(a + BigInt(b)) // 12n
console.log(Number(a) + b) // 12
```

Mixing types directly causes a `TypeError`.

**Comparisons**

BigInt and Number can be compared with `==` (loose equality), but not with arithmetic:

```js
1n == 1 // true
1n === 1 // false (different types)
```

**Limitations**

- Not usable with `Math` methods (e.g., `Math.sqrt`, `Math.max`)
- Cannot be serialized to JSON (`JSON.stringify` throws)
- No decimal support — BigInt only handles integers

**Best Practices**

- Use BigInt for calculations involving very large integers
- Avoid mixing BigInt and Number types
- Be cautious with libraries and APIs that may not support BigInt
- Don't use BigInt where floating-point precision or decimals are required

## Edge Topics

### Event Delegation

**Event delegation** is a pattern in JavaScript where a single event listener is attached to a parent element to handle events on its current or future child elements. It works by using **event bubbling**, where events propagate from the target element up to the ancestors.

**Why Use Event Delegation**

- Improve performance by reducing the number of event listeners
- Handle dynamically added elements without reattaching listeners
- Clean and centralized event handling

**Basic Example**

Instead of adding a click listener to every `<li>`, delegate it to the parent `<ul>`:

```html
<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

```js
document.getElementById('menu').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent)
  }
})
```

**How It Works**

1. The actual click occurs on an `<li>` element.
2. The event bubbles up to the `<ul>`.
3. The event listener on `<ul>` inspects `e.target` to determine if it's relevant.

**Use Case: Dynamically Added Elements**

```js
const list = document.getElementById('menu')

list.addEventListener('click', function (e) {
  if (e.target.matches('li')) {
    console.log('Item clicked:', e.target.textContent)
  }
})

const newItem = document.createElement('li')
newItem.textContent = 'Blog'
list.appendChild(newItem) // No need to add a new event listener
```

**Prevent Unwanted Matches**

Check the event target carefully to avoid false positives.

```js
if (e.target.closest('li')) {
  // only run if a real <li> or its child was clicked
}
```

**Best Practices**

- Use event delegation for lists, tables, or interactive containers
- Avoid using it when capturing complex gestures or on isolated elements
- Always verify the target with `e.target`, `e.currentTarget`, or `closest()`
- Use `stopPropagation()` carefully — it halts delegation

**Benefits**

- Fewer listeners, especially in large or dynamic UIs
- Cleaner code and separation of concerns
- Automatically handles dynamic DOM updates

### Custom Events (`new CustomEvent`)

Custom events allow you to define and dispatch your own application-specific events using the `CustomEvent` constructor. This enables decoupled communication between components or elements, especially in DOM-based applications.

**Creating a Custom Event**

```js
const event = new CustomEvent('user-logged-in', {
  detail: { username: 'Ana' }
})
```

- The first argument is the event name (must be a string).
- The second argument is an options object:
  - `detail`: custom payload passed with the event
  - `bubbles`: whether the event should bubble (default: `false`)
  - `cancelable`: whether `preventDefault()` can be called (default: `false`)
  - `composed`: whether it can bubble across shadow DOM boundaries (default: `false`)

**Dispatching a Custom Event**

You can dispatch the event using `element.dispatchEvent()`.

```js
const el = document.getElementById('my-element')

el.dispatchEvent(event)
```

**Listening for a Custom Event**

```js
el.addEventListener('user-logged-in', function (e) {
  console.log('Logged in:', e.detail.username)
})
```

**Bubbling Example**

```js
const event = new CustomEvent('cart-updated', {
  detail: { totalItems: 3 },
  bubbles: true
})

document.querySelector('button').dispatchEvent(event)

document.body.addEventListener('cart-updated', (e) => {
  console.log('Cart changed:', e.detail.totalItems)
})
```

**Cancelable Example**

```js
const event = new CustomEvent('form-submit', {
  cancelable: true
})

const canceled = !document.dispatchEvent(event)
if (canceled) {
  console.log('Submission was prevented')
}
```

**Best Practices**

- Use a consistent naming convention (e.g., `kebab-case`)
- Include relevant data in the `detail` field to avoid coupling
- Avoid naming collisions with built-in DOM event names
- Consider using `bubbles: true` if multiple layers need to respond

### Generator Functions (`function*`)

Generator functions are a special type of function that can **pause** and **resume** execution using the `yield` keyword. They return an **iterator**, allowing for controlled, on-demand iteration of values.

**Syntax**

Use the `function*` keyword to define a generator.

```js
function* countToThree() {
  yield 1
  yield 2
  yield 3
}
```

Calling the generator does **not** run its body — it returns a generator object:

```js
const gen = countToThree()
gen.next() // { value: 1, done: false }
gen.next() // { value: 2, done: false }
gen.next() // { value: 3, done: false }
gen.next() // { value: undefined, done: true }
```

**The `yield` Keyword**

Each `yield` pauses the function and returns a value. The next call to `next()` resumes from where it left off.

```js
function* messages() {
  yield 'Hi'
  yield 'How are you?'
  yield 'Bye'
}
```

**Iterating with for...of**

You can iterate over a generator using `for...of`.

```js
for (const msg of messages()) {
  console.log(msg)
}
```

**Passing Values into a Generator**

You can send data into a generator via `next(value)`.

```js
function* echo() {
  const input = yield 'Enter something:'
  console.log('You entered:', input)
}

const gen = echo()
console.log(gen.next().value) // "Enter something:"
console.log(gen.next('Hello').done) // Logs "You entered: Hello"
```

**Infinite Sequences**

Generators can create lazy infinite sequences.

```js
function* naturalNumbers() {
  let n = 1
  while (true) {
    yield n++
  }
}

const gen = naturalNumbers()
gen.next().value // 1
gen.next().value // 2
```

**Delegating with `yield*`**

Use `yield*` to delegate part of a generator to another generator.

```js
function* letters() {
  yield 'A'
  yield 'B'
}

function* all() {
  yield 1
  yield* letters()
  yield 2
}

for (const val of all()) {
  console.log(val) // 1, A, B, 2
}
```

**Use Cases**

- Lazy data generation
- Iterating large or unknown-size datasets
- Asynchronous control flow (with `async generators`)
- Custom iterable objects

**Best Practices**

- Use when you need lazy evaluation or step-wise execution
- Avoid unnecessary complexity; prefer regular functions if you don’t need pause/resume
- Use `for...of` or destructuring to consume generators cleanly

### Async Generators (`async function*`)

**Async generators** combine the features of `async` functions and generator functions (`function*`) to support **asynchronous iteration** — one value at a time, with pauses between each step, awaiting asynchronous operations.

**Syntax**

Use `async function*` to define an asynchronous generator.

```js
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100)) // simulate delay
    yield i
  }
}
```

**Consuming with `for await...of`**

Use `for await...of` to iterate over async generator values.

```js
;(async () => {
  for await (const num of asyncRange(1, 3)) {
    console.log(num) // Logs 1, 2, 3 with delay
  }
})()
```

**Behavior**

- The generator returns an object conforming to the **async iterable protocol**
- Each call to `.next()` returns a **promise**
- Execution pauses on `await` and `yield`

**Practical Use Case: Streaming API Data**

```js
async function* fetchPages(urls) {
  for (const url of urls) {
    const res = await fetch(url)
    const data = await res.json()
    yield data
  }
}

const pages = ['api/page1', 'api/page2']

;(async () => {
  for await (const data of fetchPages(pages)) {
    console.log(data)
  }
})()
```

**Comparison: Sync vs Async Generator**

| Feature      | `function*`   | `async function*`        |
| ------------ | ------------- | ------------------------ |
| Yield values | Synchronously | Asynchronously           |
| Consume with | `for...of`    | `for await...of`         |
| Returns      | Iterator      | Async iterator (Promise) |

**Best Practices**

- Use async generators when you need to **pause and wait** between items (e.g., fetch per page, stream chunks)
- Handle errors with `try/catch` inside the generator or around `for await...of`
- Combine with `yield*` and `await` for fine-grained control of flow

### WeakMap and WeakSet

`WeakMap` and `WeakSet` are collections similar to `Map` and `Set`, but with one important difference: **they allow garbage collection of their keys if there are no other references to them**. This makes them useful for managing memory-sensitive associations.

**WeakMap**

A `WeakMap` is a collection of key/value pairs where:

- **Keys must be objects**
- Values can be any type
- Keys are held **weakly**, meaning they do not prevent garbage collection

```js
const wm = new WeakMap()
const obj = { id: 1 }

wm.set(obj, 'secret data')
console.log(wm.get(obj)) // "secret data"

wm.delete(obj)
```

Once `obj` is no longer referenced elsewhere, both the key and value are eligible for garbage collection.

**Use Cases**

- Private data storage associated with DOM elements or objects
- Avoiding memory leaks in frameworks and libraries

```js
const privateData = new WeakMap()

function User(name) {
  const data = { name }
  privateData.set(this, data)
}

User.prototype.getName = function () {
  return privateData.get(this).name
}
```

**WeakSet**

A `WeakSet` is a collection of **unique objects** — no primitives allowed.

```js
const ws = new WeakSet()
const obj1 = {}
const obj2 = {}

ws.add(obj1)
ws.has(obj1) // true
ws.delete(obj1)
```

**Use Cases**

- Track whether objects have been processed or marked
- Cache objects without preventing garbage collection

**Limitations (by design)**

- Not iterable (`forEach`, `for...of`, etc. are unavailable)
- No `.size` property
- Cannot list contents or loop over entries
- Designed for internal/private storage, not enumeration

**Comparison Table**

| Feature | WeakMap | WeakSet |
| -- | | - |
| Keys | Objects only | Objects only |
| Values | Any | Not applicable |
| Iterable? | No | No |
| Prevent GC? | No (weakly held) | No (weakly held) |
| Use Case | Private data store | Tagging/caching |

**Best Practices**

- Use `WeakMap` for storing metadata about DOM nodes or class instances
- Use `WeakSet` to mark or cache objects without memory leaks
- Avoid when you need iteration, size tracking, or persistent references

### Intl API (for formatting dates, currencies, etc.)

The `Intl` object is a built-in JavaScript API that provides **internationalization capabilities**, such as locale-aware formatting of **numbers**, **dates**, **currencies**, **units**, and more.

**1. `Intl.NumberFormat`**

Used to format numbers based on locale and options.

```js
const number = 1234567.89

const formatted = new Intl.NumberFormat('de-DE').format(number)
console.log(formatted) // "1.234.567,89" (German format)
```

**Currency Formatting:**

```js
const price = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(2500)

console.log(price) // "$2,500.00"
```

**2. `Intl.DateTimeFormat`**

Used to format dates and times based on locale.

```js
const date = new Date()

const formattedDate = new Intl.DateTimeFormat('en-GB').format(date)
console.log(formattedDate) // "08/05/2025" (DD/MM/YYYY)
```

**Custom Options:**

```js
const formatted = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  weekday: 'short'
}).format(date)

// "Thu, May 08, 2025"
```

**3. `Intl.RelativeTimeFormat`**

Formats relative time (e.g., "3 days ago").

```js
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

rtf.format(-1, 'day') // "yesterday"
rtf.format(3, 'month') // "in 3 months"
```

**4. `Intl.PluralRules`**

Selects the correct plural form for a number in a given locale.

```js
const plural = new Intl.PluralRules('en-US')

plural.select(1) // "one"
plural.select(2) // "other"
```

Used for localization libraries that handle pluralized strings.

**5. `Intl.ListFormat`**

Formats lists with locale-specific conjunctions or disjunctions.

```js
const list = ['Ana', 'João', 'Maria']
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

formatter.format(list) // "Ana, João, and Maria"
```

**6. `Intl.Collator`**

Used for locale-aware string comparison and sorting.

```js
const collator = new Intl.Collator('en')

;['z', 'ä', 'a'].sort(collator.compare) // ["a", "ä", "z"]
```

**Best Practices**

- Always specify a locale (`en-US`, `pt-BR`, etc.) for consistent results
- Use `Intl` for displaying content in user-specific formats
- Avoid manual string manipulation for dates, currencies, and numbers — prefer `Intl`
- Use `toLocaleString()` as a shortcut for numbers and dates if needed

```js
;(1234.56).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
```

### Proxy and Reflect

`Proxy` and `Reflect` are advanced features in JavaScript that allow for the creation of custom behavior when interacting with objects. Together, they enable **meta-programming** — programs that can observe or redefine how other programs operate.

**Proxy**

A `Proxy` wraps an object and intercepts operations like property access, assignment, enumeration, and function calls using **traps**.

**Basic Syntax:**

```js
const proxy = new Proxy(target, handler)
```

- `target`: the object to proxy
- `handler`: an object with trap functions

**Example: Intercepting get and set**

```js
const user = { name: 'Ana' }

const proxy = new Proxy(user, {
  get(target, key) {
    console.log(`Reading "${key}"`)
    return target[key]
  },
  set(target, key, value) {
    console.log(`Setting "${key}" to "${value}"`)
    target[key] = value
    return true
  }
})

proxy.name // Logs: Reading "name"
proxy.age = 30 // Logs: Setting "age" to "30"
```

**Common Proxy Traps**

| Trap             | Description                             |
| ---------------- | --------------------------------------- |
| `get`            | Property access (`obj.key`)             |
| `set`            | Property assignment (`obj.key = val`)   |
| `has`            | Property existence check (`key in obj`) |
| `deleteProperty` | Delete property (`delete obj.key`)      |
| `ownKeys`        | List of keys (`Object.keys(obj)`)       |
| `apply`          | Function call (`fn()`)                  |
| `construct`      | Object construction (`new Fn()`)        |

**Use Cases**

- Validation and type checking
- Logging and debugging
- Access control (e.g., private fields)
- Virtualized or reactive data structures (e.g., Vue, MobX)

**Reflect**

The `Reflect` object provides **default behavior** for object operations and mirrors the Proxy trap methods.

```js
Reflect.get(obj, key)
Reflect.set(obj, key, value)
Reflect.has(obj, key)
```

Used inside proxy traps to forward operations after custom logic.

**Example: Forwarding with Reflect**

```js
const proxy = new Proxy(user, {
  get(target, key) {
    console.log(`Access: ${key}`)
    return Reflect.get(target, key) // perform default get
  }
})
```

**Proxy + Reflect Example**

```js
const secure = new Proxy(user, {
  set(target, key, value) {
    if (key === 'password') {
      throw new Error('Cannot set password directly')
    }
    return Reflect.set(target, key, value)
  }
})
```

**Best Practices**

- Use `Proxy` for creating dynamic, reactive, or protected interfaces
- Use `Reflect` to preserve default behavior inside trap logic
- Avoid overusing Proxy where simpler patterns apply (e.g., getters/setters)
- Be cautious of performance overhead in large-scale applications

### `eval` and `with` (discouraged, but part of JS)

Both `eval` and `with` are part of the JavaScript language, but are generally **discouraged** due to their **security, performance, and maintainability issues**. They can dynamically manipulate code or scope, but break optimizations and introduce hard-to-debug behavior.

**eval**

`eval(code)` takes a string and executes it as JavaScript code in the current scope.

```js
const x = 10
eval('console.log(x + 5)') // 15
```

**Dangers of `eval`:**

- Executes arbitrary code — dangerous if used with user input
- Obscures scope and logic — makes code harder to analyze and optimize
- Slower execution — prevents engine optimizations

**Never do this:**

```js
const userInput = "alert('You have been hacked!')"
eval(userInput) // Security risk
```

**Safe Alternatives:**

- Use `JSON.parse` for parsing data
- Use functions or objects instead of dynamic evaluation

**with**

The `with` statement extends the scope chain with an object, making its properties accessible as if they were variables.

```js
const obj = { a: 1, b: 2 }

with (obj) {
  console.log(a + b) // 3
}
```

**Why `with` is discouraged:**

- Makes variable resolution ambiguous and unpredictable
- Breaks static analysis and optimizations
- Not allowed in strict mode

```js
'use strict'
with (obj) {
  console.log(a) // SyntaxError in strict mode
}
```

**Best Practices**

| Feature | Status     | Recommendation                            |
| ------- | ---------- | ----------------------------------------- |
| `eval`  | Supported  | Avoid completely; use safer alternatives  |
| `with`  | Deprecated | Avoid; use destructuring or direct access |

**Safer Alternatives**

- For `eval`: use `Function`, `JSON.parse`, or structured logic
- For `with`: use object destructuring

```js
const { a, b } = obj
console.log(a + b)
```

### Attribute vs Property (DOM distinction)

In the browser's DOM, **attributes** and **properties** are related but different concepts. Understanding the distinction is important when manipulating elements with JavaScript.

**Attributes**

- Defined in **HTML markup**
- Represent **initial values** set on DOM elements
- Accessible via `getAttribute()` and `setAttribute()`

```html
<input id="myInput" type="text" value="Hello" />
```

```js
const input = document.getElementById('myInput')

input.getAttribute('value') // "Hello"
input.setAttribute('value', 'Hi') // updates the attribute only
```

**Properties**

- Defined on the **DOM object** (JavaScript interface)
- Represent the **current state** of the element
- Accessed directly via dot notation (`.`)

```js
input.value // "Hello" — current value of input
input.value = 'Changed' // updates the visible value
```

**Key Differences**

| Feature          | Attribute                      | Property                  |
| ---------------- | ------------------------------ | ------------------------- |
| Source           | HTML                           | JavaScript DOM object     |
| Lifetime         | Initial / static               | Dynamic / runtime         |
| Accessed via     | `getAttribute`, `setAttribute` | Dot notation (`el.value`) |
| Reflect changes? | Only if explicitly synced      | Reflects live UI state    |

**Example**

```html
<input id="example" value="initial" />
```

```js
const el = document.getElementById('example')

el.getAttribute('value') // "initial"
el.value = 'updated'

el.getAttribute('value') // still "initial"
el.value // "updated"
```

To update both the DOM property and the HTML attribute:

```js
el.setAttribute('value', 'new')
el.value = 'new'
```

**When to Use Each**

- Use **attributes** when reading or writing to the original HTML declaration (e.g., for templating or initialization)
- Use **properties** to manipulate or read the **live state** (e.g., user input, toggle states)

**Best Practices**

- Use properties (`element.value`, `element.checked`, etc.) for interactive behavior
- Use attributes (`element.setAttribute(...)`) for static content or serialization
- Know that they can diverge — syncing them requires manual updates

## References

- [MDN Web Docs: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
  Comprehensive and official documentation on all JavaScript concepts.

- [ECMAScript Language Specification (ECMA-262)](https://tc39.es/ecma262/)
  The formal specification that defines JavaScript.

- [MDN Web Docs: JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
  Detailed API reference including objects, functions, statements, and more.

- [JavaScript.info](https://javascript.info/)
  A well-structured learning resource covering fundamentals to advanced JavaScript topics.

- [2ality Blog by Axel Rauschmayer](https://2ality.com/)
  Deep dives into ES features and JavaScript internals.

- [MDN Web Docs: Asynchronous programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
  Covers callbacks, promises, async/await, and the event loop.

- [Node.js Event Loop Guide](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
  Helpful when comparing browser and Node.js execution models.

- [MDN Web Docs: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
  Explains garbage collection and memory handling.

- [MDN Web Docs: Proxy and Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  Guide to intercepting and customizing object behavior.

- [Exploring ES6 by Dr. Axel Rauschmayer](https://exploringjs.com/es6/)
  In-depth look at ES6 features like generators, classes, modules, etc.
