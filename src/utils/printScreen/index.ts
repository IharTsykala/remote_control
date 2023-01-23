const SIZE_SCREEN = 200

export const getPosition = (screen: number, position: number) => {
  if (position - SIZE_SCREEN / 2 < 0) {
    return 0
  }
  if (position + SIZE_SCREEN > screen) {
    return screen - SIZE_SCREEN
  }
  return position - SIZE_SCREEN / 2
}
