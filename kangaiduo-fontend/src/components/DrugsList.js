import React, { Component } from 'react';
import { Table,Button,message,Input } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddModal from './AddModal';

const Search = Input.Search;

const columns = [{
  title: '药品名称',
  className: 'drugsName',
  dataIndex: 'drugsName',
}, {
  title: '药品图片',
  className: 'drugsImg',
  dataIndex: 'drugsImg',
}, {
  title: '药品描述',
  className: 'drugsDescribe',
  dataIndex: 'drugsDescribe',
},{
  title: '药品价格',
  className: 'drugsPrice',
  dataIndex: 'drugsPrice',
},
{
  title: '药品类型',
  className: 'drugsType',
  dataIndex: 'drugsType',
},
{
  title: '添加时间',
  className: 'create_time',
  dataIndex: 'create_time',
},{
  title: '操作',
  className: 'action',
  dataIndex: 'action',
}];


//挂载属性drugsList
const mapStateToProps = (state) => {
  //console.log(state)
  return {
    drugsList: state.drugslist,
    isShowModal: state.isShowModal
  }
}

//删除功能
const deleteGoods = (goodsId) => {
  axios({
    method:'GET',
    url:'/api/drugs/remove/'+goodsId
  })
  .then((res) => {
    message.success(res.data.message);
    DrugsList.dispatch({
        type:'DELETE_DRUGS',
        goodsId
    })
  })
}

//挂载加载药品list方法 loadDrugsData
const mapDispatchToProps = (dispatch) => {
  DrugsList.dispatch= (action) => {
    dispatch(action)
  }
  return { 
    //渲染列表
    loadDrugsData: () => {
      //drugsList
       dispatch(() => {
        axios({
          method:'GET',
          url:'/api/drugs/list'
        })
        .then((res) => {
          //console.log(res.data.data);
          dispatch({
              type: 'SHOW_DRUGS_LIST',
              drugsList: res.data.data.map(({_id, drugsName, drugsImg, drugsDescribe, drugsType,create_time,drugsPrice}) => ({
                key: _id,
                drugsName,
                drugsImg:<img src={"http://localhost:9000/uploads/"+drugsImg} width="60" height="60" alt=""/>,
                drugsDescribe,
                drugsType,
                drugsPrice,
                create_time,
                action:<span><Button type="primary" >编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="danger"  onClick={() => deleteGoods(_id)}>删除</Button></span>
              }))
            })
        })
            
      })
    },

    //搜索功能
    handleDoSearch: (value) => {
      dispatch(() => {
        console.log(value);
        axios({
          method:'POST',
          url:'/api/drugs/search',
          data:{
            keywords:value
          }
        })
        .then((res) => {
           // console.log(res);
            dispatch({
              type: 'SEARCH_DRUGS',
              drugsList: res.data.data.map(({_id, drugsName, drugsImg, drugsDescribe, drugsType,create_time,drugsPrice}) => ({
                key: _id,
                drugsName,
                drugsImg:<img src={"http://localhost:9000/uploads/"+drugsImg} width="60" height="60" alt=""/>,
                drugsDescribe,
                drugsType,
                drugsPrice,
                create_time,
                action:<span><Button type="primary" >编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="danger"  onClick={() => deleteGoods(_id)}>删除</Button></span>
              }))
            })
        })       
        })
    },

    //显示模态框
    showModal:() => {
      dispatch({
        type:"SHOW_MODAL",
        showModal:true,   
      })
    },

    //隐藏模态框：
    hiddenModal:() => {
      dispatch({
        type:"HIDDEN_MODAL",
        showModal:false,   
      })
    }
  }
}

// DrugsList组件
class DrugsList extends Component {
  static contextTypes = { //1.传入store并且检验
    store: PropTypes.object
  }
  constructor(props, context) {
    super(props)
    this.state = {
      isShowState:false
    }
  }

  componentWillMount() {
    this.props.loadDrugsData();
  }

  render(){
      return(
          <div>
            <div className="add-and-search"> 
              <Button type="primary" icon="file-add" onClick={this.props.showModal}>添加药品</Button> 
              <AddModal isShowModal = {this.props.isShowModal}  hiddenModel = {this.props.hiddenModal}  reloadListPage= {this.props.loadDrugsData}/>
              <Search
                placeholder="搜索药品"
                style={{ width: 200 }}
                onSearch={(value) => this.props.handleDoSearch(value)}
              />
            </div>  
             <Table
              columns={columns}
              dataSource={this.props.drugsList}
              pagination={{
                defaultPageSize: 3
              }}
              bordered
              title={() => '药品'}
          />
          </div>
         
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugsList);