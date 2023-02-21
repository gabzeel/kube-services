import { plot, Plot } from 'nodeplotlib';
import { readFileSync } from 'fs';
import { ITestFinalResult } from '../libs/test/src';

const file = readFileSync(`results/result_${process.argv[2]}.json`);
const data: ITestFinalResult = JSON.parse(file.toString());
console.log(`results/result_${process.argv[3]}.json`);
const x: number[] = [];
const y: number[] = [];

data.iterations.map((iteration, index) => {
  y.push(index + 1);
  x.push(iteration.timeDiff / 1000);
});

const trace1: Plot = { x, type: 'histogram' };

plot([trace1]);
