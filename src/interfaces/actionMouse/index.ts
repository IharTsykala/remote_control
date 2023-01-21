export interface IHandlerWebServer {
  frontData: string;
}

export interface IActionMouseClick {
  [key: string]: (pixels: number, additionalPixels?: number) => Promise<string | void>;
}

export { IGetMouseMove } from '../actionMouse/move'

export { IGetMouseDrag } from '../actionMouse/drag'
