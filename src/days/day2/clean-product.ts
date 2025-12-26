import path from "path";

import { getFileContent } from "../../helpers";

const dividerMap = new Map<number, number[]>();

export const cleanProduct = () => {
  const products = getFileContent(
    `${path.dirname(__filename)}/input-day-2.txt`,
    ","
  );

  let res = 0;
  for (const index in products) {
    const { lower, upper } = splitRange(products[index]);
    const numberInRange = flattenRange(lower, upper);

    for (const testNumber of numberInRange) {
      if (isInvalidV1(testNumber)) {
        res += parseInt(testNumber);
      }
    }
  }

  console.log("result simple products patern", res);

  let resComplex = 0;

  for (const index in products) {
    const { lower, upper } = splitRange(products[index]);
    const numberInRange = flattenRange(lower, upper);

    for (const testNumber of numberInRange) {
      if (isInvalidV2(testNumber)) {
        resComplex += parseInt(testNumber);
      }
    }
  }

  console.log("result complexe products patern", resComplex);
};

const isInvalidV2 = (data: string): boolean => {
  const dividers = findLengthDivider(data.length);

  for (const divider of dividers) {
    const paternLength = divider;
    const nbPatern = data.length / divider;
    for (let i = 0; i < paternLength; i++) {
      const letter = data[i];
      for (let j = 0; j < nbPatern; j++) {
        if (letter != data[i + j * nbPatern]) {
          return false;
        }
      }
    }
  }

  return true;
};

const findLengthDivider = (n: number): number[] => {
  const dividers: number[] = [];
  console.log("looking for n", n);

  if (dividerMap.has(n)) {
    return dividerMap.get(n);
  }

  for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
      dividers.push(i);
    }
  }

  dividerMap.set(n, dividers);
  console.log("find", dividers);
  return dividers;
};

const isInvalidV1 = (data: string): boolean => {
  if (data.length % 2 != 0) {
    return false;
  }

  const halfOfNumber = data.length / 2;
  for (let i = 0; i < halfOfNumber; i++) {
    if (data[i] != data[i + halfOfNumber]) {
      return false;
    }
  }
  return true;
};

const flattenRange = (lower: number, upper: number): string[] => {
  const res: string[] = [];
  let current = lower;
  while (current <= upper) {
    res.push(current.toString());
    current++;
  }

  return res;
};

const splitRange = (range: string): { lower: number; upper: number } => {
  const ranges = range.split("-");
  if (ranges.length != 2) {
    throw new Error("aie aie aie");
  }

  const lower = parseInt(ranges[0]);
  const upper = parseInt(ranges[1]);

  return { lower, upper };
};
