const multiplierConfig = {
  1: 1,
  2: 0.9,
  3: 0.7,
  4: 0.5
};

const getDiscount = years => {
  return (years > 5) ? 5 / 100 : years / 100;
};

const getMultiplier = type => {
  if (multiplierConfig[type] === undefined)
    throw new Error('Error: type argument is not a registered discount type');
  return multiplierConfig[type];
};

const getRate = (amount, multiplier, discount) => {
  return (amount * multiplier) - (discount * multiplier * amount);
};

// Simplify / Refactorize this function
const calculateDiscount = (amount, type, years) => {
  try {
    let result = 0
    const discount = getDiscount(years);
    const multiplier = getMultiplier(type);
    return getRate(amount, multiplier, discount);
  } catch(err) {
    console.error(err);
  }
}



const assert = (expected, actual) => {
  if (expected !== actual)
    console.warn(`Warning: ${actual} is not equal to ${expected}`);
}


assert(99, calculateDiscount(100, 1, 1));
