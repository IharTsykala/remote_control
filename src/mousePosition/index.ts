let x_mouse_position = 0

let y_mouse_position = 0

export class MousePosition {
  setMousePositionByX(pixels: number) {
    x_mouse_position = x_mouse_position + pixels
  }

  setMousePositionByY(pixels: number) {
    y_mouse_position = y_mouse_position + pixels
  }

  getMousePositionByX() {
    return x_mouse_position
  }

  getMousePositionByY() {
    return y_mouse_position
  }

  clearPositions() {
    x_mouse_position = 0
    y_mouse_position = 0
  }
}
