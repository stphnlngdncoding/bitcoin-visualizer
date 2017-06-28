const randomNumberFromZeroTo = (rangeEnd) => Math.round(Math.random() * rangeEnd);

const onNCall = (n) => (fn) => {
  const number = randomNumberFromZeroTo(n);
  console.log('random number', number);
  number === 0 ? fn() : null;
}

export const everyTimeCall = (fn) => onNCall(0)(fn);

export const halfTheTimeCall = (fn) => onNCall(1)(fn);

export const everyThirdTimeCall = (fn) => onNCall(3)(fn);