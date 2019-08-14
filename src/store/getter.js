
export const singer = state => state.singer

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const playing = state => state.playing

export const currentIndex = state => state.currentIndex

export const currentsonger = (state) => {
  return state.playList[state.currentIndex] || {}
}
