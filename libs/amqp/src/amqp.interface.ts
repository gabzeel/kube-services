export interface IAMQPModuleOptions {
  connectionUrl?: string;
}

export interface IAMQPSubscribeOptions {
  queue: string;
  callback: (message: any) => void;
}
