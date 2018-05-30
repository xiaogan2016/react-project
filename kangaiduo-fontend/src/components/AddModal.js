import React, { Component } from 'react';
import { Modal, Form, Select, Upload, Icon, Input, Button, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class AddModel extends Component {
    constructor(props) {   
        super(props)
        this.state = {
          previewImage: '',
          fileList: [],
          previewVisible: false,
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        console.log(data)
        fetch('/api/drugs/add',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((res) => {
            message.success(res.message); 
            //console.log(this.props);
            this.props.form.resetFields();
            this.props.hiddenModel();
            this.props.reloadListPage();
          })
    }
    
    handlePreview = (file) => {
    this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
    });
    }


    handleChange = ({ fileList }) => this.setState({ fileList })
    
    render(){
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传</div>
            </div>
          );
          const { previewVisible, previewImage} = this.state;
          const { getFieldDecorator } = this.props.form;
        return(
            <Modal title="添加药品"
            visible={this.props.isShowModal}
            footer={null}
          >
            <div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                        药品名称：
                        {getFieldDecorator('drugsName')(
                        < Input type="text" placeholder="请输入药品名称" />
                        )}
                </FormItem>
                <FormItem>
                        药品图片：
                        <div className="clearfix">
                          <Upload
                            name="drugsImg"
                            action="/api/drugs/add"
                            listType="picture-card"
                            fileList={this.state.fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                          >
                            {this.state.fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '80%' }} src={previewImage} />
                          </Modal>
                        </div>
                </FormItem>
                <FormItem>
                        药品描述：
                        {getFieldDecorator('drugsDescribe')(
                        < Input type="text" placeholder="药品描述" />
                        )}
                </FormItem>
                <FormItem>
                        药品价格：
                        {getFieldDecorator('drugsPrice')(
                            < Input type="text" placeholder="药品价格：格式：XXX元/件" /> 
                        )}
                </FormItem>
                <FormItem>
                        药品类型：
                        {getFieldDecorator('drugsType')(
                        <Select  style={{ width: 90 }} initialValue="皮肤科药品">
                            <Option value="皮肤科药品">皮肤科药品</Option>
                            <Option value="精神科药品">精神科药品</Option>
                            <Option value="呼吸科药品" >呼吸科药品</Option>
                            <Option value="眼科药品">眼科药品</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem>
                 <Button onClick = {this.props.hiddenModel}>取消</Button> <Button type="primary"  htmlType="submit">添加药品</Button>
                 </FormItem>
              </Form>
            </div>

          </Modal>
        )
    }
}

export default Form.create()(AddModel);