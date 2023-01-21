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
  Region,
} from '@nut-tree/nut-js'
import { MousePosition } from '../mousePosition'
import Jimp from 'jimp'

interface IHandlerWebServer {
  frontData: string;
}

interface IGetMouseMove {
  (direction: Point[] | Promise<Point[]>): void;
}

type IGetMouseDrag = IGetMouseMove

const getMouseMove: IGetMouseMove = (direction) => mouse.move(direction)

const getMouseDrag: IGetMouseDrag = (direction) => mouse.drag(direction)

const { setMousePositionByX, setMousePositionByY, getMousePositionByX, getMousePositionByY } = new MousePosition()

interface I_ACTIONS_MOUSE_CLICK {
  [key: string]: (pixels: number, additionalPixels?: number) => Promise<string | void>;
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
  draw_square: async (pixels) => {
    await getMouseDrag(right(pixels))
    await getMouseDrag(down(pixels))
    await getMouseDrag(left(pixels))
    await getMouseDrag(up(pixels))
  },
  draw_rectangle: async (pixels, additionalPixels = 100) => {
    await getMouseDrag(right(additionalPixels))
    await getMouseDrag(down(pixels))
    await getMouseDrag(left(additionalPixels))
    await getMouseDrag(up(pixels))
  },
  draw_circle: async (radius = 2) => {
    const currentPosition = await mouse.getPosition()
    const nextPosition = new Point(currentPosition.x, currentPosition.y)
    let x_position = 0
    let y_position = 0
    const drawCircle = async (angle: number) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0)
      })

      if (angle === 0.1) {
        await mouse.pressButton(Button.LEFT)
      }
      x_position = radius * Math.cos((angle * Math.PI) / 180)
      y_position = radius * Math.sin((angle * Math.PI) / 180)
      nextPosition.x = currentPosition.x + x_position
      nextPosition.y = currentPosition.y + y_position
      await mouse.setPosition(nextPosition)
    }
    for (let i = 0; i < 360; i += 0.1) {
      await drawCircle(i)
    }
    await mouse.releaseButton(Button.LEFT)
  },
  prnt_scrn: async (pixels) => {
    const PART_SIZE = 200

    const countPosition = (dim: number, position: number) => {
      if (position - PART_SIZE / 2 < 0) {
        return 0
      } else if (position + PART_SIZE > dim) {
        return dim - PART_SIZE
      } else {
        return position - PART_SIZE / 2
      }
    }

    const position = await mouse.getPosition()
    const [screenWidth, screenHeight] = [await screen.width(), await screen.height()]
    const left = countPosition(screenWidth, position.x)
    const top = countPosition(screenHeight, position.y)
    const region = new Region(left, top, PART_SIZE, PART_SIZE)
    const image = await screen.grabRegion(region)
    const imgRGB = await image.toRGB()
    const base64 = await Jimp.read(new Jimp(imgRGB)).then(async (img) => {
      const imageBase64 = await img.getBase64Async(img.getMIME())
      return imageBase64.split('data:image/png;base64,').join('')
    })
    console.log('base64', base64)
    return `prnt_scrn ${base64}`
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
