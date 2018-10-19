// Pick the first defined of two or three arguments.
export function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}
//# sourceMappingURL=defaults.js.map