// Example function
const sum = (val1, val2) => {
  return val1 + val2;
};

// Example function
const createUsers = (nbUsers) => {
  const minAge = 10;
  const maxAge = 65;
  const result = [];

  for (let index = 0; index < nbUsers; index++) {
    result.push({
      age: Math.floor(Math.random() * (maxAge - minAge + 1) + minAge),
    });
  }

  return result;
};

const reverseString = (str) => {
  return str.split("").reverse().join("");
};

export { sum, reverseString, createUsers };
