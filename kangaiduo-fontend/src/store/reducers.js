import { combineReducers } from 'redux';

//药品列表
const drugsListReducer =  (state = [], action) => {
    switch (action.type) {
      case 'SHOW_DRUGS_LIST':
        return action.drugsList
      case 'SEARCH_DRUGS':
        return action.drugsList
      case 'DELETE_DRUGS':
        return state.filter((item) => {
            return  item.key !== action.goodsId
        })
      default:
        return state
    }
  }


//modal状态
const modalReducer = (state=false,action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.showModal
    case 'HIDDEN_MODAL':
      return action.showModal
    default:
      return state
  }
}

const reducers = combineReducers({ //通过combineReducers合并多个reducer
  drugslist: drugsListReducer,
  isShowModal: modalReducer
})

export default reducers