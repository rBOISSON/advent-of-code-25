import path from "path";
import { getFileContent } from "../../helpers";

export const cleanProduct = () => {
    const products = getFileContent(`${path.dirname(__filename)}/input-day-2.txt`, ',');

    let res = 0;
    for (const index in products) {  
        const { lower, upper } = splitRange(products[index]);      
        const numberInRange = flattenRange(lower, upper);

        for (const testNumber of numberInRange) {
            if(isInvalid(testNumber)) {
                res += parseInt(testNumber);
            }
        }
    }   

    console.log("result", res);
}

const isInvalid = (data: string) : boolean => {
    if(data.length % 2 != 0) {
        return false;
    }

    const halfOfNumber = data.length/2;
    for (let i = 0; i < halfOfNumber; i++) {
        if(data[i] != data[i+halfOfNumber]) {
            return false;
        }
    }
    return true;
}

const flattenRange = (lower: number, upper: number): string[] => {
    const res: string[] = [];
    let current = lower; 
    while (current <= upper) {
        res.push(current.toString())
        current++;
    }

    return res;
} 

const splitRange = (range: string) : { lower: number, upper: number } => {
    const ranges = range.split("-");
    if(ranges.length != 2) {
        throw new Error("aie aie aie");
    }

    const lower = parseInt(ranges[0]);
    const upper = parseInt(ranges[1]);
    
    return {lower, upper}
} 