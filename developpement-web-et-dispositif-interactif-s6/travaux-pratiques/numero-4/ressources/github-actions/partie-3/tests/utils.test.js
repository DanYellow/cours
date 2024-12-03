import { getVersionForName, cleanString } from "#src/utils.js";

describe("getVersionForName", () => {
    it("should return black version", () => {
        expect(getVersionForName["ruby"]).toBe("Rubis");
    });
});

describe("cleanString", () => {
    it("should remove all accents and lowercase string", () => {
        expect(cleanString("Stéphane")).toBe("stéphane");
    });
});
