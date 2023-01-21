import { down, left, mouse, right, up } from '@nut-tree/nut-js'

// import { IGetMouseMove } from '../../interfaces'
import { MousePosition } from '../../mousePosition'

const { setMousePositionByX, setMousePositionByY, getMousePositionByX, getMousePositionByY } = new MousePosition()

export const getMouseMove: any = (direction: any) => mouse.move(direction)

export const mouse_up = async (pixels: number) => {
  await getMouseMove(up(pixels))
  setMousePositionByX(pixels)
}

export const mouse_down = async (pixels: number) => {
  await getMouseMove(down(pixels))
  setMousePositionByX(-pixels)
}

export const mouse_right = async (pixels: number) => {
  await getMouseMove(right(pixels))
  setMousePositionByY(pixels)
}

export const mouse_left = async (pixels: number) => {
  await getMouseMove(left(pixels))
  setMousePositionByY(-pixels)
}

export const mouse_position = async () => {
  const mousePositionByX = getMousePositionByX()
  const mousePositionByY = getMousePositionByY()

  return `mouse_position ${mousePositionByX}px,${mousePositionByY}px`
}
