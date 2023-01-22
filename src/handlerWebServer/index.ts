import { ACTIONS_MOUSE_CLICK } from './constants'

import { IHandlerWebServer } from '../interfaces'

export const handlerWebServer = async ({ frontData }: IHandlerWebServer) => {
  try {
    const [command, pixels = 0, additionalPixels = 0] = frontData.split(' ')

    let response
    if (ACTIONS_MOUSE_CLICK[command]) {
      response = await ACTIONS_MOUSE_CLICK[command](Number(pixels), Number(additionalPixels))
    }
    return response ?? command
  } catch (e) {
    console.log(e)
    return 'Error Web Socket'
  }
}
