import path from "path";

import { getFileContent } from "../../helpers";

export const getPowerBanksValue = () => {
  const powerbanks = getFileContent(
    `${path.dirname(__filename)}/input-day-3.txt`,
    "\n"
  );

  let res = 0;

  for (const powerBank of powerbanks) {
    const highestPowerBankValue = getHigestBankValue(powerBank);
    console.log("highest power bank value", highestPowerBankValue);
    res += parseInt(highestPowerBankValue);
  }

  console.log("result simple power bankls", res);
};

const getHigestBankValue = (powerBank: string): string => {
  let firstHighest: string = "0";
  let indexHighest: number = 0;
  for (let i = 0; i < powerBank.length - 1; i++) {
    if (powerBank[i] > firstHighest) {
      firstHighest = powerBank[i];
      indexHighest = i;
    }
  }

  let secondHighest = "0";
  for (let i = indexHighest + 1; i < powerBank.length; i++) {
    if (powerBank[i] > secondHighest) {
      secondHighest = powerBank[i];
    }
  }

  return `${firstHighest}${secondHighest}`;
};
