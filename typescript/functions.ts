/**
 * Function for create array of numbers
 * @returns array included integers begins from 0
 */
const range = function(int: int): int[] {
    const arr: int[] = [];
    for(let i = 0; i < int; i++) {
      arr.push(i);
    };
    return arr;
};


const MathHelper = {
  randomValue: function<T>(...values: T[]): T {
    const random = values[Math.floor(Math.random() * values.length)];
    return random;
  },
  radian(gradus: int): int {
    return (gradus * Math.PI) / 180;
  },
};

const ObjectValues = function<T> (obj: {}): T[] {
  return Object.keys(obj).map(function (v) {
    return obj[v];
  });
};

const ArrayHelper = {
  flatAll<T>(array: T[]): T[] {
  return array.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []) 
  }
}