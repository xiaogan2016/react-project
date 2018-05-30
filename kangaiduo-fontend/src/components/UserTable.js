import React, { Component } from 'react';

import { Table,Button } from 'antd';

const columns = [{
  title: '用户名',
  className: 'username',
  dataIndex: 'username',
}, {
  title: '密码',
  className: 'password',
  dataIndex: 'password',
}, {
  title: '加入时间',
  className: 'create_time',
  dataIndex: 'create_time',
},{
  title: '操作',
  className: 'action',
  dataIndex: 'action',
}];

const data = [{
  key: '1',
  username: 'John Brown',
  password: '￥300,000.00',
  create_time: 'New York No. 1 Lake Park',
  action:<Button type="danger">删除</Button>
}];

class UserTable extends Component {
    render(){
        return(
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => '普通用户成员'}
            />
        )
    }
}

export default UserTable