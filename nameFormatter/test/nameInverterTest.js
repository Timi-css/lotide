const chai = require("chai");
const assert = chai.assert;

const nameInverter = require("../nameInverter");

describe("nameInverter", function () {
  it("shoudld retun an empty string when passed as an empty string", function () {
    const empty = {
      name: "",
    };
    const invertName = nameInverter(empty.name);
    assert.isTrue(invertName === "");
  });

  it("return a single name when passed a single name", function () {
    const singleName = "name";
    const invertName = nameInverter(singleName);
    assert.isTrue(invertName === singleName);
  });

  it("return a empty when passed a single honorific", function () {
    const honorific = "Dr. ";
    const invertName = nameInverter(honorific);
    assert.isTrue(invertName === "");
  });

  it("return a empty when passed a single honorificreturn honorific first-name when passed honorific first-name", function () {
    const honorificFirstName = "Dr. Timi";
    const invertName = nameInverter(honorificFirstName);
    assert.isTrue(invertName === honorificFirstName);
  });

  it("return a honorific last-name, first-name when passed honorific first-name last-name", function () {
    const honorificFirstAndLastName = "Dr. Timi Alabi";
    const invertName = nameInverter(honorificFirstAndLastName);
    assert.isTrue(invertName === honorificFirstAndLastName);
  });

  it("return a honorific last-name, first-name when passed honorific first-name last-name with extra spaces around the words", function () {
    const honorificFirstAndLastNameSpace = "Dr. Timi Alabi";
    const invertName = nameInverter(honorificFirstAndLastNameSpace);
    assert.isTrue(invertName === honorificFirstAndLastNameSpace);
  });
  it("throw an error when name is undefined", function () {
    const name = undefined;
    const invertName = nameInverter(name);
    assert.isTrue(invertName === name);
  });
});
