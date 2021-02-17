// ensure this is parsed as a module.
export {};

expect.extend({
  toHaveCssClass(received, className) {
    const isNot = this.isNot;
    const orNot = isNot ? 'not' : '';
    return {
      pass: received.classList.contains(className) === !isNot,
      message: () => `Expected ${received.outerHTML} ${orNot} to contain the CSS class "${className}"`
    };
  }
});


declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveCssClass(className:string): R;
    }
  }
}
