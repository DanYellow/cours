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

  // We can force promise rejection if the param of the function is "fail"
  if (param === "fail") {
    return Promise.reject([]);
  }

  return Promise.resolve(mockedData);
});

describe("List national holidays metropole", () => {
  it("returns an array", async () => {
    const res = await getNationalHolidays();

    expect(Array.isArray(res)).toBeTruthy();
  });

  it("returns an array of objects", async () => {
    const res = await getNationalHolidays();
    const listKeys = ["name", "date"];

    listKeys.forEach((keyExpected) => {
      expect(res[0]).toHaveProperty(keyExpected);
    });
  });
});
