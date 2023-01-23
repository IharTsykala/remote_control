import { mouse, Region, screen } from '@nut-tree/nut-js'
import Jimp from 'jimp'

import { getPosition } from '../../utils'

const SIZE_SCREEN = 200

export const prnt_scrn = async () => {
  const position = await mouse.getPosition()
  const [screenWidth, screenHeight] = [await screen.width(), await screen.height()]

  const leftPosition = getPosition(screenWidth, position.x)
  const topPosition = getPosition(screenHeight, position.y)

  const region = new Region(leftPosition, topPosition, SIZE_SCREEN, SIZE_SCREEN)

  const imageGrab = await screen.grabRegion(region)
  const imgRGB = await imageGrab.toRGB()
  const imgJimp = await new Jimp(imgRGB)
  const imageBase64 = await imgJimp.getBase64Async(imgJimp.getMIME())
  const base64 = imageBase64.split('data:image/png;base64,').join('')

  return `prnt_scrn ${base64}`
}
