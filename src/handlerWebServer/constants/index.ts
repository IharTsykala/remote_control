import { mouse_down, mouse_left, mouse_position, mouse_right, mouse_up } from '../move'
import { draw_circle, draw_rectangle, draw_square } from '../drag'
import { prnt_scrn } from '../printScreen'
import { IActionMouseClick } from '../../interfaces/actionMouse'

export const ACTIONS_MOUSE_CLICK: IActionMouseClick = {
  mouse_up,
  mouse_down,
  mouse_right,
  mouse_left,
  mouse_position,
  draw_square,
  draw_rectangle,
  draw_circle,
  prnt_scrn,
}
