import { getNationalHolidays } from "./example";

jest.mock("axios");
const mockApi = require("axios");

mockApi.get.mockImplementation(() => {
  const mockedData = {
    "2028-01-01": "1er janvier",
    "2028-04-17": "Lundi de Pâques",
    "2028-05-01": "1er mai",
    "2028-05-08": "8 mai",
    "2028-05-25": "Ascension",
    "2028-06-05": "Lundi de Pentecôte",
    "2028-07-14": "14 juillet",
  };

  return Promise.resolve({ data: mockedData });
});

describe("List national holidays metropole", () => {
  it("returns an array", async () => {
    const res = await getNationalHolidays();

    // toBeTruthy() is same as toBe(true)
    expect(Array.isArray(res)).toBeTruthy()
  });

  it("returns an array of objects", async () => {
    const res = await getNationalHolidays();
    const listKeys = ["name", "date"]

    listKeys.forEach((keyExpected) => {
        expect(res[0]).toHaveProperty(keyExpected);
    })
  });
});
