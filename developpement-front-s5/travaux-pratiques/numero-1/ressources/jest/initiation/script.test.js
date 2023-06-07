import { sum, reverseString, createUsers } from "./script";

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// // Note : "test" can be replaced by "it"
// it("returns 4 elements", () => {
//   const nbOfItemsToCreate = 4;
//   expect(createUsers(nbOfItemsToCreate)).toHaveLength(nbOfItemsToCreate);
// });

test('08 - Grab my name uppercased', () => {
  const listFormations = ["mmi", "tc"]
  const objet = {
    formation: "mmi"
  }

  // expect(listFormations).toContain(objet.formation)
  // expect(objet).toEqual(
  //   expect.objectContaining({
  //     formation: expect.stringContaining(listFormations.join(','))
  //   })
  // );
  expect(objet).toHaveProperty('formation', listFormations.includes(objet.formation));
});
