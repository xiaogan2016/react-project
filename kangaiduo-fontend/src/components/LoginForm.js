import React, { Component } from 'react';

//存token
import WebStorageCache from 'web-storage-cache';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;



class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          this.props.form.setFieldsValue({
            role: 1,
          });
          let data = this.props.form.getFieldsValue();
          console.log(data)
          if (!err) {
            fetch('/api/users/signin',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if(res.data.success){
                      //将用户信息存到localstorge
                      let wsCache = new WebStorageCache();
                      wsCache.set('token', res.data.token, {exp : 1000 * 3600});
                      wsCache.set('username', res.data.username, {exp : 1000 * 3600});
                      message.success(res.message);
                      console.log(this)
                      this.props.history.push('/home')
                }else{
                    message.warning(res.message)
                }
            })
          }
        });
      }
    render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
            })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入用户名" />
            )}
        </FormItem>

        <FormItem>
            {getFieldDecorator('role', {
                initialValue:1
            })(
            <Input type="hidden" />
            )}
        </FormItem>

        <FormItem>
            {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
            })(
            <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot">忘记密码</a><br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
            立即登陆
            </Button>
            <a href="#/regist">去注册</a>
        </FormItem>
        </Form>
    );
    }
    
}

export default Form.create()(LoginForm);