import React,{useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../components/actions/cartActions'


export default function CartScreen() {
    const { id } = useParams();
    const productId = id
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
   
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }

    },[dispatch, productId, qty])


    const removeFromCartHandler = (id) =>{

        dispatch(removeFromCart(id))


    }

    const checkoutHandler = () =>{
        navigate('/shipping')

    }



  return (
    <div>
        <Row >
            <Col md={8}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <Message variant='info'>Your cart is empty
                    <Link className='px-5' to = '/'> Go back </Link>
                </Message>
            ):(
                <ListGroup variant='flush'>
                    {cartItems.map(item =>(
                        <ListGroup.Item key={item.product}>
                          <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                             
                            <Col md={3}>
                            <Link to ={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            
                            <Col md={2}>
                                Rs. {item.price}

                            </Col >

                            <Col md={3}>

                            <Form.Control as='select' 
                            value={item.qty} 
                            onChange={(e) =>dispatch(addToCart(item.product, Number(e.target.value)))} >
                                     {

                                            [...Array(item.countInStock).keys()].map((x)=>(
                                            <option className='bg-dark' key={x+1} value={x+1}>{x+1}</option>
                                            ))
                                    }
                             </Form.Control>

                            </Col>

                            <Col md={1}>
                                <Button type='button' variant='light'
                                onClick={()=> removeFromCartHandler(item.product)}
                                
                                >
                                    <i className='fas fa-trash'></i>

                                </Button>
                            </Col>

                          </Row>
                        </ListGroup.Item>

                    ))}

                </ListGroup>
            )}
            </Col>

            <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Sub Total({cartItems.reduce((acc,item) => acc + item.qty, 0)}) Items</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Unit Price:</Col>
                            <Col> Rs.{cartItems.reduce((acc,item) => acc + item.price, 0)}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Quantity:</Col>
                            <Col>{cartItems.reduce((acc,item) => acc + item.qty, 0)} Nos</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price:</Col>
                            <Col>Rs.{cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                   

                    {!userInfo ? (<Link className='px-5 rm-bordor' to = '/login'>
                    <Message variant='warning text-center cursor my-2 ' >Please login to continue</Message>
                    </Link> 
                    ):(

                     <ListGroup.Item>
                        <Button type='button'
                         className='btn-block'
                         disabled={cartItems.length === 0}
                         onClick={checkoutHandler}
                         >

                          Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                    )}
                    </ListGroup>
                   </Card>

            </Col>
        </Row>
    </div>
  )
}
