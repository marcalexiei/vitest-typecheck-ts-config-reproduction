import { assertType, describe, expectTypeOf, it } from "vitest";

describe("typechecking", () => {
  it("string", () => {
    assertType<string>("asd");
  });
});
