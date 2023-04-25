import { plot, Plot } from 'nodeplotlib';
import { readFileSync } from 'fs';
import { FinalResult } from '../libs/test/src';

const file = readFileSync(`results/result_${process.argv[2]}.json`);
const data: FinalResult = JSON.parse(file.toString());
console.log(`results/result_${process.argv[3]}.json`);
const timeDiff: number[] = [];
const bytesTimeDIff: number[] = [];
const bytes: number[] = [];

data.results.map((iteration) => {
  timeDiff.push(iteration.timeDiff);
});

data.results
  .sort((first, second) => {
    return first.bytes - second.bytes;
  })
  .map((iteration) => {
    bytesTimeDIff.push(iteration.timeDiff * 2);
    bytes.push(iteration.timeDiff);
  });

const trace1: Plot = {
  y: timeDiff,
  type: 'scatter',
  name: 'Tempo em cada iteração',
  showlegend: true,
};

const trace2: Plot = {
  x: bytesTimeDIff,
  y: bytes,
  type: 'bar',
  name: 'Tempo pela quantidade de bytes',
  showlegend: true,
};

plot([trace1]);

plot([trace2]);
