class Pizza {
  constructor(size, crust) {
    this.toppings = ["cheese"];
    this.size = size;
    this.crust = crust;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }
  getPrice() {
    const basePrice = 10;
    const toppingPrice = 2;
    return basePrice + this.toppings.length * toppingPrice;
  }

  set size(size) {
    if (size === "s" || size === "m" || size === "l") {
      this._size = size;
    }
  }
}

// let pizza = new Pizza("large", "thin");
let pizza = {
  size: "large",
  crust: "thin",
  toppings: ["cheese"],
};

let pizza1 = new Pizza();
console.log(pizza1.toppings);
pizza1.addTopping("mushrooms");
pizza1.addTopping("peppers");
console.log(pizza1.toppings);

let pizza2 = new Pizza();
console.log(pizza2.toppings);
pizza2.addTopping("more cheese");
console.log(pizza2.toppings);

let pizza3 = new Pizza();
pizza3.getPrice();

class SomeClass {
  methodName(parameters) {
    // this is a method e.g.:
    this.hello = "hi";
  }
}
