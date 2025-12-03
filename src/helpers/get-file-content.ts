import * as fs from 'fs';

export const getFileContent = (filePath: string, separator: string | RegExp): string[] => {
    
    const content: string = fs.readFileSync(filePath, 'utf-8');

    const lines: string[] = content.split(separator);
    return lines;
}