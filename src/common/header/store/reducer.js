import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  searchList: [],
  searchPage: 1,
  searchTotalPage: 0
});

export default (state = defaultState, action) => {
  switch (action.type) {
    // 搜索框获得焦点
    case constants.SEARCH_FOCUS:
      // set 方法会结合之前 immutable 对象的值和设置的值，生成一个全新的对象
      return state.set('focused', true);
    // 搜索框失焦
    case constants.SEARCH_BLUR:
      return state.set('focused', false);
    // 更改 searchList
    case constants.CHANGE_LIST:
      return state.merge({
        searchList: action.data,
        searchTotalPage: action.totalPage
      });
    // 搜索框鼠标进入
    case constants.SEARCH_MOUSE_ENTER:
      return state.set('mouseIn', true);
    // 搜索框鼠标离开
    case constants.SEARCH_MOUSE_LEAVE:
      return state.set('mouseIn', false);
    // 搜索库换一批
    case constants.SEARCH_CHANGE_PAGE:
      return state.set('searchPage', action.page);
    default:
      return state;
  }
}