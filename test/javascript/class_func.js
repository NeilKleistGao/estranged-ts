class Foo {
    constructor() {
        this.x = 42;
        this.bar = (x) => {
            return x;
        };
    }
}
class Baz extends Foo {
    constructor() {
        super(...arguments);
        this.x = 43;
        this.bar = (x) => {
            return x + 1;
        };
    }
}
const foo = new Foo();
foo.bar = (x) => { return null; };
