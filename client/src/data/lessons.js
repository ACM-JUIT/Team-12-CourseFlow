// src/data/lessons.js
//
// This file holds the course content locally for now.
// Field names (_id, videoUrl, etc.) are chosen to match what Khushi's
// MongoDB CourseContent model will likely look like — so when the
// backend is ready, we can swap this file out for a real API call
// with minimal changes to CourseContent.jsx.

const lessons = [
  {
    _id: 1,
    title: "Object-Oriented Programming",
    duration: "25 minutes",
    description:
      "Learn encapsulation, inheritance, and polymorphism principles. Design classes with constructors and access specifiers. Implement abstract classes and interfaces for modular code.",
    videoId: "ZzaPdXTrSb8",
    topics: [
      {
        _id: "classes",
        title: "Classes and Objects",
        description:
          "Classes are blueprints for creating objects. They define properties (data members) and behaviors (member functions) that objects will have. Objects are instances of classes representing real-world entities. Each object has its own copy of data members.",
        code: `class Car {
  public:
    string brand;
    void honk() {
        cout << "Beep beep!\\n";
    }
};

int main() {
    Car myCar;
    myCar.brand = "Toyota";
    myCar.honk();
}`,
      },
      {
        _id: "inheritance",
        title: "Inheritance",
        description:
          "Inheritance allows a new class (derived) to inherit properties and behaviors from an existing class (base). This promotes code reuse and hierarchical classification. Derived classes can add new features or override existing behaviors.",
        code: `class Animal {
  public:
    void eat() {
        cout << "I can eat!\\n";
    }
};

class Dog : public Animal {
  public:
    void bark() {
        cout << "I can bark!\\n";
    }
};

int main() {
    Dog myDog;
    myDog.eat();
    myDog.bark();
}`,
      },
      {
        _id: "encapsulation",
        title: "Encapsulation",
        description:
          "Encapsulation bundles data and methods into a single unit (class) while restricting direct access to some components. Private members can only be accessed within the class. Public methods provide controlled access to private data through getters and setters.",
        code: `class BankAccount {
  private:
    double balance;
  public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    double getBalance() {
        return balance;
    }
};

int main() {
    BankAccount acc;
    acc.deposit(500.0);
    cout << "Balance: " << acc.getBalance();
}`,
      },
    ],
  },
  {
    _id: 2,
    title: "Memory Management and Pointers",
    duration: "35 minutes",
    description:
      "Understand how C++ manages memory on the stack and heap. Learn to use pointers, references, and smart pointers to write safe, efficient code.",
    videoId: "TbbSJrY5GqQ",
    topics: [
      {
        _id: "pointers",
        title: "Pointers and References",
        description:
          "A pointer stores the memory address of a variable. References are aliases for existing variables. Understanding both is crucial for efficient C++ programming.",
        code: `int main() {
    int x = 10;
    int* ptr = &x;      // pointer to x
    int& ref = x;       // reference to x

    cout << *ptr << "\\n"; // prints 10
    ref = 20;
    cout << x << "\\n";   // prints 20
}`,
      },
      {
        _id: "dynamic",
        title: "Dynamic Memory Allocation",
        description:
          "Use new and delete to allocate and free memory on the heap at runtime. Always pair every new with a delete to avoid memory leaks.",
        code: `int main() {
    int* arr = new int[5];   // allocate

    for (int i = 0; i < 5; i++)
        arr[i] = i * 10;

    for (int i = 0; i < 5; i++)
        cout << arr[i] << " ";

    delete[] arr;            // free memory
}`,
      },
      {
        _id: "smart",
        title: "Smart Pointers",
        description:
          "Smart pointers (unique_ptr, shared_ptr) manage heap memory automatically, eliminating the need for manual delete calls and preventing memory leaks.",
        code: `#include <memory>

int main() {
    // unique ownership
    unique_ptr<int> up = make_unique<int>(42);
    cout << *up << "\\n";

    // shared ownership
    shared_ptr<int> sp1 = make_shared<int>(100);
    shared_ptr<int> sp2 = sp1;
    cout << *sp1 << " " << *sp2 << "\\n";
}   // memory freed automatically`,
      },
    ],
  },
  {
    _id: 3,
    title: "Templates and Generic Programming",
    duration: "30 minutes",
    description:
      "Write type-independent code using function and class templates. Explore template specialization and understand how the STL uses generics under the hood.",
    videoId: "KtSMkCWM0oM",
    topics: [
      {
        _id: "func-templates",
        title: "Function Templates",
        description:
          "Function templates let you write a single function that works for multiple data types. The compiler generates the appropriate version when the function is called.",
        code: `template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maxVal(3, 7) << "\\n";       // int
    cout << maxVal(3.5, 2.1) << "\\n";  // double
    cout << maxVal('a', 'z') << "\\n";  // char
}`,
      },
      {
        _id: "class-templates",
        title: "Class Templates",
        description:
          "Class templates create generic data structures. The same Stack class can hold integers, strings, or any other type without rewriting the logic.",
        code: `template <typename T>
class Stack {
    vector<T> data;
  public:
    void push(T val) { data.push_back(val); }
    T pop() {
        T top = data.back();
        data.pop_back();
        return top;
    }
    bool empty() { return data.empty(); }
};

int main() {
    Stack<int> s;
    s.push(10);
    s.push(20);
    cout << s.pop();   // 20
}`,
      },
    ],
  },
  {
    _id: 4,
    title: "Standard Template Library",
    duration: "30 minutes",
    description:
      "Master the STL's containers, iterators, and algorithms. Learn when to use vector, map, set, and unordered_map to solve problems efficiently.",
    videoId: "RRVYpIET_RU",
    topics: [
      {
        _id: "containers",
        title: "Containers",
        description:
          "STL containers store collections of objects. vector is a dynamic array, map is a sorted key-value store, and unordered_map provides O(1) average lookups.",
        code: `#include <vector>
#include <map>

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    v.push_back(6);

    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"]   = 87;

    for (auto& [name, score] : scores)
        cout << name << ": " << score << "\\n";
}`,
      },
      {
        _id: "algorithms",
        title: "STL Algorithms",
        description:
          "The <algorithm> header provides ready-made algorithms like sort, find, count, and transform that work with any STL container via iterators.",
        code: `#include <algorithm>
#include <vector>

int main() {
    vector<int> v = {5, 3, 8, 1, 9, 2};

    sort(v.begin(), v.end());        // ascending sort
    auto it = find(v.begin(), v.end(), 8);

    if (it != v.end())
        cout << "Found 8 at index "
             << distance(v.begin(), it);
}`,
      },
    ],
  },
];

export default lessons;
