import extend from "extend";

export function clone<T>(val: T, deep: boolean = false): T {
  return typeof val === "object"
    ? deep
      ? extend(true, {}, val)
      : extend({}, val)
    : val;
}
