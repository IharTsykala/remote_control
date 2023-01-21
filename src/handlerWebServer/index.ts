import { ACTIONS_MOUSE_CLICK } from './constants'
import { IHandlerWebServer } from '../interfaces/actionMouse'

export const handlerWebServer = async ({ frontData }: IHandlerWebServer) => {
  const [command, pixels = 0, additionalPixels = 0] = frontData.split(' ')

  if (ACTIONS_MOUSE_CLICK[command]) {
    const response = await ACTIONS_MOUSE_CLICK[command](Number(pixels), Number(additionalPixels))
    if (response) {
      return response
    }
  }
  return command
}
