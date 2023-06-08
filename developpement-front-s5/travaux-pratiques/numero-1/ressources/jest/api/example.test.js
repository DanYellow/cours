import { getNationalHolidays } from "./example";

jest.mock("./api");
const mockApi = require("./api");

mockApi.fetchNationalHolidays.mockImplementation((param) => {
  // Simulate the data expected from backend
  const mockedData = {
    "2028-01-01": "1er janvier",
    "2028-04-17": "Lundi de Pâques",
    "2028-05-01": "1er mai",
    "2028-05-08": "8 mai",
    "2028-05-25": "Ascension",
    "2028-06-05": "Lundi de Pentecôte",
    "2028-07-14": "14 juillet",
  };

  if (param === "fail") {
    return Promise.reject([]);
  }

  return Promise.resolve(mockedData);
});

// xdescribe("List national holidays metropole", () => {
//   it("returns an array", async () => {
//     const res = await getNationalHolidays();

//     // toBeTruthy() is same as toBe(true)
//     expect(Array.isArray(res)).toBeTruthy();
//   });

//   it("returns an array of objects", async () => {
//     const res = await getNationalHolidays();
//     const listKeys = ["name", "date"];

//     listKeys.forEach((keyExpected) => {
//       expect(res[0]).toHaveProperty(keyExpected);
//     });
//   });
// });

describe("List national holidays metropole", () => {
  it("returns an array", async () => {
    return getNationalHolidays("fail").catch((res) => {
      expect(Array.isArray(res)).toBeTruthy();
    })
    // await expect(getNationalHolidays("fail")).rejects.toBeTruthy();
    // const res = await getNationalHolidays("fail");
    // console.log("ff", res)
    // // toBeTruthy() is same as toBe(true)
    // expect(mockApi.fetchNationalHolidays).toBeCalled()
  });
});
