import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const changeList = (data) => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
});

export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json')
      .then((res) => {
        const data = res.data;
        dispatch(changeList(data.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const searchMouseEnter = () => ({
  type: constants.SEARCH_MOUSE_ENTER
});

export const searchMouseLeave = () => ({
  type: constants.SEARCH_MOUSE_LEAVE
});

export const searchChangePage = (page) => ({
  type: constants.SEARCH_CHANGE_PAGE,
  page
});