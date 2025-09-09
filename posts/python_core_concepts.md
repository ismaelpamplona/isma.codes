---
title: 'Modern Python: From Fundamentals to Advanced Concepts'
date: '2025-09-09'
description: >-
  This article walks through the most important parts of **Python**—from how variables work to how async code runs—covering what you actually need to remember when coding or preparing for an interview.
categories:
  - python
  - interview
  - development
  - web-development
show: true
---

## Contents

## Introduction

Python has become a primary language for building backend systems and APIs. Its popularity comes from three main factors:

1. **Ecosystem**: frameworks like FastAPI, Django, and Flask make it easy to design and scale services.
2. **Productivity**: clear syntax and strong typing support (via `typing` and `pydantic`) allow faster development without losing reliability.
3. **Integration**: Python connects well with cloud platforms, CI/CD pipelines, and modern observability stacks.

For backend/API architecture, Python is used not just to write endpoints, but to design **contract-first APIs**, enforce **security controls**, and ensure **scalability in containerized environments**.

In an interview setting, focus on:

- Explaining how you would structure an API project.
- Showing how you’d enforce consistency (schemas, validations, quality gates).
- Demonstrating you understand deployment, monitoring, and security, not just coding.

This article is built for **interview preparation**. It covers the Python language in depth, with a focus on backend architecture and API platforms. Each section explains concepts you should know, shows examples, and links them to practical scenarios you may face in a technical interview.

## Language Fundamentals

### Variables and Scope

In Python, variables are just names that point to objects in memory.
Assignment does **not** copy values; it binds a name to an object.

```py
x = 10
y = x
x = 20
print(y)  # 10
```

Here, `y` still points to the original object `10`. Rebinding `x` to `20` doesn’t affect `y`.

**Global vs Local Scope**

Python follows the **LEGB rule** when resolving variable names:

- **L**ocal: names defined inside the current function.
- **E**nclosing: names in any enclosing function scopes.
- **G**lobal: names defined at the top level of a module.
- **B**uilt-in: names provided by Python itself (e.g., `len`, `print`).

```py
x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)
    inner()

outer()  # prints "local"
```

**The `global` Keyword**

If you want to assign to a global variable inside a function, you must declare it as `global`:

```py
count = 0

def increment():
    global count
    count += 1

increment()
print(count)  # 1
```

**The `nonlocal` Keyword**

When working with nested functions, `nonlocal` allows modifying variables from the enclosing (non-global) scope.

```py
def outer():
    x = "enclosing"
    def inner():
        nonlocal x
        x = "changed"
    inner()
    print(x)

outer()  # prints "changed"
```

Without `nonlocal`, the assignment in `inner` would create a new local variable `x`, leaving the outer one untouched.

> - Assignment binds names to objects; it doesn’t copy.
> - Use **LEGB** to understand variable resolution.
> - Use `global` for modifying global state.
> - Use `nonlocal` to modify variables in an enclosing scope.

### Global vs Local Scope

Python resolves variable names using the **LEGB rule**:

- **L**ocal: inside the current function
- **E**nclosing: in outer functions
- **G**lobal: at the module level
- **B**uilt-in: provided by Python itself (e.g., `len`, `print`)

```py
x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)
    inner()

outer()  # prints "local"
```

### The `global` Keyword

Use `global` when you want to modify a variable defined at the module level:

```py
count = 0

def increment():
    global count
    count += 1

increment()
print(count)  # 1
```

### The `nonlocal` Keyword

Use `nonlocal` to modify a variable from an enclosing function’s scope:

```py
def outer():
    x = "enclosing"
    def inner():
        nonlocal x
        x = "changed"
    inner()
    print(x)

outer()  # prints "changed"
```

> - Assignment binds names to objects.
> - Python searches variables using **LEGB**.
> - `global` allows modification of module-level variables.
> - `nonlocal` allows modification of enclosing scope variables.

Python is dynamically typed, but since version 3.5 it supports **type hints**. They don’t affect runtime behavior, but help tools like linters, IDEs, and `mypy` catch errors earlier.

**Function Annotations**

You can annotate parameters and return values:

```py
def add(a: int, b: int) -> int:
    return a + b

print(add(2, 3))  # valid
print(add("2", "3"))  # runs, but type checker warns
```

Type hints improve readability and make contracts explicit.

**`typing` Module Basics**

The `typing` module provides generic types for collections and complex structures.

```py
from typing import List, Dict, Union, Optional

# List of integers
numbers: List[int] = [1, 2, 3]

# Dict with string keys and int values
ages: Dict[str, int] = {"Alice": 30, "Bob": 25}

# Union means "either type"
def parse_id(id_value: Union[int, str]) -> str:
    return str(id_value)

# Optional means "value can be type or None"
def find_user(id: int) -> Optional[str]:
    if id == 1:
        return "Alice"
    return None
```

**Key Takeaways**

- Type hints make your code self-documenting.
- Tools like `mypy` can enforce contracts before runtime.
- Use `List`, `Dict`, `Union`, `Optional` for clarity in data structures and function signatures.

## Control Flow and Data Structures

### Control Structures

Control structures let you decide which code runs depending on conditions.

**if / elif / else**

```py
age = 20

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
else:
    print("Adult")
```

Python checks conditions top to bottom. The first `True` branch runs, and the rest are skipped.

**match (Python 3.10+)**

The `match` statement is Python’s version of pattern matching.
It’s more powerful than a chain of `if/elif`.

```py
def http_status(code: int) -> str:
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500 | 501 | 502:
            return "Server Error"
        case _:
            return "Unknown"

print(http_status(404))  # Not Found
```

`case _` works as a default branch.

**Ternary Expression**

Use a one-line conditional for simple assignments:

status = "adult" if age >= 18 else "minor"
print(status) # adult

This is equivalent to an `if/else`, but compact.

**Key Takeaways**

- Use `if/elif/else` for standard branching.
- Use `match` when you have many cases or need pattern matching.
- Ternary expressions make simple decisions concise.

### Loops

Loops let you repeat code until a condition is met or items are exhausted.

**for Loop**

A `for` loop iterates over any **iterable** (list, string, dict, etc.).

```py
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

You can also loop over dictionary keys and values:

```py
ages = {"Alice": 30, "Bob": 25}

for name, age in ages.items():
    print(name, age)
```

**while Loop**

A `while` loop repeats as long as the condition is `True`.

```py
count = 0
while count < 3:
    print(count)
    count += 1
```

**break and continue**

- `break` stops the loop entirely.
- `continue` skips to the next iteration.

```py
for i in range(5):
    if i == 3:
        break
    if i % 2 == 0:
        continue
    print(i)  # prints 1
```

**Iterables and Iterators**

- **Iterable**: an object you can loop over (e.g., list, string, dict).
- **Iterator**: an object with `__next__()` that produces items one at a time.

```py
numbers = [1, 2, 3]
it = iter(numbers)

print(next(it))  # 1
print(next(it))  # 2
```

Behind the scenes, `for` uses `iter()` and `next()`.

> - Use `for` for collections and sequences.
> - Use `while` for condition-based repetition.
> - `break` exits, `continue` skips.
> - Every `for` loop is powered by the iterator protocol.

### Collections and Methods

Python provides concise ways to create and transform collections.

**List Comprehensions**

A list comprehension is a compact way to build lists.

```py
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
```

You can also add conditions:

```py
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]
```

**Dict Comprehensions**

Use a similar syntax to build dictionaries.

```py
names = ["Alice", "Bob", "Charlie"]
lengths = {name: len(name) for name in names}
print(lengths)  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

**Set Comprehensions**

Build sets with unique elements.

```py
unique_lengths = {len(name) for name in names}
print(unique_lengths)  # {3, 5, 7}
```

**Built-in Methods**

Python includes higher-order functions for working with collections.

```py
from functools import reduce

# map: transform each item
nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)  # [2, 4, 6, 8]

# filter: keep items that match condition
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4]

# reduce: combine into a single value
total = reduce(lambda acc, x: acc + x, nums, 0)
print(total)  # 10

# any: at least one item is True
print(any(x > 3 for x in nums))  # True

# all: all items are True
print(all(x > 0 for x in nums))  # True
```

> - Comprehensions make code concise and readable.
> - Dict and set comprehensions extend the same idea beyond lists.
> - `map`, `filter`, and `reduce` apply transformations and aggregations.
> - `any` and `all` help with quick logical checks.

### Unpacking and Destructuring

Unpacking lets you assign elements of a sequence or mapping to variables directly.

**Tuple Unpacking**

```py
coords = (10, 20)
x, y = coords
print(x, y)  # 10 20
```

This works with lists, tuples, and even strings.

```py
a, b, c = "XYZ"
print(a, b, c)  # X Y Z
```

You can ignore values using `_`.

```py
first, _, third = [1, 2, 3]
print(first, third)  # 1 3
```

**Extended Unpacking**

Use `*` to gather multiple elements.

```py
numbers = [1, 2, 3, 4, 5]

first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5
```

`*` can also be used when calling functions:

```py
def add(a, b, c):
    return a + b + c

values = [1, 2, 3]
print(add(*values))  # 6
```

**`*args` and `**kwargs`\*\*

Functions can accept variable numbers of arguments.

```py
def greet(*names, **info):
    for name in names:
        print("Hello", name)
    for key, value in info.items():
        print(key, value)

greet("Alice", "Bob", age=30, country="Brazil")
```

Output:

```
Hello Alice
Hello Bob
age 30
country Brazil
```

- `*args` collects extra positional arguments as a tuple.
- `**kwargs` collects extra keyword arguments as a dictionary.

**Key Takeaways**

- Unpacking works with any iterable.
- `*` gathers multiple items, useful in assignments and calls.
- `*args` and `**kwargs` make functions flexible.

### Dictionaries and Sets

**Dictionaries**

A dictionary stores key-value pairs. Keys must be hashable (immutable).

```py
person = {"name": "Alice", "age": 30}

# Access values
print(person["name"])     # Alice
print(person.get("age"))  # 30
print(person.get("city", "Unknown"))  # fallback value

# Add or update
person["city"] = "São Paulo"

# Iterate
for key, value in person.items():
    print(key, value)
```

**Membership Tests**

- For dictionaries, `in` checks if a key exists.
- For sets, `in` checks if an element is present.

```py
print("name" in person)  # True
print("Alice" in person) # False (checks only keys)
```

**Sets**

A set is an unordered collection of unique elements.

```py
nums = {1, 2, 3, 3}
print(nums)  # {1, 2, 3}

# Add and remove
nums.add(4)
nums.discard(2)
```

**Set Operations**

Python supports mathematical set operations.

```py
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # Union: {1, 2, 3, 4, 5}
print(a & b)  # Intersection: {3}
print(a - b)  # Difference: {1, 2}
print(a ^ b)  # Symmetric difference: {1, 2, 4, 5}
```

> - Dictionaries map keys to values, with O(1) average lookup.
> - Membership in dicts checks keys, not values.
> - Sets store unique values and support fast membership tests.
> - Use set operations for clean and efficient comparisons.

## Functions and Scope

Functions group reusable logic and can accept flexible arguments.

**Definitions and Default Arguments**

```py
def greet(name="Guest"):
    print(f"Hello, {name}")

greet("Alice")  # Hello, Alice
greet()         # Hello, Guest
```

- Default values are evaluated **once**, at definition time.
- Be careful with mutable defaults:

```py
def append_item(item, collection=[]):
    collection.append(item)
    return collection

print(append_item(1))  # [1]
print(append_item(2))  # [1, 2]  <-- same list reused!
```

Fix by using `None` as the default:

```py
def append_item(item, collection=None):
    if collection is None:
        collection = []
    collection.append(item)
    return collection
```

**\*args and \*\*kwargs**

Use these to handle variable numbers of arguments.

```py
def demo(a, *args, **kwargs):
    print("a =", a)
    print("args =", args)
    print("kwargs =", kwargs)

demo(1, 2, 3, x=10, y=20)
```

Output:

```
a = 1
args = (2, 3)
kwargs = {'x': 10, 'y': 20}
```

- `*args`: extra positional arguments (tuple).
- `**kwargs`: extra keyword arguments (dict).

**Lambdas**

Lambdas are anonymous one-line functions.

```py
add = lambda x, y: x + y
print(add(2, 3))  # 5
```

They are useful for short, throwaway functions, especially with `map`, `filter`, or sorting:

```py
nums = [3, 1, 4, 2]
print(sorted(nums, key=lambda x: -x))  # [4, 3, 2, 1]
```

> - Functions can have defaults, but avoid mutable defaults.
> - Use `*args` and `**kwargs` for flexibility.
> - Lambdas are lightweight, best for inline transformations.

### Closures

A **closure** is a function that remembers variables from the scope in which it was created, even if that scope has finished executing.

**Lexical Scoping**

Python uses **lexical scoping** (also called static scoping).
This means a function looks for variables in the scope where it was **defined**, not where it is **called**.

```py
def outer():
    msg = "Hello"
    def inner():
        print(msg)  # uses variable from outer
    return inner

fn = outer()
fn()  # Hello
```

Here, `inner` still has access to `msg` even after `outer` has finished.

**Capturing Variables**

Closures capture references to variables, not copies of their values. This can lead to surprising behavior in loops.

```py
funcs = []
for i in range(3):
    def f():
        print(i)
    funcs.append(f)

for f in funcs:
    f()
```

Output:

```
2
2
2
```

All functions print `2` because they reference the same `i` (which ended as `2`). To capture the current value, bind it as a default argument:

```py
funcs = []
for i in range(3):
    def f(val=i):
        print(val)
    funcs.append(f)

for f in funcs:
    f()
```

Output:

```
0
1
2
```

> - Closures allow inner functions to use variables from outer scopes.
> - Variables are captured by reference, not by value.
> - Use default arguments or `functools.partial` to capture current values safely.

### Decorators

A **decorator** is a function that takes another function and returns a new function with added behavior.
They are built using **closures**.

**Function Wrappers**

```py
def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@decorator
def say_hello(name):
    print(f"Hello, {name}")

say_hello("Alice")
```

Output:

```
Before function call
Hello, Alice
After function call
```

Here, `@decorator` is syntactic sugar for `say_hello = decorator(say_hello)`.

**Practical Use Cases**

**Logging**

```py
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def add(a, b):
    return a + b

print(add(2, 3))
```

**Caching**

```py
from functools import lru_cache

@lru_cache(maxsize=100)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(30))  # much faster with caching
```

**Authorization**

```py
def require_admin(func):
    def wrapper(user, *args, **kwargs):
        if not user.get("is_admin"):
            raise PermissionError("Admin only")
        return func(user, *args, **kwargs)
    return wrapper

@require_admin
def delete_user(user, user_id):
    print(f"User {user_id} deleted")

delete_user({"is_admin": True}, 42)  # works
# delete_user({"is_admin": False}, 42) -> raises error
```

> - Decorators wrap functions to add behavior without modifying them.
> - Common use cases: logging, caching, access control.
> - `functools` provides ready-made decorators like `@lru_cache` and `@wraps`.

### Generators

Generators are a way to produce values **lazily** — one at a time, instead of building a full collection in memory.

**yield**

A function that uses `yield` becomes a generator function.
Each call to `yield` produces a value and pauses the function’s state.

```py
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_up_to(3):
    print(num)
```

Output:

```
1
2
3
```

The function resumes where it left off after each `yield`.

**Generator Expressions**

Generators can be written inline, similar to list comprehensions, but they don’t build a full list.

```py
squares = (x**2 for x in range(5))
print(next(squares))  # 0
print(next(squares))  # 1
```

They save memory because values are produced on demand.

**itertools**

The `itertools` module provides tools for working with iterators efficiently.

```py
from itertools import count, cycle, islice

# Infinite counter
for n in islice(count(10), 5):
    print(n)  # 10, 11, 12, 13, 14

# Cycle repeats a sequence
for n in islice(cycle([1, 2, 3]), 7):
    print(n)  # 1,2,3,1,2,3,1
```

Other useful functions:

- `chain`: combine iterables
- `combinations`, `permutations`
- `groupby`

**Key Takeaways**

- `yield` lets a function return values lazily, preserving state.
- Generator expressions are memory-efficient alternatives to list comprehensions.
- `itertools` extends generators with powerful iteration patterns.

### Context Managers

A **context manager** handles setup and cleanup automatically.
They are most often used with the `with` statement.

**with Statement**

The `with` statement ensures resources are released properly.

```py
with open("data.txt", "w") as f:
    f.write("Hello")
```

- The file is automatically closed, even if an error occurs.
- This avoids the need to call `f.close()` manually.

**Creating Custom Context Managers**

You can create a context manager with a class that implements `__enter__` and `__exit__`.

```py
class ManagedResource:
    def __enter__(self):
        print("Resource acquired")
        return self
    def __exit__(self, exc_type, exc_value, traceback):
        print("Resource released")

with ManagedResource() as r:
    print("Using resource")
```

Output:

```
Resource acquired
Using resource
Resource released
```

Another way is with the `contextlib` module:

```py
from contextlib import contextmanager

@contextmanager
def managed_resource():
    print("Resource acquired")
    try:
        yield
    finally:
        print("Resource released")

with managed_resource():
    print("Inside block")
```

Output:

```
Resource acquired
Inside block
Resource released
```

> - Context managers guarantee cleanup (files, locks, connections).
> - Use `with` for safe resource handling.
> - Define them with `__enter__` / `__exit__` or `contextlib.contextmanager`.

## Object-Oriented Programming

### Classes and Objects

This section adapts the spirit of your **OOP Design** article from isma.codes—focused on principles and clarity—into a concise, interview-ready guide tailored to Python.

**Defining Classes**

In Python, classes describe blueprints for creating objects. Fields become attributes, methods define behavior.

```py
class User:
    default_role = "guest"  # class variable

    def __init__(self, name, role=None):
        self.name = name      # instance variable
        self.role = role or User.default_role
```

Here, `User` has:

- A **class variable** `default_role` shared across instances.
- An **initializer** `__init__`, which sets up **instance variables** (`name`, `role`).

**Instance vs Class Variables**

- **Class variables** belong to the class—shared across all instances.
- **Instance variables** are unique to each object.

```py
User.default_role = "member"
a = User("Alice")
b = User("Bob", role="admin")

print(a.role)  # member
print(b.role)  # admin
```

- `a.role` stays default (“member”) unless explicitly overridden.

**`__init__` and Constructors**

`__init__` is Python's constructor:

- It's called after an object is created.
- Sets up and validates the object's initial state.
- Avoid doing heavy I/O or logic here—keep it simple.

```py
class Connection:
    def __init__(self, url):
        self.url = url
        self.connected = False

    def connect(self):
        self.connected = True
```

### Classes and Objects

This section builds on the same principles you discussed in your [OOP Design article](https://isma.codes/blog/oop_design), but now applied directly to Python.
Instead of generic design concepts, here we show how Python implements those ideas in practice.

**Defining Classes**

In Python, a class defines a blueprint for creating objects.
Attributes hold state, and methods define behavior.

```py
class User:
    default_role = "guest"  # class variable

    def __init__(self, name, role=None):
        self.name = name      # instance variable
        self.role = role or User.default_role
```

**Instance vs Class Variables**

- **Class variables**: shared across all instances.
- **Instance variables**: unique per object.

```py
User.default_role = "member"
a = User("Alice")
b = User("Bob", role="admin")

print(a.role)  # member
print(b.role)  # admin
```

Here, `a.role` is taken from the class default, while `b.role` is customized.

**`__init__` and Constructors**

`__init__` is Python’s constructor. It sets up the initial state of the object:

```py
class Connection:
    def __init__(self, url):
        self.url = url
        self.connected = False

    def connect(self):
        self.connected = True
```

Keep constructors simple: initialize attributes and prepare the object for use. Avoid doing heavy work like opening network connections inside `__init__`.

**Reference to Your OOP Design Article**

In your [OOP Design article](https://isma.codes/blog/oop_design), you focus on principles like clarity, separation of concerns, and good design practices.
This section shows how those same principles appear concretely in Python:

- Use class vs instance variables intentionally.
- Encapsulate behavior (`connect`) inside the class that owns the data (`Connection`).
- Keep constructors (`__init__`) focused on initialization, not business logic.

> - Classes group state (variables) and behavior (methods).
> - Distinguish clearly between class and instance variables.
> - Use `__init__` to set up an object’s initial state.
> - Apply the same design principles you described in your OOP Design article, now in Python.

### Inheritance

Inheritance lets one class reuse and extend another class’s behavior.
It’s a core OOP concept that helps avoid code duplication.

**Single Inheritance**

A child class inherits from a single parent.

```py
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Bark")

d = Dog()
d.speak()  # Bark
```

The child (`Dog`) overrides the parent’s method.

**Multiple Inheritance**

A class can inherit from more than one parent.
Python uses **Method Resolution Order (MRO)** to decide which method to call.

```py
class Flyer:
    def action(self):
        print("Flying")

class Swimmer:
    def action(self):
        print("Swimming")

class Duck(Flyer, Swimmer):
    pass

d = Duck()
d.action()  # Flying (Flyer is first in MRO)
```

Check the MRO with:

```py
print(Duck.mro())
```

This shows the order Python follows to resolve attributes.

**Using super()**

`super()` gives access to methods from a parent class, respecting MRO.
It’s safer than calling the parent class directly.

```py
class Vehicle:
    def __init__(self, wheels):
        self.wheels = wheels

class Car(Vehicle):
    def __init__(self, wheels, brand):
        super().__init__(wheels)  # calls Vehicle.__init__
        self.brand = brand

c = Car(4, "Toyota")
print(c.wheels, c.brand)  # 4 Toyota
```

`super()` is especially important in multiple inheritance, since it ensures every parent in the MRO is initialized correctly.

> - Single inheritance: one parent, one child.
> - Multiple inheritance: Python resolves conflicts using MRO.
> - Use `super()` instead of directly naming parent classes—it makes the code more maintainable and works with multiple inheritance.

### Dunder Methods

**Dunder methods** (double underscore methods) are special hooks that let objects interact with Python’s built-in functions and operators. They define how objects behave in different contexts.

**`__str__` and `__repr__`**

- `__str__`: user-friendly string, shown by `print()`.
- `__repr__`: developer-friendly string, used in the REPL.

```py
class User:
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return f"User: {self.name}"
    def __repr__(self):
        return f"User(name={self.name!r})"

u = User("Alice")
print(str(u))   # User: Alice
print(repr(u))  # User(name='Alice')
```

**`__eq__`**

Defines equality behavior (`==`).

```py
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

print(Point(1, 2) == Point(1, 2))  # True
```

**`__len__`**

Defines behavior for `len(obj)`.

```py
class Basket:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

print(len(Basket([1, 2, 3])))  # 3
```

**`__iter__`**

Defines iteration behavior.

```py
class Counter:
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return iter(range(self.n))

for i in Counter(3):
    print(i)  # 0, 1, 2
```

**Operator Overloading**

Dunder methods let you override operators like `+`, `-`, `*`.

```py
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
```

> - Dunder methods let custom objects behave like built-ins.
> - Use `__str__` for human-readable, `__repr__` for debugging.
> - Override equality, length, and iteration to integrate with Python syntax.
> - Operator overloading (`__add__`, `__sub__`, etc.) makes classes more expressive.

### Data Classes

Data classes are a feature (Python 3.7+) that reduce boilerplate when writing classes mainly used to store data.

**`@dataclass` Usage**

```py
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int

u = User("Alice", 30)
print(u)  # User(name='Alice', age=30)
```

Without `@dataclass`, you would need to implement `__init__`, `__repr__`, and `__eq__` manually.

**Comparison**

Data classes automatically generate `__eq__` and `__repr__` for you.

```py
u1 = User("Alice", 30)
u2 = User("Alice", 30)

print(u1 == u2)  # True
```

They compare by value, not by identity.

**Immutability**

You can make a data class immutable with `frozen=True`.

```py
@dataclass(frozen=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
# p.x = 10  # raises FrozenInstanceError
```

**Extra Options**

- `order=True`: generate comparison methods (`<`, `<=`, etc.).
- `default` and `default_factory`: set default values.

```py
from dataclasses import field

@dataclass
class Basket:
    items: list = field(default_factory=list)

b = Basket()
b.items.append("apple")
print(b.items)  # ['apple']
```

> - `@dataclass` eliminates repetitive code (`__init__`, `__repr__`, `__eq__`).
> - Use `frozen=True` for immutability.
> - Use `field(default_factory=...)` for safe mutable defaults.
> - Great for DTOs, configs, and simple models.

## Execution Model

### Imports and Modules

Python organizes code into **modules** (files) and **packages** (directories).
Imports let you reuse code across files.

**`import` vs `from ... import`**

- `import` loads the module and requires prefixing.
- `from ... import` brings names directly.

```py
import math
print(math.sqrt(9))  # 3.0

from math import sqrt
print(sqrt(9))  # 3.0
```

- `import` is safer (avoids name conflicts).
- `from ... import` is more concise, but can shadow names.

**Module Search Path**

When you `import module`, Python searches for it in order:

1. Current directory
2. `PYTHONPATH` environment variable
3. Standard library
4. Site-packages (installed packages)

Check the search path:

```py
import sys
print(sys.path)
```

This explains why sometimes Python “can’t find” a module.

**Packages and `__init__.py`**

A **package** is a directory with an `__init__.py` file.
This file marks the directory as a package and can run initialization code.

```
project/
│── app/
│   │── __init__.py
│   │── models.py
│   │── views.py
│── main.py
```

With this structure:

```py
from app import models
```

The `__init__.py` can be empty or expose selected symbols:

```py
# app/__init__.py
from .models import User
```

Now you can do:

```py
from app import User
```

> - Use `import` vs `from ... import` depending on clarity vs conciseness.
> - Python searches imports using `sys.path`.
> - `__init__.py` makes a directory a package and controls what’s exposed.

### Namespaces and Scope

A **namespace** is a mapping between names and objects.
Scope defines which namespace is active when Python looks up a variable.

**LEGB Rule**

Python resolves variables following the **LEGB** order:

1. **Local** – inside the current function
2. **Enclosing** – in outer functions (if nested)
3. **Global** – at the module level
4. **Built-in** – provided by Python itself (`len`, `print`, etc.)

```py
x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)
    inner()

outer()  # prints "local"
```

**Shadowing**

Shadowing happens when a local variable uses the same name as one in an outer scope.

```py
len = 10
print(len)        # 10
# print(len("hi"))  # TypeError: 'int' object is not callable
```

Here, the local variable `len` shadows the built-in `len()` function.

**Best Practices**

- Avoid reusing names of built-in functions (`list`, `str`, `len`, etc.).
- Use descriptive names to reduce collisions (`count_users` instead of `count`).
- Minimize reliance on `global` variables.
- Prefer returning values from functions rather than mutating globals.

> - Python follows **LEGB** for name resolution.
> - Shadowing can lead to bugs, especially with built-ins.
> - Stick to descriptive, non-conflicting names for clarity and safety.

### Memory Management

Python manages memory automatically, but it helps to understand how it works.

**Reference Counting**

Every object keeps track of how many references point to it.
When the count reaches zero, the memory is freed immediately.

```py
import sys

a = [1, 2, 3]
b = a
print(sys.getrefcount(a))  # number of references (may be >2 due to internals)
```

If `b` and `a` both go out of scope, the list can be destroyed.

**Garbage Collection**

Reference counting alone fails with **circular references**:

```py
a = {}
b = {}
a["b"] = b
b["a"] = a
```

Here, `a` and `b` reference each other, so their count never drops to zero. Python’s **garbage collector** (GC) periodically finds these cycles and cleans them up.

You can interact with it:

```py
import gc
gc.collect()  # force garbage collection
```

**Weak References**

Sometimes you want to reference an object without increasing its reference count.
This is useful for caches or observer patterns.

```py
import weakref

class Person:
    pass

p = Person()
r = weakref.ref(p)

print(r())   # Person object
del p
print(r())   # None (object was freed)
```

With a **weak reference**, the object can still be collected when no strong references remain.

> - Python primarily uses **reference counting** for memory management.
> - A **garbage collector** handles cycles.
> - **Weak references** let you reference objects without preventing collection.

## Asynchronous Python

### Asyncio

`asyncio` enables **concurrent I/O operations** without threads.
It is ideal for APIs, networking, and anything that waits on external resources.

**`async` and `await`**

- Define an asynchronous function with `async def`.
- Use `await` to pause until another async function completes.

```py
import asyncio

async def fetch_data():
    print("Start fetching")
    await asyncio.sleep(1)  # simulate I/O
    print("Done fetching")
    return {"data": 123}

async def main():
    result = await fetch_data()
    print(result)

asyncio.run(main())
```

Output:

```
Start fetching
Done fetching
{'data': 123}
```

Here, `await` yields control back to the event loop instead of blocking.

**Event Loop Basics**

The **event loop** runs async tasks.
It schedules coroutines, resumes them when ready, and manages I/O.

High level usage:

```py
asyncio.run(main())  # starts and closes event loop
```

Inside the loop, multiple coroutines can run “concurrently” by yielding with `await`.

**Tasks and Coroutines**

- A **coroutine** is the result of calling an async function (not executed yet).
- A **task** wraps a coroutine and runs it on the event loop.

```py
async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"Task {name} finished")

async def main():
    t1 = asyncio.create_task(task("A", 2))
    t2 = asyncio.create_task(task("B", 1))
    await t1
    await t2

asyncio.run(main())
```

Output (order depends on timing):

```
Task B finished
Task A finished
```

This shows concurrency: while Task A is sleeping, Task B can run.

> - Use `async`/`await` for non-blocking I/O.
> - The event loop schedules and resumes coroutines.
> - Wrap coroutines in `asyncio.create_task` for true concurrency.

### Concurrency Models

Python supports three main concurrency models: **threads**, **processes**, and **asyncio**.
Each has different trade-offs depending on whether the workload is **CPU-bound** or **I/O-bound**.

**Threads**

- Multiple threads run in the same process.
- Good for I/O-bound tasks (waiting on network, file, DB).
- Limited by the **Global Interpreter Lock (GIL)** — only one thread executes Python bytecode at a time.

```py
import threading

def worker(n):
    print(f"Thread {n} working")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(3)]
for t in threads: t.start()
```

**Processes**

- Each process has its own Python interpreter and memory space.
- True parallelism (not limited by GIL).
- Best for **CPU-bound** tasks (heavy computation).
- More overhead than threads (separate memory).

```py
from multiprocessing import Process

def worker(n):
    print(f"Process {n} working")

procs = [Process(target=worker, args=(i,)) for i in range(3)]
for p in procs: p.start()
```

**Asyncio**

- Single-threaded, single-process.
- Cooperative multitasking: tasks voluntarily yield with `await`.
- Excellent for **high-concurrency I/O** (APIs, sockets, web scraping).
- Not good for CPU-heavy work (blocks event loop).

**When to Use Each**

- **Threads** → Many I/O operations in parallel, moderate complexity.
- **Processes** → Heavy CPU work (ML, data crunching).
- **Asyncio** → Thousands of concurrent I/O tasks with low overhead.

A common hybrid: use **asyncio** for I/O + **process pool** for CPU-heavy tasks.

> - Threads share memory but are limited by GIL.
> - Processes achieve parallelism but use more resources.
> - Asyncio is best for scalable, concurrent I/O.
> - Choose based on whether your workload is CPU-bound or I/O-bound.

### Common Pitfalls

When working with `asyncio`, there are a few traps that often break concurrency.

**Blocking Calls in Async Code**

If you use a **blocking call** (like `time.sleep`) inside an async function, it freezes the event loop.

```py
import asyncio, time

async def bad():
    print("Start")
    time.sleep(2)  # blocks event loop
    print("End")

asyncio.run(bad())  # takes 2s, nothing else can run
```

Correct approach: use non-blocking alternatives (`await asyncio.sleep`).

```py
async def good():
    print("Start")
    await asyncio.sleep(2)  # yields to event loop
    print("End")

asyncio.run(good())
```

**Mixing Sync and Async Functions**

Calling an async function without `await` gives a coroutine object, not a result.

```py
async def fetch():
    return 42

result = fetch()
print(result)  # <coroutine object ...>
```

You must `await` it:

```py
result = await fetch()  # inside an async function
```

Or wrap it in `asyncio.run` at the top level.

> - Avoid blocking calls (`time.sleep`, I/O libs that aren’t async) inside async code.
> - Always `await` async functions, or wrap with `asyncio.run`.
> - Mixing sync and async without care leads to silent bugs and poor performance.

## Error Handling and Defensive Coding

### Exceptions

Exceptions signal errors or unusual conditions in Python.
They let you separate error handling from normal code.

**try / except / else / finally**

```py
try:
    x = int("42")
    y = int("not a number")
except ValueError as e:
    print("Conversion failed:", e)
else:
    print("Both conversions succeeded")
finally:
    print("This always runs")
```

- `try`: block of code that might fail.
- `except`: handles specific exceptions.
- `else`: runs if no exception occurred.
- `finally`: always runs (cleanup, closing files, etc.).

**Raising Custom Exceptions**

Use `raise` to trigger exceptions.

```py
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

print(divide(10, 2))
# print(divide(10, 0))  # raises ZeroDivisionError
```

You can also define your own exception classes:

```py
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Age cannot be negative")
    print("Age set to", age)

set_age(20)
# set_age(-5)  # raises InvalidAgeError
```

**Exception Hierarchy**

All built-in exceptions inherit from `BaseException`.
Common ones come from `Exception`.

- `BaseException`
  - `Exception`
    - `ArithmeticError` → `ZeroDivisionError`, `OverflowError`
    - `ValueError`, `TypeError`, `KeyError`, `IndexError`
  - `SystemExit`, `KeyboardInterrupt` (not usually caught)

Check with `isinstance(e, Exception)`.

> - Use `try/except/else/finally` to handle different cases cleanly.
> - Raise built-in or custom exceptions for clarity.
> - Understand the exception hierarchy to catch the right errors.

### Defensive Practices

Defensive coding reduces bugs and makes programs resilient to failures.

**Using `with` for Resources**

Resources like files, sockets, or database connections must be released properly.
Use `with` statements to guarantee cleanup.

```py
with open("data.txt", "w") as f:
    f.write("Hello")
```

Even if an exception occurs, the file is closed automatically.
This avoids resource leaks.

**Assertions vs Exceptions**

- **Assertions** are for internal checks during development.
- **Exceptions** handle expected runtime errors.

```py
x = -1
assert x >= 0, "x must be non-negative"  # for debugging

def get_user(users, user_id):
    if user_id not in users:
        raise KeyError("User not found")  # runtime error handling
    return users[user_id]
```

Assertions can be disabled with `python -O`, so don’t use them for input validation.

**Graceful Degradation**

When something fails, fall back to a safe alternative instead of crashing.

```py
def fetch_data():
    try:
        # simulate external call
        raise ConnectionError("API down")
    except ConnectionError:
        print("Using cached data instead")
        return {"cached": True}

print(fetch_data())
```

This approach keeps the system running even when dependencies fail.

> - Use `with` for automatic resource management.
> - Use assertions for developer errors, exceptions for runtime errors.
> - Apply graceful degradation so the system continues working under failure.

## Advanced Concepts

### Metaclasses

A **metaclass** is the "class of a class."
Just as classes create objects, a metaclass creates classes.

**Class of a Class**

In Python, everything is an object, including classes.
By default, classes are created by the built-in `type` metaclass.

```py
MyClass = type("MyClass", (), {"x": 42})
obj = MyClass()
print(obj.x)  # 42
```

Here, `type` dynamically created a new class with attribute `x`.

You can customize class creation by defining your own metaclass:

```py
class MyMeta(type):
    def __new__(cls, name, bases, attrs):
        print(f"Creating class {name}")
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=MyMeta):
    pass

# Output: Creating class MyClass
```

The metaclass intercepts the creation of `MyClass`.

**When to Use**

- **Frameworks and libraries** often use metaclasses to enforce patterns.
  Django ORM uses them to register models automatically.
- **Validation**: ensuring classes define certain attributes or methods.
- **Automatic registration**: collecting subclasses in a registry.

**When Not to Use**

- Avoid metaclasses for everyday programming.
- They add complexity and make code harder to read.
- Use simpler alternatives first: decorators, class inheritance, or mixins.

> - Metaclasses are advanced tools for controlling class creation.
> - Use them only when you need to enforce patterns or automate class behavior.
> - Prefer simpler approaches before reaching for metaclasses.

### Descriptors

A **descriptor** is an object that customizes attribute access.
It defines methods that control how attributes are retrieved, set, or deleted.

**`__get__`, `__set__`, `__delete__`**

```py
class Descriptor:
    def __get__(self, instance, owner):
        print("Getting value")
        return instance._value
    def __set__(self, instance, value):
        print("Setting value")
        instance._value = value
    def __delete__(self, instance):
        print("Deleting value")
        del instance._value

class MyClass:
    attr = Descriptor()

obj = MyClass()
obj.attr = 10       # Setting value
print(obj.attr)     # Getting value → 10
del obj.attr        # Deleting value
```

Here, `attr` is managed by the `Descriptor` class, not stored directly.

**Property Decorators**

The most common use of descriptors is the `property` built-in.
It wraps getter, setter, and deleter into a single managed attribute.

```py
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

    @celsius.deleter
    def celsius(self):
        del self._celsius

t = Temperature(25)
print(t.celsius)   # 25
t.celsius = 30     # calls setter
# t.celsius = -300  # raises ValueError
```

> - Descriptors give fine-grained control over attribute access.
> - `__get__`, `__set__`, `__delete__` implement the descriptor protocol.
> - `property` is a built-in descriptor for getters/setters.
> - Use descriptors for validation, computed attributes, or resource management.

### Iterators and Protocols

An **iterator** is an object that produces values one at a time.
Python loops (`for`, comprehensions) are powered by the iterator protocol.

**`__iter__` and `__next__`**

An object is an **iterator** if it implements:

- `__iter__()` → returns the iterator itself
- `__next__()` → returns the next value, or raises `StopIteration`

```py
class Counter:
    def __init__(self, n):
        self.n = n
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current < self.n:
            self.current += 1
            return self.current
        raise StopIteration

for num in Counter(3):
    print(num)  # 1, 2, 3
```

**Iterable vs Iterator vs Generator**

- **Iterable**: any object you can loop over (list, dict, set).
  Must implement `__iter__`, which returns an iterator.

- **Iterator**: produces values with `__next__`.
  Consumed once; calling again requires a new iterator.

- **Generator**: a function with `yield`.
  Python builds an iterator automatically for you.

```py
# Iterable
nums = [1, 2, 3]

# Iterator
it = iter(nums)
print(next(it))  # 1
print(next(it))  # 2

# Generator
def gen():
    yield 1
    yield 2
    yield 3

for x in gen():
    print(x)
```

> - Iterators implement `__iter__` and `__next__`.
> - Iterables provide iterators but aren’t consumed directly.
> - Generators are a simpler way to build iterators.

### Memory Efficiency

Efficient memory use is important when handling large data or many objects.
Python provides tools to minimize memory overhead.

**Generators vs Lists**

Lists hold all elements in memory. Generators produce elements lazily.

```py
# List comprehension
nums_list = [x**2 for x in range(1_000_000)]

# Generator expression
nums_gen = (x**2 for x in range(1_000_000))

import sys
print(sys.getsizeof(nums_list))  # large memory usage
print(sys.getsizeof(nums_gen))   # tiny, constant size
```

- Use **lists** when you need random access or reuse.
- Use **generators** when you only need to iterate once, especially for large datasets.

**`__slots__` to Reduce Memory Footprint**

By default, Python objects use a dynamic `__dict__` to store attributes.
This is flexible but consumes more memory.
`__slots__` removes the `__dict__` and only allows predefined attributes.

```py
class User:
    __slots__ = ("name", "age")
    def __init__(self, name, age):
        self.name = name
        self.age = age

u = User("Alice", 30)
print(u.name)

# u.address = "x"  # AttributeError (not allowed)
```

Benefits:

- Saves memory when creating many objects.
- Prevents accidental creation of new attributes.

Drawbacks:

- Less flexible (no new attributes, unless you add them to `__slots__`).
- Doesn’t work well with multiple inheritance unless carefully designed.

> - Prefer generators over lists when working with large, one-pass data.
> - Use `__slots__` to reduce per-object memory, especially in large-scale systems.
> - Balance memory savings with flexibility depending on the use case.

## Testing and Quality

### Unit Testing

Unit testing ensures individual pieces of code work as expected.
Python has built-in support with `unittest` and third-party support with `pytest`.

**`unittest` Basics**

The `unittest` module is part of the standard library.

```py
import unittest

def add(a, b):
    return a + b

class TestMath(unittest.TestCase):
    def test_add_integers(self):
        self.assertEqual(add(2, 3), 5)
    def test_add_strings(self):
        self.assertEqual(add("a", "b"), "ab")

if __name__ == "__main__":
    unittest.main()
```

- Tests are grouped in classes that inherit from `unittest.TestCase`.
- Methods starting with `test_` are executed as tests.
- Use assertions like `assertEqual`, `assertTrue`, `assertRaises`.

**`pytest` Features**

`pytest` is more concise and powerful than `unittest`.

```py
def add(a, b):
    return a + b

def test_add_integers():
    assert add(2, 3) == 5

def test_add_strings():
    assert add("a", "b") == "ab"
```

Run tests simply with:

```sh
pytest
```

Key features:

- No need for boilerplate classes.
- Rich set of built-in assertions.
- Fixtures for setup/teardown.
- Plugins for coverage, mocking, parametrization.

Example with fixtures:

```py
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3]

def test_sum(sample_data):
    assert sum(sample_data) == 6
```

> - Use `unittest` for built-in, standard testing.
> - Prefer `pytest` for simpler syntax and advanced features.
> - Write small, focused tests to validate each unit of code.

### Type Checking

Python is dynamically typed, but type hints let you catch errors earlier.
Tools like **mypy** perform static type analysis to enforce these hints.

**mypy Static Analysis**

Install:

```sh
pip install mypy
```

Example with type hints:

```py
def greet(name: str) -> str:
    return "Hello " + name

print(greet("Alice"))
print(greet(42))  # still runs at runtime
```

If you run mypy:

```sh
mypy script.py
```

Output:

```
error: Argument 1 to "greet" has incompatible type "int"; expected "str"
```

mypy checks types **before execution**, preventing many bugs.

**Benefits**

- Detects mismatched types without running code.
- Works well with large codebases and teams.
- Improves IDE autocompletion and documentation.

**Limitations**

- Python doesn’t enforce types at runtime.
- You must adopt typing discipline consistently.

> - Use type hints (`str`, `int`, `Optional`, `Union`, etc.) for clarity.
> - Run `mypy` to enforce contracts and catch type errors.
> - Static typing improves maintainability in large projects.

### Linting and Formatting

Linting and formatting tools keep Python code consistent and error-free.
They enforce style rules, detect bugs, and apply automatic fixes.

**flake8**

- Combines **PyFlakes**, **pycodestyle**, and **McCabe complexity**.
- Checks syntax errors, unused imports, style violations.

Run:

```sh
flake8 src/
```

Example output:

```sh
src/app.py:3:1: F401 'os' imported but unused
```

**pylint**

- More strict and configurable than `flake8`.
- Provides a code quality score.
- Detects code smells (unused variables, bad naming).

Run:

```sh
pylint src/
```

Example output:

```sh
src/app.py:10:0: C0114: Missing module docstring (missing-module-docstring)
```

**black**

- An opinionated code formatter.
- Enforces a consistent style automatically (no config needed).

Format a file:

```sh
black src/app.py
```

It rewrites code in place to a standard format.

**isort**

- Automatically sorts imports into groups (standard lib, third-party, local).
- Works well with `black`.

Run:

```sh
isort src/
```

**Key Takeaways**

- **flake8** → lightweight, common style and error checks.
- **pylint** → detailed analysis, strict rules, quality score.
- **black** → auto-formatter, removes style debates.
- **isort** → keeps imports organized.
- Use them together in CI pipelines to enforce code quality.

## Modules and Ecosystem

### Virtual Environments

Virtual environments isolate dependencies per project.
This prevents conflicts between packages and keeps projects reproducible.

**venv**

`venv` is included in Python’s standard library.

```sh
# create environment
python -m venv venv

# activate
source venv/bin/activate    # Linux / macOS
venv\Scripts\activate       # Windows

# install dependencies
pip install requests

# deactivate
deactivate
```

Dependencies installed here stay local to the environment.

**pipenv**

```sh
`pipenv` manages environments and dependencies together.
It creates a `Pipfile` and `Pipfile.lock`.

# install pipenv
pip install pipenv

# create env and install package
pipenv install requests

# activate shell
pipenv shell
```

This ensures deterministic builds via `Pipfile.lock`.

**Dependency Isolation**

Why isolation matters:

- Different projects may need different package versions.
- Prevents “dependency hell” in system Python.
- Makes deployments more predictable.

**Key Takeaways**

- Use `venv` for lightweight, built-in isolation.
- Use `pipenv` when you need dependency management with lock files.
- Always keep dependencies isolated per project.

### Packaging

Packaging makes Python code reusable and distributable.
The ecosystem has evolved from `setup.py` to modern standards with `pyproject.toml`.

**Poetry**

Poetry is an all-in-one tool for dependency management, virtualenvs, locking, building, and publishing, centered on `pyproject.toml` + `poetry.lock`.

- Reproducible installs via a lockfile.
- Per-project virtual environments without manual `venv`.
- Clean metadata/builds using PEP 517/518 (`pyproject.toml`).

Core commands:

- Init/scaffold: `poetry init`, `poetry new my_app`
- Dependencies: `poetry add fastapi`, `poetry add --group dev pytest`, `poetry remove ...`
- Install/update/lock: `poetry install`, `poetry update`, `poetry lock`
- Run/shell: `poetry run pytest`, `poetry shell`
- Build/publish: `poetry build`, `poetry publish`
- Export (for pip/Docker): `poetry export -f requirements.txt -o requirements.txt --without-hashes`

Typical workflow:

1. Initialize (`poetry init` or `poetry new`).
2. Add dependencies (prod and `--group dev`).
3. `poetry install` to resolve deps, create/use the env, and write/read the lock.
4. Run with `poetry run ...` or open `poetry shell`.
5. Update within constraints using `poetry update`.

Groups & extras (selective installs):

- Install with groups: `poetry install --with dev` or skip groups with `--without dev`.
- Define extras under `[tool.poetry.extras]` and install with `--extras "feature"`.

Locking & CI:

- Commit `poetry.lock` for reproducibility.
- In CI: install Poetry (e.g., `pipx install poetry`), cache based on the lockfile, then `poetry install --no-interaction --no-root --with dev`.

Docker options:

- Keep Poetry in the image and run `poetry install --only main`, or
- Export runtime deps (`poetry export ...`) and then `pip install -r requirements.txt` for a lean image.

Build & publish:

- Configure package metadata in `pyproject.toml`.
- Build artifacts with `poetry build`.
- Publish to PyPI/TestPyPI using `poetry publish` (tokens configured beforehand).

When to use vs skip:

- **Use Poetry:** team projects, CI/CD, multiple dependency groups, publishing.
- **Skip/just mention:** tiny scripts/one-offs where `venv + pip` is enough.

**pip**

`pip` is the package installer for Python. Install packages from [PyPI](https://pypi.org):

```sh
pip install requests
```

Export installed dependencies:

```sh
pip freeze > requirements.txt
```

Install from requirements:

```sh
pip install -r requirements.txt
```

**setuptools**

Historically, Python packages used `setuptools` with a `setup.py`.

```py
from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="0.1",
    packages=find_packages(),
    install_requires=["requests"],
)
```

This approach still works but is being replaced by `pyproject.toml`.

**pyproject.toml**

Introduced in [PEP 518](https://peps.python.org/pep-0518/), `pyproject.toml` standardizes packaging.
It defines build systems and dependencies.

```toml
[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "0.1.0"
dependencies = ["requests"]
```

Build and install:

```sh
pip install build
python -m build
```

This generates `.whl` and `.tar.gz` files for distribution.

**Key Takeaways**

- Use `pip` to install and manage dependencies.
- `setuptools` is the traditional packaging tool.
- `pyproject.toml` is the modern standard for defining builds and dependencies.
- Prefer `pyproject.toml` for new projects—it’s cleaner and future-proof.

### Packaging

Packaging makes Python code reusable and distributable.
The ecosystem has evolved from `setup.py` to modern standards with `pyproject.toml`.

**pip**

`pip` is the package installer for Python.
Install packages from [PyPI](https://pypi.org):

```sh
pip install requests
```

Export installed dependencies:

```sh
pip freeze > requirements.txt
```

Install from requirements:

```sh
pip install -r requirements.txt
```

**setuptools**

Historically, Python packages used `setuptools` with a `setup.py`.

```py
from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="0.1",
    packages=find_packages(),
    install_requires=["requests"],
)
```

This approach still works but is being replaced by `pyproject.toml`.

**pyproject.toml**

Introduced in [PEP 518](https://peps.python.org/pep-0518/), `pyproject.toml` standardizes packaging.
It defines build systems and dependencies.

```toml
[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "0.1.0"
dependencies = ["requests"]
```

Build and install:

```sh
pip install build
python -m build
```

This generates `.whl` and `.tar.gz` files for distribution.

**Key Takeaways**

- Use `pip` to install and manage dependencies.
- `setuptools` is the traditional packaging tool.
- `pyproject.toml` is the modern standard for defining builds and dependencies.
- Prefer `pyproject.toml` for new projects—it’s cleaner and future-proof.

## References

- [Python Official Documentation](https://docs.python.org/3/) – language reference and tutorials
- [PEP Index](https://peps.python.org/) – Python Enhancement Proposals, design decisions
- [Real Python](https://realpython.com/) – in-depth tutorials and guides
- [Full Stack Python](https://www.fullstackpython.com/) – ecosystem overview for backend and APIs
- [FastAPI Docs](https://fastapi.tiangolo.com/) – modern API framework reference
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/) – ORM and SQL toolkit
- [Pydantic Docs](https://docs.pydantic.dev/) – data validation and parsing
- [pytest Docs](https://docs.pytest.org/) – testing framework guide
- [mypy Docs](https://mypy.readthedocs.io/) – static type checker
- [Asyncio Documentation](https://docs.python.org/3/library/asyncio.html) – async framework reference
