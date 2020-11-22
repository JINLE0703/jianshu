import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store/';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  Container,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from './style';

class Header extends Component {
  constructor(props) {
    super(props);
    this.showSeachInfo = this.showSeachInfo.bind(this);
  }

  showSeachInfo() {
    const { focused, mouseIn, searchList, searchPage, searchTotalPage, handleSearchMouseEnter, handleSearchMouseLeave, handleSearchChangePage } = this.props;
    const newList = searchList.toJS();
    const pageList = [];

    if (newList.length) {
      for (let i = (searchPage - 1) * 10; i < searchPage * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleSearchMouseEnter}
          onMouseLeave={handleSearchMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => handleSearchChangePage(searchPage, searchTotalPage, this.spinIcon)}
            >
              <span
                ref={(icon) => { this.spinIcon = icon }}
                className="iconfont spin"
              >
                &#xe851;
              </span>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    const { focused, searchList, handleInputFocus, handleInputBlur } = this.props;
    return (
      <HeaderWrapper>
        <Container>
          <Logo href='/' />
          <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载APP</NavItem>
            <NavItem className='right'>登录</NavItem>
            <NavItem className='right'>
              <span className="iconfont">&#xe636;</span>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                in={focused}
                timeout={200}
                classNames="slide"
              >
                <NavSearch
                  className={focused ? 'focused' : ''}
                  onFocus={() => handleInputFocus(searchList)}
                  onBlur={handleInputBlur}
                  placeholder='搜索'
                >
                </NavSearch>
              </CSSTransition>
              <span
                className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}
              >
                &#xe682;
              </span>
              {this.showSeachInfo()}
            </SearchWrapper>
          </Nav>
          <Addition>
            <Button className='writting'>
              <span className="iconfont">&#xe61d;</span>
              写文章
              </Button>
            <Button className='reg'>注册</Button>
          </Addition>
        </Container>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    searchList: state.getIn(['header', 'searchList']),
    searchPage: state.getIn(['header', 'searchPage']),
    searchTotalPage: state.getIn(['header', 'searchTotalPage'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 搜索框获得焦点
    handleInputFocus(searchList) {
      searchList.size === 0 && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    // 搜索框失焦
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    // 搜索框鼠标进入
    handleSearchMouseEnter() {
      dispatch(actionCreators.searchMouseEnter());
    },
    // 搜索框鼠标离开
    handleSearchMouseLeave() {
      dispatch(actionCreators.searchMouseLeave());
    },
    // 搜索框换一批
    handleSearchChangePage(page, totalPage, spinIcon) {
      // spinIcon 添加旋转动画
      let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spinIcon.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

      if (page < totalPage) {
        dispatch(actionCreators.searchChangePage(page + 1));
      } else {
        dispatch(actionCreators.searchChangePage(1));
      }

    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);