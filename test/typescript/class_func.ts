class Foo {
  readonly x: number = 42;

  bar(x) {
    return x;
  }

  foo: (x: number) => any
}

class Baz extends Foo {
  readonly x: number = 43;

  bar(x) {
    return x + 1;
  }
}

const foo = new Foo();
foo.bar = (x) => {return null;};
