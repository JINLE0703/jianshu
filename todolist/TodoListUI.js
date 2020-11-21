import React, { Component } from 'react';
import { Input, Button, List } from 'antd';

class TodoListUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ margin: '30px' }}>
        <div>
          <Input
            value={this.props.inputValue}
            placeholder="todo info"
            style={{ width: '300px', marginRight: '15px' }}
            onChange={this.props.handleInputChange}
          />
          <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
        </div>
        <List
          bordered
          dataSource={this.props.list}
          renderItem={(item, index) => (
            <List.Item onClick={() => { this.props.handleItemClick(index) }}>
              {item}
            </List.Item>
          )}
          style={{ width: '300px', marginTop: '15px' }}
        />
      </div>
    )
  }
}

export default TodoListUI;