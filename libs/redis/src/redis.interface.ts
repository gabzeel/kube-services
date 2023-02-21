export interface IRedisModuleOptions {
  connectionUrl?: string;
}

export interface IRedisSubscribeOptions {
  channel: string;
  callback: (message: any) => void;
}
