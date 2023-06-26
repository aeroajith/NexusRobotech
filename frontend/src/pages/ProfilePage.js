import React,{useEffect,useState} from 'react'
import { Form,Row,Col,Button,Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getUserDetails } from '../components/actions/userAction'
import { updateUserProfile } from '../components/actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../components/constants/userConstants'
import { myOrdersList } from '../components/actions/orderActions'


export default function ProfilePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisibility, setpasswordVisibility] = useState("password");
  const togglePassword =()=>{
    if(passwordVisibility==="password")
    {
      setpasswordVisibility("text")
     return;
    }
    setpasswordVisibility("password")
  }
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const myOrderList = useSelector(state => state.myOrderList)
  const {loading:loadingOrders, error:errorOrders,orders} = myOrderList



  useEffect(()=>{
    if(!userInfo){
          navigate('/login')
    }else{
        if(!user || !user.name || success || userInfo._id !== user._id ){
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(myOrdersList())

        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  },[dispatch,navigate,userInfo,user,success])

  const submitHandler = (e) =>{
    e.preventDefault()
    if (password !== confirmPassword){
        setMessage('Password did not match!')
    }else{
        dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password
        }))
    }
  }
  return (
    <Row>
        <Col md={4}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler} >
        <Form.Group controlId='name'className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'className='my-2'>
                <Form.Label> Password</Form.Label>
                <Form.Control
                type={passwordVisibility}
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                >
                </Form.Control>
                <div className="float-right mt-n1" onClick={togglePassword}>
                { passwordVisibility ==="password"? <i className="fa fa-eye-slash" aria-hidden="true"></i> :<i className="fa fa-eye" aria-hidden="true"></i> } 
                </div>
            </Form.Group>

            <Form.Group controlId='confirmpassword'className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type={passwordVisibility}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                
                >
                </Form.Control>
                <div className="float-right mt-n1" onClick={togglePassword}>
                { passwordVisibility ==="password"? <i className="fa fa-eye-slash" aria-hidden="true"></i> :<i className="fa fa-eye" aria-hidden="true"></i> } 
                </div>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-5'>
                Update
            </Button>

        </Form>
        </Col>


        <Col md={8}>
            <h2>My Orders</h2>
            {loadingOrders ? (<Loader/>
            ): errorOrders ? (<Message variant='danger'>{error}</Message>)
             :(
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>Rs.{order.totalPrice}</td>
                                <td>{order.isPaid ? (<i className="fas fa-check" aria-hidden="true" style={{color:'green'}}></i> ):(
                                <i className='fas fa-times' style={{color:'red'}}></i>)
                                }</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
             )}
        </Col>

    </Row>
  )
}
