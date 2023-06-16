import { sum, reverseString, createUsers } from "./index";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// Note : "test" can be replaced by "it"
it("returns 4 elements", () => {
  const nbOfItemsToCreate = 4;
  expect(createUsers(nbOfItemsToCreate)).toHaveLength(nbOfItemsToCreate);
});
