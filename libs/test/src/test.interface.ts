import { ETestIterationType } from './test.enum';

export interface ITestStage {
  type: ETestIterationType;
  bytes: number;
}

export interface ITestResult {
  iteration: number;
  type: ETestIterationType;
  bytes: number;
  startDate: Date;
  endDate?: Date;
  timeDiff?: number;
}

export interface ITestIterations {
  testNumber: number;
  stages: ITestStage[];
  startDate?: Date;
  endDate?: Date;
  timeDiff?: number;
  currentStage?: number;
  results?: ITestResult[];
  bytes?: Buffer;
}

export interface ITestFinalResult {
  iterations: [
    Omit<ITestIterations, 'stages' | 'currentStage' | 'bytesu' | 'testNumber'>,
  ];
}
