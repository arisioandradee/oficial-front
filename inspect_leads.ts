import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'public', 'leads-76c68cb7 (2).xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Headers:', Object.keys(data[0] || {}));
console.log('Sample Data (First 2 rows):', JSON.stringify(data.slice(0, 2), null, 2));
console.log('Total Rows:', data.length);
