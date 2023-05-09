import * as autocannon from 'autocannon';
import { ETestIterationType } from '../libs/test/src/test.enum';
import { IMessage } from '../libs/test/src';

const request: IMessage = {
  name: '1000',
  iterationType: ETestIterationType.AMQP,
  limit: 1000,
};

autocannon(
  {
    url: 'http://localhost:3000/start',
    method: 'POST',
    duration: 10,
    connections: 10,
    pipelining: 2,
    // workers: 4,
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request),
  },
  (err, results) => {
    if (!err) {
      console.log(autocannon.printResult(results));
    }
  },
);
