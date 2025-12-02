import path from 'path';
import { getFileContent } from '../../helpers';

const MODULO = 100;

export const findChestCombinaison = () => {
    const inputData = getFileContent(`${path.dirname(__filename)}/input-day-1.txt`).filter(data => data.length > 0);

    let count = 0;
    let currentChestValue = 50;

    for(const input of inputData) {
        console.log("input", input);
        currentChestValue = applyCode(currentChestValue, input);
        if (currentChestValue === 0) {
            count++;
        }
    }

    console.log("result", count);
}

const applyCode = (currentChestValue: number, valueToApply: string) : number => {
    const { rotation, rotationValue } = readRotationInstruction(valueToApply);
    let res = currentChestValue; 
    if (rotation == 'L') {
        res -= rotationValue;
    } else {
        res += rotationValue;
    }
    return modulo(res);
}

const readRotationInstruction = (rotationInstruction: string): {rotation: 'L' | 'R', rotationValue: number} => {

    const rotation = rotationInstruction.slice(0, 1); 
    const rotationValue = parseInt(rotationInstruction.slice(1, rotationInstruction.length));
    
    if (rotation != 'L' && rotation != 'R') {
        throw new Error(`unexpected first letter ${rotation}`);
    }

    return { 
        rotation,
        rotationValue 
    }
}

const modulo = (n) => {
    return ((n % MODULO) + MODULO) % MODULO;
};