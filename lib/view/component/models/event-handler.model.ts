export interface IEventHandlerConfig {
  event: string;
  handler?: Function;
  selector?: string;
  method?: string;
}

export interface IEventHandler {
  event: string;
  selector: string;
  method: string;
}
