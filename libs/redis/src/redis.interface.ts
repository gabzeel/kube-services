export interface IRedisModuleOptions {
  port?: number;
  host?: string;
}

export interface IRedisSubscribeOptions {
  channel: string;
  callback: (message: any) => void;
}
