import path from "path";
import { getFileContent } from "../../helpers";

const dividerMap = new Map<number, number[]>();

export const cleanProduct = () => {
  const products = getFileContent(`${path.dirname(__filename)}/input.txt`, ",");

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
        console.log("add", parseInt(testNumber));
        resComplex += parseInt(testNumber);
      }
    }
  }

  console.log("result complexe products patern", resComplex);
};

const isInvalidV2 = (data: string): boolean => {
  const dividers = findLengthDivider(data.length);

  for (const divider of dividers) {
    const paternLength = data.length / divider;
    const nbPatern = divider;
    if (isPaternRepeated(data, paternLength, nbPatern)) {
      console.log("find", data);
      return true;
    }
  }

  return false;
};

const isPaternRepeated = (
  data: string,
  paternLength: number,
  nbPatern: number
): boolean => {
  for (let i = 0; i < paternLength; i++) {
    const letter = data[i];
    for (let j = 1; j < nbPatern; j++) {
      if (letter != data[i + j * paternLength]) {
        return false;
      }
    }
  }

  console.log("patern find", data);
  console.log("paternLength", paternLength);
  console.log("nbPatern", nbPatern);
  return true;
};

const findLengthDivider = (n: number): number[] => {
  const dividers: number[] = [];

  if (dividerMap.has(n)) {
    return dividerMap.get(n);
  }

  for (let i = 2; i <= n; i++) {
    if (n % i == 0) {
      dividers.push(i);
    }
  }

  dividerMap.set(n, dividers);
  console.log("dividerMap", dividerMap);
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
