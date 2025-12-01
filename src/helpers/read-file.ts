import * as fs from 'fs';

export const getFileContent = (filePath: string): string[] => {
    
    const content: string = fs.readFileSync(filePath, 'utf-8');

    const lines: string[] = content.split(/\r?\n/);
    return lines;
}