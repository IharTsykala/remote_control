import { Button, down, left, mouse, Point, right, up } from '@nut-tree/nut-js'

// import { IGetMouseDrag } from '../../interfaces'

export const getMouseDrag: any = (direction: any) => mouse.drag(direction)

export const draw_rectangle = async (pixels: number, additionalPixels = 100) => {
  await getMouseDrag(right(additionalPixels))
  await getMouseDrag(down(pixels))
  await getMouseDrag(left(additionalPixels))
  await getMouseDrag(up(pixels))
}

export const draw_square = async (pixels: number) => {
  // await getMouseDrag(right(pixels))
  // await getMouseDrag(down(pixels))
  // await getMouseDrag(left(pixels))
  // await getMouseDrag(up(pixels))
  await draw_rectangle(pixels, pixels)
}

export const draw_circle = async (radius = 2) => {
  const currentPosition = await mouse.getPosition()
  const nextPosition = new Point(currentPosition.x, currentPosition.y)
  let x_position = 0
  let y_position = 0

  const drawCircle = async (angle: number) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0)
    })

    if (angle === 0.05) {
      await mouse.pressButton(Button.LEFT)
    }
    x_position = radius * Math.cos((angle * Math.PI) / 180)
    y_position = radius * Math.sin((angle * Math.PI) / 180)
    nextPosition.x = currentPosition.x + x_position
    nextPosition.y = currentPosition.y + y_position
    await mouse.setPosition(nextPosition)
  }

  for (let i = 0; i < 360; i += 0.05) {
    await drawCircle(i)
  }
  await mouse.releaseButton(Button.LEFT)
}
