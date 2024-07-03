const multiplierConfig = {
  1: 1,
  2: 0.9,
  3: 0.7,
  4: 0.5
};

const getDiscount = years => {
  const rate = years / 100;
  if (rate > (5 / 100))
    return (5 / 100);
  return rate;
};

const getMultiplier = type => {
  if (multiplierConfig[type] === undefined)
    throw new Error('Error: type argument is not a registered discount type');
  return multiplierConfig[type];
};

const getDiscounted = (amount, multiplier, discount) => {
  return amount * multiplier * (1 - discount);
};

// Simplify / Refactorize this function
const calculateDiscount = (amount, type, years) => {
  try {
    const discount = getDiscount(years);
    const multiplier = getMultiplier(type);
    return getDiscounted(amount, multiplier, discount);
  } catch(err) {
    console.warn('Warning: returning 0 as discounted product price !');
    return 0;
  }
}



const assert = (expected, actual) => {
  if (expected !== actual)
    console.warn(`Warning: ${actual} is not equal to ${expected}`);
}


assert(99, calculateDiscount(100, 1, 1));
