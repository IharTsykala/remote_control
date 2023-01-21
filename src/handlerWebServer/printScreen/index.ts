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

  const image = await screen.grabRegion(region)
  const imgRGB = await image.toRGB()
  const base64 = await Jimp.read(new Jimp(imgRGB)).then(async (img) => {
    const imageBase64 = await img.getBase64Async(img.getMIME())
    return imageBase64.split('data:image/png;base64,').join('')
  })
  console.log('base64', base64)
  return `prnt_scrn ${base64}`
}
