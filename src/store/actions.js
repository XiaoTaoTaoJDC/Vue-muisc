import * as types from './mutation-types'

export const selectPlay = ({commit, state}, {list, index}) => {
  // 点击获取播放列表数据
  commit(types.SET_PLAYLIST, list)
  // 点击设置大播放器
  commit(types.SET_FULL_SCREEN, true)
  // 设置当前播放的索引
  commit(types.SET_CURRENT_INDEX, index)
  // 设置当前播放状态播放OR暂停
  commit(types.SET_PLAYING_STATE, true)
}
