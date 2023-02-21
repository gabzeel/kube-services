import * as autocannon from 'autocannon';
import { ITestIterations } from '../libs/test/src';
import { ETestIterationType } from '../libs/test/src/test.enum';

const request: ITestIterations = {
  testNumber: 3,
  stages: [
    {
      type: ETestIterationType.AMQP,
      bytes: 1000000,
    },
    {
      type: ETestIterationType.AMQP,
      bytes: 1000000,
    },
  ],
};

// let currentStage = 0;

autocannon(
  {
    url: 'http://localhost:3000/start',
    method: 'POST',
    duration: 10,
    // connections: 10,
    // pipelining: 1,
    // workers: 4,
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request),
    // setupClient: (client) => {
    //   client.setHeaders({
    //     'Content-type': 'application/json; charset=utf-8',
    //   });

    //   client.setBody(JSON.stringify({ stages: request[currentStage] }));

    //   currentStage =
    //     currentStage < request.stages.length ? currentStage + 1 : 0;
    // },
  },
  (err, results) => {
    if (!err) {
      console.log(autocannon.printResult(results));
    }
  },
);
