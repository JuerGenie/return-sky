import { toRef, isRef, watchRef } from "../src/value";

test("check toRef()", () => {
  const ref = toRef({ id: 1000 });
  expect(ref.id).toBe(1000);
});

test("check isRef()", () => {
  const ref = toRef({});
  expect(isRef(ref)).toBe(true);
});

test("check watchRef()", () => {
  const ref = toRef({ id: 1000 });

  let tag = false;
  const result = watchRef(ref, (nv) => {
    expect(nv.id).toBe(1200);
    expect(tag).toBe(false);
    tag = true;
  });
  ref.id = 1200;
  result();
  ref.id = 1400;
});
