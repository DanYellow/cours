import { sum, reverseString, createUsers } from "./index";

test("adds 1 + 2 to equal 3 and 6 + 3 to equal 9", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(6, 3)).toBe(9);
});

// Note : "test" can be replaced by "it"
it("should return 4 elements", () => {
  const nbOfItemsToCreate = 4;
  expect(createUsers(nbOfItemsToCreate)).toHaveLength(nbOfItemsToCreate);
});
