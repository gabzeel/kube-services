import { plot, Plot } from 'nodeplotlib';
import { readFileSync } from 'fs';
import { IResult } from '../libs/test/src';

const file = readFileSync(`results/result_${process.argv[2]}.json`);
const data: IResult = JSON.parse(file.toString());
console.log(`results/result_${process.argv[3]}.json`);
const x: number[] = [];
const y: number[] = [];

data.messages.map((iteration) => {
  x.push(new Date(iteration.startDate).getTime());
  y.push(
    (new Date(iteration.endDate).getTime() -
      new Date(iteration.startDate).getTime()) /
      1000,
  );
});

const trace1: Plot = {
  x,
  y,
  type: 'bar',
  showlegend: true,
};

plot([trace1]);
