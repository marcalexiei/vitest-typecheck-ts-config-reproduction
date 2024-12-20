import { assertType, describe, expectTypeOf, it } from "vitest";

describe("typechecking", () => {
  it("number", () => {
    assertType<number>(1);
  });

  const str: string = null;
});
