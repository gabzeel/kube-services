export interface IMQTTModuleOptions {
  connectionUrl?: string;
}

export interface IMQTTSubscribeOptions {
  topic: string;
  callback: (message: any) => void;
}
