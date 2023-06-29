import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Row,Col,ListGroup,Image,Card,Button } from 'react-bootstrap'
import Loader from "../components/Loader"
import swal from 'sweetalert';
import { PayPalButton } from 'react-paypal-button-v2'
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,Link,useParams } from "react-router-dom"
import { getOrderDetails, payOrder, deliverOrder } from '../components/actions/orderActions'
import { ORDER_PAY_RESET } from '../components/constants/orderConstants'
import { ORDER_DELIVER_RESET } from '../components/constants/orderConstants';



export default function OrdersPage() {
    const { id } = useParams();
    const orderId = id

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails
    
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver} = orderDeliver

    

    const navigate = useNavigate()
    if(!loading && !error){
      
        order.totalPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
        var totalPrice = parseInt((Number(order.totalPrice) + Number(order.shippingPrice) + Number(order.taxPrice)).toFixed(2))
    }
  
    
     //Razorpay Payment
     function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    
    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Failure loading the Razorpay SDK. PLease make sure you are connected to the internet')
			return
        }
    
    
    const orderData = await axios.put(`/api/orders/${id}/pay/`)
    const {orderId } = orderData.data
    

    const options = {
        key: "rzp_test_yPeOCOEUY7ILdw", // Enter the Key ID generated from the Dashboard
        amount: totalPrice * 100,
        currency: "INR",
        name: 'Nexus Robotech',
        description: 'Its is an ecommerce company to sale groceries',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        order_id:orderId,
        
        handler: async function (response) {
            swal({
                title: "Payment Success",
                text: "Your Payment ID:"+response.razorpay_payment_id,
                icon: "success",
                confirmButtonText: "OK",
              });
            navigate('/profile')
 
        },
        prefill: {
            name: 'Ajith Kumar',
            contact: '6369600227',
            email: 'nexusrobotech2022@gmail.com'
        },
        notes: {
            address: '3/199, Anumandhanoor village, Thokkiyam Post, Thirupathur Tk&Dt - 635901'
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}


    

    //Paypal Scripts
     const addPayPalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AYarabvQywJ6NpmHVyF0ffUP0Go1OgtcIn5nAYN_KRkEUVbYf6QeVml3pE2XTQ2NiwVBiQceZBU_VsF-"
        script.async = true
        script.onload = ()=>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
     }

     //Paypal scripts 
    
    
    useEffect(()=>{
        if (!userInfo) {
            navigate('/login')
        }


        if(!order || successPay || order._id !==Number(orderId) || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()  
                
            }else{
                setSdkReady(true)
            }
        }
        
         
    },[dispatch,navigate,userInfo,order,orderId, successPay,successDeliver])

 
    const successpaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId, paymentResult))

    }

    const successDeliverHandler = () =>{
        dispatch(deliverOrder(order))

    }
  return (

    loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) :(
    <div>
        <h1>Order:{order._id}</h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name:</strong>{order.user.name}</p>
                    <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p><strong>Mobile No:</strong>{order.shippingAddress.mobileNo}</p>
                    <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address},{order.shippingAddress.city},
                        {''}
                        {order.shippingAddress.country}-{order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (<Message variant='success'>Delivered On {(order.deliveredAt).substring(0,10)}</Message>
                     ):(<Message variant='warning'>Not Delivered</Message>)}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Payment Through: </strong>
                        {order.paymentMethod}
                        </p>
                     {order.isPaid ? (<Message variant='success'>Paid on {(order.paidAt).substring(0,10)}</Message>
                     ):(<Message variant='warning'>Not Paid</Message>)}

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (<Message>
                        Your order is empty
                    </Message>)
                    :(<ListGroup variant='flush'>
                        {order.orderItems.map((item,index) =>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={6}>
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
                            <Col>Rs.{order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>Rs.{order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>Rs.{order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>Rs.{totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {(() => {
                                if (!order.isPaid && order.paymentMethod === 'Paypal' ) {
                                return (
                                    <PayPalButton
                                amount = {totalPrice}
                                onSuccess={successpaymentHandler}
                                
                                />
                                )
                                } else if (!order.isPaid && order.paymentMethod === 'Razorpay') {
                                return (
                                    <Button className='btn-md'
                                    onClick={displayRazorpay}
                                    >Pay with Razorpay</Button>
                                )
                                } else if (!order.isPaid && order.paymentMethod === 'Cash on Delivery') {
                                return (
                                    <div>
                                        <p className='codtext'>Cash on Delivery</p>
                                    </div>
                                )
                                } else {
                                return (
                                    ""
                                )
                                }
                            })()}

                </ListGroup>
                 {loadingDeliver && <Loader/>}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block'
                        onClick={successDeliverHandler}
                        >Mark As Delivered</Button>
                    </ListGroup.Item>
                )}

            </Card>
        </Col>
    </Row>
    
    
    
    </div>
  ))
}

