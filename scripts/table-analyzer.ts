import { readFileSync } from 'fs';
import { ITestFinalResult } from '../libs/test/src';

const file = readFileSync(`results/result_${process.argv[2]}.json`);
const data: ITestFinalResult = JSON.parse(file.toString());
console.log(`results/result_${process.argv[3]}.json`);
