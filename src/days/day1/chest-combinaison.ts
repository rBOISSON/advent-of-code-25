import path from 'path';
import { getFileContent } from '../../helpers';

const MODULO = 100;

export const findChestCombinaison = () => {
    console.time("simple tick");
    //const inputData = getFileContent(`${path.dirname(__filename)}/exercise.txt`).filter(data => data.length > 0);
    const inputData = getFileContent(`${path.dirname(__filename)}/input-day-1.txt`).filter(data => data.length > 0);

    let count = 0;
    let currentChestValue = 50;

    for(const input of inputData) {
        currentChestValue = applyCode(currentChestValue, input);
        if (currentChestValue === 0) {
            count++;
        }
    }

    console.log("result", count);
    console.timeEnd("simple tick");

    console.time("all tick");
    
    count = 0;
    currentChestValue = 50;

    for(const input of inputData) {
        let newChestValue = computeChestValue(currentChestValue, input);

        if (currentChestValue === 0 && newChestValue < 0) {
            count--;
        } 

        if (newChestValue === 0) {
            count++;
        }

        while (newChestValue >= MODULO) {
            count++;
            newChestValue -= MODULO;
        }

        while (newChestValue < 0) {
            count++;
            newChestValue += MODULO;

            if(newChestValue === 0) {
                count++;
            }
        }

        currentChestValue = newChestValue;
    }

    console.log("result", count);
    console.timeEnd("all tick");
}

const computeChestValue = (currentChestValue: number, valueToApply: string) : number => {
    const { rotation, rotationValue } = readRotationInstruction(valueToApply);

    let res = currentChestValue; 
    if (rotation == 'L') {
        res -= rotationValue;
    } else {
        res += rotationValue;
    }

    return res;
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

const modulo = (n: number): number => {
    return ((n % MODULO) + MODULO) % MODULO;
};