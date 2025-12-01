import path from 'path';
import { getFileContent } from '../../helpers';

export const findChestCombinaison = () => {
    const inputData = getFileContent(`${path.dirname(__filename)}/input-day-1.txt`);

    console.log("inputdata", inputData);
}

const modulo = (n, mod) => {
    return ((n % mod) + mod) % mod;
};