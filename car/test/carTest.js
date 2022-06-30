const chai = require("chai"); // 1
const assert = chai.assert;

const shouldBuyCar = require("../shouldBuyCar.js"); // 2

describe("#shouldBuyCar()", function () {
  // 3

  it("should return false if it's a hatchback", function () {
    // 4
    const car = {
      type: "hatchback",
    };
    const shouldBuy = shouldBuyCar(car);
    assert.isFalse(shouldBuy);
  });
  it("should return true when the car is pink", function () {
    const carColor = {
      color: "pink",
    };
    const shouldBuy = shouldBuyCar(carColor);
    assert.isTrue(shouldBuy);
  });
  it("should return false when there are no details about the car", function () {
    const carDetail = {
      car: undefined,
    };
    const shouldBuy = shouldBuyCar(carDetail);
    assert.isFalse(shouldBuy);
  });
  it("should return false when the car is a hatchback and pink", function () {
    const carTypeAndColor = {
      type: "hatchback",
      color: "pink",
    };

    const shouldBuy = shouldBuyCar(carTypeAndColor);
    assert.isFalse(shouldBuy);
  });
  it("should return true when the car has 6 litres/100km and is under or equal to $5,000", function () {
    const carLitresAndPrice = {
      litresPer100km: 6,
      price: 5000,
    };
    const shouldBuy = shouldBuyCar(carLitresAndPrice);
    assert.isTrue(shouldBuy);
  });
  it("should return true when the car has 11 litres/100km and is under or equal to $5,000", function () {
    const carLitresAndPrice = {
      litresPer100km: 11,
      price: 5000,
    };
    const shouldBuy = shouldBuyCar(carLitresAndPrice);
    assert.isTrue(shouldBuy);
  });

  it("should return true when the car has 6 litres/100km and is over $5,000", function () {
    const carLitresAndPrice = {
      litresPer100km: 6,
      price: price >= 5000,
    };
    const shouldBuy = shouldBuyCar(carLitresAndPrice);
    assert.isTrue(shouldBuy);
  });
});
