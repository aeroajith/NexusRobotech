import React,{useEffect} from 'react'
import { Row,Col,Button,ListGroup,Image,Card } from 'react-bootstrap'
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,Link } from "react-router-dom"
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../components/actions/orderActions'
import { ORDER_CREATE_RESET } from '../components/constants/orderConstants'


export default function PlaceOrderPage() {
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 500 ? 0: 50).toFixed(2)
    cart.taxPrice = Number((0.12)*cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    if(!cart.paymentMethod){
        navigate('/payment')
    }
    
    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[dispatch,success,navigate])
    
    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice

        }))
    }
  return (
    <div><CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping:</strong>
                        {cart.shippingAddress.address},{cart.shippingAddress.city},
                        {''}
                        {cart.shippingAddress.country}- {''}
                        {cart.shippingAddress.postalcode}
                        
                    </p>
                    <p>
                        <strong>Mobile No: </strong> {''}
                        {cart.shippingAddress.mobileNo}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Payment Through: </strong>
                        {cart.paymentMethod}
                        </p>


                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? (<Message>
                        Your cart is empty
                    </Message>)
                    :(<ListGroup variant='flush'>
                        {cart.cartItems.map((item,index) =>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={4}>
                                        {item.qty} X Rs.{item.price} = Rs.{(item.qty * item.price).toFixed(2)}
                                    </Col>



                                </Row>

                            </ListGroup.Item>
                        ))}

                    </ListGroup>)}
                    


                </ListGroup.Item>

            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>Rs.{cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>Rs.{cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>Rs.{cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>Rs.{cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='btn-block'
                        disabled={cart.items === 0}
                        onClick={placeOrder}
                        >
                            Place Order
                        </Button>
                    </ListGroup.Item>

                </ListGroup>

            </Card>
        </Col>
    </Row>
    
    
    
    </div>
  )
}
