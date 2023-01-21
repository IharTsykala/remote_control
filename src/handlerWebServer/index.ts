import {
  mouse,
  screen,
  singleWord,
  sleep,
  useConsoleLogger,
  ConsoleLogLevel,
  straightTo,
  centerOf,
  Button,
  getActiveWindow,
  up,
  down,
  right,
  left,
  Point,
} from '@nut-tree/nut-js'
import { MousePosition } from '../mousePosition'

interface IHandlerWebServer {
  frontData: string;
}

interface IGetMouseMove {
  (direction: Point[] | Promise<Point[]>): void;
}

const getMouseMove: IGetMouseMove = (direction) => mouse.move(direction)

const { setMousePositionByX, setMousePositionByY, getMousePositionByX, getMousePositionByY } = new MousePosition()

interface I_ACTIONS_MOUSE_CLICK {
  [key: string]: (pixels: number, additionalPixels?: number) => Promise<string> | Promise<void>;
}

const ACTIONS_MOUSE_CLICK: I_ACTIONS_MOUSE_CLICK = {
  mouse_up: async (pixels) => {
    await getMouseMove(up(pixels))
    setMousePositionByX(pixels)
  },
  mouse_down: async (pixels) => {
    await getMouseMove(down(pixels))
    setMousePositionByX(-pixels)
  },
  mouse_right: async (pixels) => {
    await getMouseMove(right(pixels))
    setMousePositionByY(pixels)
  },
  mouse_left: async (pixels) => {
    await getMouseMove(left(pixels))
    setMousePositionByY(-pixels)
  },
  mouse_position: async () => {
    const mousePositionByX = getMousePositionByX()
    const mousePositionByY = getMousePositionByY()

    return `mouse_position ${mousePositionByX}px,${mousePositionByY}px`
  },
}

export const handlerWebServer = async ({ frontData }: IHandlerWebServer) => {
  const [command, pixels = 0, additionalPixels = 0] = frontData.split(' ')

  console.log('command', command)
  if (ACTIONS_MOUSE_CLICK[command]) {
    const response = await ACTIONS_MOUSE_CLICK[command](Number(pixels), Number(additionalPixels))
    if (response) {
      return response
    }
  }
  return command
}
