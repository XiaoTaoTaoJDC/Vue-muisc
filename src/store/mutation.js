import * as types from './mutation-types'

const mutation = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_FULL_SCREEN] (state, flg) {
    state.fullScreen = flg
  },
  [types.SET_PLAYING_STATE] (state, flg) {
    state.playing = flg
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}
export default mutation
