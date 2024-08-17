import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readFileSync(fileName) {
    try {
        const filePath = path.join(__dirname, fileName);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return {};
        }
        console.log(err);
        console.log("Error occurred while reading data file.");
        process.exit(1);
    }
}

export function writeFileSync(fileName, fileData) {
    try {
        const filePath = path.join(__dirname, fileName);
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');
    } catch (err) {
        console.log("Error occurred while writing data file.");
        process.exit(1);
    }
}

