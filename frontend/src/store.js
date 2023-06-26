import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers,productDeleteReducers, productCreateReducers, productUpdateReducers, productReviewReducers, productTopRatedReducers } from './components/reducers/productReducers'
import { cartReducer } from './components/reducers/cartReducers'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateReducer,userListReducer,userDeleteReducer,userUpdateProfileReducer } from './components/reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer,orderPayReducer, myOrderListReducer, orderListReducer, orderDeliverReducer } from './components/reducers/orderReducers'



const reducer = combineReducers({
      productList:productListReducers,
      productDetails:productDetailsReducers,
      productCreate:productCreateReducers,
      productUpdate:productUpdateReducers,
      productDelete:productDeleteReducers,
      cart:cartReducer,
      userLogin:userLoginReducer,
      userRegister:userRegisterReducer,
      userList:userListReducer,
      userDetails:userDetailsReducer,
      userUpdate:userUpdateReducer,
      userDelete:userDeleteReducer,
      userUpdateProfile:userUpdateProfileReducer,
      orderCreate:orderCreateReducer,
      orderDetails:orderDetailsReducer,
      orderPay:orderPayReducer,
      myOrderList:myOrderListReducer,
      orderList:orderListReducer,
      orderDeliver: orderDeliverReducer,
      productReview:productReviewReducers, 
      topRatedProduct:productTopRatedReducers,


})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) :[]

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) :null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) :{}

const initialState = {
    cart : {cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    
    userLogin:{userInfo:userInfoFromStorage},
    
}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store