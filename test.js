const chai = window.chai;
const expect = chai.expect;
const assert = chai.assert;

describe("getCitiesFromRegion", () => {
  it("should get a region's cities", () => {
    expect(getCitiesFromRegion("Maritime")).to.deep.equal([
      "Lomé",
      "Tsévié",
      "Aného",
      "Vogan",
      "Tabligbo",
    ]);
  });
});

describe("getRandomNumber", () => {
  it("should return a random number", () => {
    expect(getRandomNumber(10)).to.be.below(10);
  });
});

describe("selectRandomly", () => {
  it("should select randomly from an array", () => {
    expect([1, 2, 3]).to.deep.include(selectRandomly([1, 2, 3]));
  });
});

describe("removeFromArray", () => {
  it("should remove from an array", () => {
    assert(() => {
      let array = [1, 2, 3];
      let newArray = removeFromArray([array], 2);
      for (let i = 0; i < array.length; i++) {
        let found = false;
        for (let j = 0; j < newArray.length; j++) {
          if (newArray[j] === array[i]) {
            found = true;
          }
        }
        if (!found) {
          return false;
        }
      }
      return true;
    }, "Removal successfull");
  });
});
