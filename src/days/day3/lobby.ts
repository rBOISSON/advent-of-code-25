import path from "path";

import { getFileContent } from "../../helpers";

export const getPowerBanksValue = () => {
  const powerbanks = getFileContent(
    `${path.dirname(__filename)}/input-day-3.txt`,
    "\n"
  );

  let res = 0;

  for (const powerbank of powerbanks) {
    const highestPowerBankValue = getHigestTwoDigitsBankValue(powerbank);
    console.log("highest power bank value", highestPowerBankValue);
    res += parseInt(highestPowerBankValue);
  }

  console.log("result simple power banks", res);

  let resPartTwo = 0;

  for (const powerbank of powerbanks) {
    const highestPowerbankValue = getHighestBankValue(powerbank, 12);
    console.log("highest power bank value", highestPowerbankValue);
    resPartTwo += parseInt(highestPowerbankValue);
  }

  console.log("result part two power banks", resPartTwo);
};

const getHighestBankValue = (powerbank: string, digits: number): string => {
  const starter = findHighest(powerbank, 0, powerbank.length - (digits - 1));
  const highestValue: string[] = [starter.highest];
  let currentHighestIndex: number = starter.index;

  for (let i = highestValue.length; i < digits; i++) {
    const max = powerbank.length - (digits - i - 1);
    const currentHigest = findHighest(powerbank, currentHighestIndex + 1, max);
    currentHighestIndex = currentHigest.index;
    highestValue.push(currentHigest.highest);
  }

  return highestValue.join("");
};

const findHighest = (
  powerbank: string,
  start: number,
  end: number
): { index: number; highest: string } => {
  let firstHighest: string = "0";
  let indexHighest: number = 0;

  for (let i = start; i < end; i++) {
    if (powerbank[i] > firstHighest) {
      firstHighest = powerbank[i];
      indexHighest = i;
    }
  }

  return {
    index: indexHighest,
    highest: firstHighest,
  };
};

const getHigestTwoDigitsBankValue = (powerbank: string): string => {
  let firstHighest: string = "0";
  let indexHighest: number = 0;
  for (let i = 0; i < powerbank.length - 1; i++) {
    if (powerbank[i] > firstHighest) {
      firstHighest = powerbank[i];
      indexHighest = i;
    }
  }

  let secondHighest = "0";
  for (let i = indexHighest + 1; i < powerbank.length; i++) {
    if (powerbank[i] > secondHighest) {
      secondHighest = powerbank[i];
    }
  }

  return `${firstHighest}${secondHighest}`;
};
