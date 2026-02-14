import { LevelDefinition } from '../../engine/types';

export const level08: LevelDefinition = {
  number: 8,
  title: 'Classes & OOP',
  description:
    'Master object-oriented programming in TypeScript. Learn classes, access modifiers, abstract classes, interfaces, and advanced patterns like mixins.',
  challenges: [
    // ── Challenge 1: Class Basics ──────────────────────────────
    {
      id: 'L8-C1',
      level: 8,
      number: 1,
      title: 'Class Basics',
      difficulty: 'easy',
      xp: 10,
      description: `
Classes are blueprints for creating objects. In TypeScript, classes support
typed properties, constructors, and methods:

\`\`\`typescript
class Dog {
  name: string;
  breed: string;

  constructor(name: string, breed: string) {
    this.name = name;
    this.breed = breed;
  }

  bark(): string {
    return \`\${this.name} says woof!\`;
  }
}
\`\`\`

You can also use **parameter properties** as a shorthand — declaring
and assigning in the constructor signature:

\`\`\`typescript
class Dog {
  constructor(public name: string, public breed: string) {}
}
\`\`\`
`,
      mission:
        'Create a `Vector2D` class with `x` and `y` number properties, a constructor, a `magnitude()` method returning the vector length, and an `add(other: Vector2D)` method returning a new `Vector2D`.',
      scaffold: `// Create a Vector2D class
// - Properties: x (number), y (number)
// - Constructor takes x and y
// - magnitude() returns Math.sqrt(x*x + y*y)
// - add(other: Vector2D) returns a NEW Vector2D with summed components

// TODO: implement the Vector2D class
`,
      solution: `class Vector2D {
  constructor(public x: number, public y: number) {}

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(other: Vector2D): Vector2D {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }
}
`,
      hints: [
        'Use `constructor(public x: number, public y: number)` for concise property declarations.',
        'magnitude() should return `Math.sqrt(this.x * this.x + this.y * this.y)`.',
        'add() should return `new Vector2D(this.x + other.x, this.y + other.y)` — don\'t mutate the original.',
      ],
      tests: [
        {
          description: 'Vector2D class exists and can be instantiated',
          test: `const v = new Vector2D(3, 4); v instanceof Vector2D;`,
          errorHint: 'Make sure you define a class named Vector2D with a constructor accepting x and y.',
        },
        {
          description: 'x and y properties are set correctly',
          test: `const v = new Vector2D(5, 12); v.x === 5 && v.y === 12;`,
          errorHint: 'The constructor should assign x and y as public properties.',
        },
        {
          description: 'magnitude() calculates correctly (3,4 → 5)',
          test: `const v = new Vector2D(3, 4); v.magnitude() === 5;`,
          errorHint: 'Use Math.sqrt(x*x + y*y). A 3-4-5 triangle has hypotenuse 5.',
        },
        {
          description: 'add() returns a new Vector2D with summed components',
          test: `const a = new Vector2D(1, 2); const b = new Vector2D(3, 4); const c = a.add(b); c.x === 4 && c.y === 6 && c instanceof Vector2D;`,
          errorHint: 'add() should return new Vector2D(this.x + other.x, this.y + other.y).',
        },
        {
          description: 'add() does not mutate the original vector',
          test: `const a = new Vector2D(1, 2); const b = new Vector2D(3, 4); a.add(b); a.x === 1 && a.y === 2;`,
          errorHint: 'add() must return a NEW Vector2D, not modify `this`.',
        },
      ],
    },

    // ── Challenge 2: Access Modifiers ──────────────────────────
    {
      id: 'L8-C2',
      level: 8,
      number: 2,
      title: 'Access Modifiers',
      difficulty: 'easy',
      xp: 10,
      description: `
TypeScript provides three access modifiers:

- **\`public\`** (default) — accessible from anywhere
- **\`private\`** — only accessible within the class itself
- **\`protected\`** — accessible within the class and its subclasses

\`\`\`typescript
class BankAccount {
  private _balance: number;

  constructor(public readonly owner: string, initialBalance: number) {
    this._balance = initialBalance;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Invalid amount');
    this._balance += amount;
  }
}
\`\`\`

\`readonly\` prevents reassignment after construction. Getters and setters
let you control property access with logic.
`,
      mission:
        'Create a `PasswordVault` class with a private `_secrets` map, a public `store(key, value)` method, a public `retrieve(key, masterPassword)` method that only works with the correct master password, and a `count` getter.',
      scaffold: `// Create a PasswordVault class
// - Constructor takes a masterPassword (string), store it privately
// - Private _secrets: Map<string, string> (initialized empty)
// - store(key: string, value: string): void — adds to _secrets
// - retrieve(key: string, masterPassword: string): string | undefined
//   → returns the value only if masterPassword matches, otherwise throws Error
// - get count(): number — returns the number of stored secrets

// TODO: implement the PasswordVault class
`,
      solution: `class PasswordVault {
  private _masterPassword: string;
  private _secrets: Map<string, string> = new Map();

  constructor(masterPassword: string) {
    this._masterPassword = masterPassword;
  }

  store(key: string, value: string): void {
    this._secrets.set(key, value);
  }

  retrieve(key: string, masterPassword: string): string | undefined {
    if (masterPassword !== this._masterPassword) {
      throw new Error('Invalid master password');
    }
    return this._secrets.get(key);
  }

  get count(): number {
    return this._secrets.size;
  }
}
`,
      hints: [
        'Use `private _masterPassword: string` and assign it in the constructor.',
        'Initialize `private _secrets: Map<string, string> = new Map()` as a class field.',
        'In retrieve(), compare the provided password to this._masterPassword and throw an Error if they don\'t match.',
      ],
      tests: [
        {
          description: 'PasswordVault can be created with a master password',
          test: `const vault = new PasswordVault('secret123'); vault instanceof PasswordVault;`,
          errorHint: 'Define the class with a constructor that accepts a masterPassword string.',
        },
        {
          description: 'store() and retrieve() work with correct password',
          test: `const vault = new PasswordVault('abc'); vault.store('email', 'foo@bar.com'); vault.retrieve('email', 'abc') === 'foo@bar.com';`,
          errorHint: 'store() should use _secrets.set(), retrieve() should return _secrets.get() when password matches.',
        },
        {
          description: 'retrieve() throws with wrong password',
          test: `const vault = new PasswordVault('abc'); vault.store('x', 'y'); let threw = false; try { vault.retrieve('x', 'wrong'); } catch(e) { threw = true; } threw;`,
          errorHint: 'Throw an Error when masterPassword doesn\'t match.',
        },
        {
          description: 'count getter returns correct number',
          test: `const vault = new PasswordVault('pw'); vault.count === 0 && (vault.store('a','1'), vault.store('b','2'), vault.count === 2);`,
          errorHint: 'The count getter should return this._secrets.size.',
        },
      ],
    },

    // ── Challenge 3: Abstract Classes ──────────────────────────
    {
      id: 'L8-C3',
      level: 8,
      number: 3,
      title: 'Abstract Classes',
      difficulty: 'medium',
      xp: 25,
      description: `
Abstract classes are base classes that **cannot be instantiated** directly.
They can contain both implemented methods and \`abstract\` method declarations
that subclasses must implement:

\`\`\`typescript
abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  // Concrete method — shared by all subclasses
  describe(): string {
    return \`Shape with area \${this.area().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}
\`\`\`

Abstract classes let you define a **contract** while sharing common logic.
`,
      mission:
        'Create an abstract `DataStore` class with abstract `save`, `load`, and `delete` methods. Then create `MemoryStore` that implements them using an in-memory Map. The abstract class should include a concrete `exists(key)` method.',
      scaffold: `// 1. Create an abstract class DataStore with:
//    - abstract save(key: string, value: unknown): void
//    - abstract load(key: string): unknown | undefined
//    - abstract delete(key: string): boolean
//    - concrete exists(key: string): boolean → returns load(key) !== undefined

// 2. Create class MemoryStore extends DataStore
//    - Uses a private Map<string, unknown> for storage
//    - Implements all abstract methods

// TODO: implement DataStore and MemoryStore
`,
      solution: `abstract class DataStore {
  abstract save(key: string, value: unknown): void;
  abstract load(key: string): unknown | undefined;
  abstract delete(key: string): boolean;

  exists(key: string): boolean {
    return this.load(key) !== undefined;
  }
}

class MemoryStore extends DataStore {
  private data: Map<string, unknown> = new Map();

  save(key: string, value: unknown): void {
    this.data.set(key, value);
  }

  load(key: string): unknown | undefined {
    return this.data.get(key);
  }

  delete(key: string): boolean {
    return this.data.delete(key);
  }
}
`,
      hints: [
        'Use `abstract class DataStore { ... }` — you cannot instantiate it directly.',
        'The concrete `exists` method can call `this.load(key)` even though load is abstract — it will use the subclass implementation at runtime.',
        'MemoryStore should extend DataStore and use a `private data: Map<string, unknown> = new Map()`.',
      ],
      tests: [
        {
          description: 'DataStore cannot be instantiated directly',
          test: `let threw = false; try { new (DataStore as any)(); } catch(e) { threw = true; } threw;`,
          errorHint: 'DataStore must be declared with the `abstract` keyword.',
        },
        {
          description: 'MemoryStore can be instantiated and extends DataStore',
          test: `const store = new MemoryStore(); store instanceof DataStore && store instanceof MemoryStore;`,
          errorHint: 'MemoryStore should extend DataStore.',
        },
        {
          description: 'save and load work correctly',
          test: `const s = new MemoryStore(); s.save('name', 'Alice'); s.load('name') === 'Alice';`,
          errorHint: 'save() should set the value, load() should get it.',
        },
        {
          description: 'delete removes the entry and returns boolean',
          test: `const s = new MemoryStore(); s.save('x', 1); s.delete('x') === true && s.load('x') === undefined && s.delete('x') === false;`,
          errorHint: 'delete() should return true if the key existed, false otherwise. Use Map.delete() which returns a boolean.',
        },
        {
          description: 'exists() uses load() to check key presence',
          test: `const s = new MemoryStore(); s.exists('a') === false && (s.save('a', 42), s.exists('a') === true);`,
          errorHint: 'The concrete exists() method on DataStore should return this.load(key) !== undefined.',
        },
      ],
    },

    // ── Challenge 4: Implementing Interfaces ───────────────────
    {
      id: 'L8-C4',
      level: 8,
      number: 4,
      title: 'Implementing Interfaces',
      difficulty: 'medium',
      xp: 25,
      description: `
Classes can \`implement\` one or more interfaces, guaranteeing they
satisfy a specific contract:

\`\`\`typescript
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Printable {
  prettyPrint(): string;
}

class Config implements Serializable, Printable {
  constructor(public data: Record<string, string>) {}

  serialize(): string { return JSON.stringify(this.data); }
  deserialize(raw: string): void { this.data = JSON.parse(raw); }
  prettyPrint(): string { return JSON.stringify(this.data, null, 2); }
}
\`\`\`

Unlike \`extends\`, \`implements\` only enforces the **shape** — no
code is inherited. A class can implement multiple interfaces.
`,
      mission:
        'Define a `Comparable<T>` interface with `compareTo(other: T): number`, and an `Equatable` interface with `equals(other: unknown): boolean`. Then create a `Temperature` class that implements both, holding a `celsius` value. compareTo returns negative/0/positive. Two temperatures are equal if their celsius values match.',
      scaffold: `// 1. Define interface Comparable<T> with:
//    - compareTo(other: T): number

// 2. Define interface Equatable with:
//    - equals(other: unknown): boolean

// 3. Create class Temperature implements Comparable<Temperature>, Equatable
//    - constructor(public readonly celsius: number)
//    - compareTo: return negative if this < other, 0 if equal, positive if this > other
//    - equals: return true if other is a Temperature with same celsius value

// TODO: implement the interfaces and Temperature class
`,
      solution: `interface Comparable<T> {
  compareTo(other: T): number;
}

interface Equatable {
  equals(other: unknown): boolean;
}

class Temperature implements Comparable<Temperature>, Equatable {
  constructor(public readonly celsius: number) {}

  compareTo(other: Temperature): number {
    return this.celsius - other.celsius;
  }

  equals(other: unknown): boolean {
    return other instanceof Temperature && this.celsius === other.celsius;
  }
}
`,
      hints: [
        'Comparable should be generic: `interface Comparable<T> { compareTo(other: T): number; }`.',
        'For compareTo, simply return `this.celsius - other.celsius` — it naturally gives negative, zero, or positive.',
        'For equals, use `other instanceof Temperature` to check the type before comparing celsius.',
      ],
      tests: [
        {
          description: 'Temperature can be created with celsius value',
          test: `const t = new Temperature(100); t.celsius === 100;`,
          errorHint: 'Temperature should have a public readonly celsius property.',
        },
        {
          description: 'compareTo returns negative when this < other',
          test: `const a = new Temperature(20); const b = new Temperature(30); a.compareTo(b) < 0;`,
          errorHint: 'compareTo should return this.celsius - other.celsius.',
        },
        {
          description: 'compareTo returns 0 for equal temperatures',
          test: `const a = new Temperature(25); const b = new Temperature(25); a.compareTo(b) === 0;`,
          errorHint: 'compareTo should return 0 when both temperatures have the same celsius value.',
        },
        {
          description: 'equals returns true for Temperature with same celsius',
          test: `const a = new Temperature(37); const b = new Temperature(37); a.equals(b) === true;`,
          errorHint: 'Check that other is an instance of Temperature and has the same celsius value.',
        },
        {
          description: 'equals returns false for non-Temperature values',
          test: `const t = new Temperature(42); t.equals(42) === false && t.equals('42') === false && t.equals(null) === false;`,
          errorHint: 'Use `other instanceof Temperature` before accessing celsius.',
        },
      ],
    },

    // ── Challenge 5: Mixins & Patterns ─────────────────────────
    {
      id: 'L8-C5',
      level: 8,
      number: 5,
      title: 'Mixins & Patterns',
      difficulty: 'hard',
      xp: 50,
      description: `
TypeScript doesn't support multiple inheritance, but you can compose
behaviors using the **mixin pattern**. A mixin is a function that takes
a base class and returns a new class extending it:

\`\`\`typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
  };
}

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tag = '';
    setTag(t: string) { this.tag = t; return this; }
  };
}

class User { constructor(public name: string) {} }
const TaggedTimestampedUser = Tagged(Timestamped(User));

const u = new TaggedTimestampedUser('Alice');
u.setTag('admin'); // has all three behaviors!
\`\`\`

This gives you composable, reusable class extensions.
`,
      mission:
        'Define a `Constructor` type alias. Create two mixin functions: `Serializable` (adds `serialize(): string` returning JSON of all own properties) and `Validatable` (adds `validate(): boolean` that returns true by default, and `isValid` getter). Apply both to a `User` class with `name` and `email` properties.',
      scaffold: `// 1. Define: type Constructor<T = {}> = new (...args: any[]) => T;

// 2. Mixin Serializable<TBase extends Constructor>(Base: TBase):
//    - Adds serialize(): string → returns JSON.stringify(this)

// 3. Mixin Validatable<TBase extends Constructor>(Base: TBase):
//    - Adds validate(): boolean → returns true (subclasses can override)
//    - Adds get isValid(): boolean → returns this.validate()

// 4. Create a base class User with constructor(public name: string, public email: string)

// 5. Create SuperUser by applying both mixins: Serializable(Validatable(User))

// TODO: implement the mixins and classes
`,
      solution: `type Constructor<T = {}> = new (...args: any[]) => T;

function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    serialize(): string {
      return JSON.stringify(this);
    }
  };
}

function Validatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    validate(): boolean {
      return true;
    }
    get isValid(): boolean {
      return this.validate();
    }
  };
}

class User {
  constructor(public name: string, public email: string) {}
}

const SuperUser = Serializable(Validatable(User));
`,
      hints: [
        'The Constructor type is: `type Constructor<T = {}> = new (...args: any[]) => T;`',
        'Each mixin function returns an anonymous `class extends Base { ... }` that adds new methods.',
        'Apply mixins by composing: `const SuperUser = Serializable(Validatable(User));`',
      ],
      tests: [
        {
          description: 'SuperUser class exists and creates instances with name and email',
          test: `const u = new SuperUser('Alice', 'alice@test.com'); u.name === 'Alice' && u.email === 'alice@test.com';`,
          errorHint: 'SuperUser should be the result of applying mixins to User. Instances need name and email.',
        },
        {
          description: 'serialize() returns valid JSON with properties',
          test: `const u = new SuperUser('Bob', 'bob@x.com'); const parsed = JSON.parse(u.serialize()); parsed.name === 'Bob' && parsed.email === 'bob@x.com';`,
          errorHint: 'serialize() should return JSON.stringify(this).',
        },
        {
          description: 'validate() returns true by default',
          test: `const u = new SuperUser('X', 'x@y.com'); u.validate() === true;`,
          errorHint: 'The Validatable mixin should add a validate() method returning true.',
        },
        {
          description: 'isValid getter calls validate()',
          test: `const u = new SuperUser('X', 'x@y.com'); u.isValid === true;`,
          errorHint: 'Add a `get isValid()` that returns `this.validate()`.',
        },
        {
          description: 'Instance has all mixed-in methods',
          test: `const u = new SuperUser('A', 'a@b.com'); typeof u.serialize === 'function' && typeof u.validate === 'function';`,
          errorHint: 'Make sure both Serializable and Validatable mixins are applied.',
        },
      ],
    },

    // ── Challenge 6: BOSS — The Game Engine ────────────────────
    {
      id: 'L8-C6',
      level: 8,
      number: 6,
      title: 'BOSS: The Game Engine',
      difficulty: 'boss',
      xp: 200,
      description: `
**BOSS BATTLE!** Time to put it all together.

The **Entity-Component System (ECS)** is a pattern used in game engines.
Instead of deep inheritance hierarchies, entities are composed of
**components** (data) and processed by **systems** (logic):

- **Component**: a plain data object with a \`type\` string tag
- **Entity**: an ID + collection of components
- **World**: manages entities, lets you query by component type

\`\`\`
  Entity "player"
  ├── PositionComponent { type: "position", x: 0, y: 0 }
  ├── HealthComponent   { type: "health", current: 100, max: 100 }
  └── RenderComponent   { type: "render", sprite: "hero.png" }
\`\`\`
`,
      mission: `Build a mini ECS:
1. A \`Component\` interface with a \`readonly type: string\` property.
2. An \`Entity\` class with a numeric \`id\`, methods to \`addComponent\`, \`getComponent<T extends Component>(type: string)\`, \`removeComponent(type)\`, and \`hasComponent(type)\`.
3. A \`World\` class that creates entities (with auto-incrementing IDs), removes entities, and queries entities that have ALL of a given set of component types.`,
      scaffold: `// ── Component Interface ──
// interface Component {
//   readonly type: string;
// }

// ── Entity Class ──
// - id: number (set via constructor)
// - addComponent(component: Component): this
// - getComponent<T extends Component>(type: string): T | undefined
// - removeComponent(type: string): boolean
// - hasComponent(type: string): boolean

// ── World Class ──
// - private nextId starting at 1
// - private entities: Map<number, Entity>
// - createEntity(): Entity  → creates with auto-incrementing id, stores, returns it
// - removeEntity(id: number): boolean
// - getEntity(id: number): Entity | undefined
// - query(...componentTypes: string[]): Entity[]
//   → returns all entities that have ALL specified component types

// TODO: implement Component, Entity, and World
`,
      solution: `interface Component {
  readonly type: string;
}

class Entity {
  private components: Map<string, Component> = new Map();

  constructor(public readonly id: number) {}

  addComponent(component: Component): this {
    this.components.set(component.type, component);
    return this;
  }

  getComponent<T extends Component>(type: string): T | undefined {
    return this.components.get(type) as T | undefined;
  }

  removeComponent(type: string): boolean {
    return this.components.delete(type);
  }

  hasComponent(type: string): boolean {
    return this.components.has(type);
  }
}

class World {
  private nextId = 1;
  private entities: Map<number, Entity> = new Map();

  createEntity(): Entity {
    const entity = new Entity(this.nextId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  removeEntity(id: number): boolean {
    return this.entities.delete(id);
  }

  getEntity(id: number): Entity | undefined {
    return this.entities.get(id);
  }

  query(...componentTypes: string[]): Entity[] {
    const results: Entity[] = [];
    for (const entity of this.entities.values()) {
      if (componentTypes.every(t => entity.hasComponent(t))) {
        results.push(entity);
      }
    }
    return results;
  }
}
`,
      hints: [
        'Entity should store components in a `Map<string, Component>` keyed by `component.type`.',
        'addComponent should return `this` for method chaining. getComponent uses a generic `<T extends Component>` and casts the result.',
        'World.query() should iterate all entities and filter using `componentTypes.every(t => entity.hasComponent(t))`.',
      ],
      tests: [
        {
          description: 'World creates entities with auto-incrementing IDs',
          test: `const w = new World(); const e1 = w.createEntity(); const e2 = w.createEntity(); e1.id === 1 && e2.id === 2;`,
          errorHint: 'World should have a private nextId starting at 1, incrementing on each createEntity() call.',
        },
        {
          description: 'Entity.addComponent and getComponent work',
          test: `const w = new World(); const e = w.createEntity(); e.addComponent({ type: 'position', x: 10, y: 20 } as any); const c = e.getComponent('position') as any; c !== undefined && c.x === 10 && c.y === 20;`,
          errorHint: 'Store components in a Map keyed by component.type.',
        },
        {
          description: 'addComponent returns this for chaining',
          test: `const w = new World(); const e = w.createEntity(); const ret = e.addComponent({ type: 'a' }).addComponent({ type: 'b' }); ret === e && e.hasComponent('a') && e.hasComponent('b');`,
          errorHint: 'addComponent should `return this`.',
        },
        {
          description: 'removeComponent and hasComponent work',
          test: `const w = new World(); const e = w.createEntity(); e.addComponent({ type: 'hp' }); e.hasComponent('hp') === true && e.removeComponent('hp') === true && e.hasComponent('hp') === false;`,
          errorHint: 'Use Map.delete() for remove and Map.has() for hasComponent.',
        },
        {
          description: 'World.removeEntity removes the entity',
          test: `const w = new World(); const e = w.createEntity(); const id = e.id; w.removeEntity(id) === true && w.getEntity(id) === undefined;`,
          errorHint: 'removeEntity should delete from the entities Map and return the boolean result.',
        },
        {
          description: 'World.query returns entities matching ALL component types',
          test: `const w = new World(); const e1 = w.createEntity(); e1.addComponent({ type: 'pos' }).addComponent({ type: 'vel' }); const e2 = w.createEntity(); e2.addComponent({ type: 'pos' }); const e3 = w.createEntity(); e3.addComponent({ type: 'pos' }).addComponent({ type: 'vel' }).addComponent({ type: 'hp' }); const r1 = w.query('pos', 'vel'); const r2 = w.query('pos'); r1.length === 2 && r1.includes(e1) && r1.includes(e3) && r2.length === 3;`,
          errorHint: 'query() should return entities that have ALL specified component types, not just any.',
        },
      ],
    },
  ],
};
