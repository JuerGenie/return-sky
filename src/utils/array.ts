export const SYMBOL_ARRAY_REMOVE = Symbol("remove");
declare global {
  interface Array<T> {
    [SYMBOL_ARRAY_REMOVE]: (this: Array<T>, item: T) => T | undefined;
    remove: (this: Array<T>, item: T) => T | undefined;
  }
}

Array.prototype[SYMBOL_ARRAY_REMOVE] = function <T>(item: T) {
  const index = this.indexOf(item);
  if (index !== -1) {
    return this.splice(index, 1)[0];
  } else {
    return undefined;
  }
};
if (!Array.prototype.remove) {
  Array.prototype.remove = Array.prototype[SYMBOL_ARRAY_REMOVE];
}
