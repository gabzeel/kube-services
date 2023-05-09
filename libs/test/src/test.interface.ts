import { ETestIterationType } from './test.enum';

export interface IMessage {
  name: string;
  startDate?: Date;
  bytes?: Buffer;
  limit?: number;
  iterationType?: ETestIterationType;
}

export interface IResult {
  startDate: Date;
  endDate: Date;
  messages: {
    startDate: Date;
    endDate: Date;
  }[];
}
