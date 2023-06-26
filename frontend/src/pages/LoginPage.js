import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Form,Row,Col,Button } from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import {  useNavigate, useLocation } from "react-router-dom"
import { login } from '../components/actions/userAction'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisibility, setpasswordVisibility] = useState("password");
  const togglePassword =()=>{
    if(passwordVisibility==="password")
    {
      setpasswordVisibility("text")
     return;
    }
    setpasswordVisibility("password")
  }
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] :'/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(()=>{
    if(userInfo){
          navigate(redirect)
    }


  },[navigate, userInfo, redirect])

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(login(email,password))
  }
  
  return (
    <FormContainer>
        <h2>Sign In</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler} >
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
              <div className='pass-wrapper'>
            
                <Form.Label>Password</Form.Label>
                <Form.Control
                type={passwordVisibility}
                name="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                >
                   
                </Form.Control>
                <div className="float-right mt-n1" onClick={togglePassword}>
                { passwordVisibility ==="password" ? <i className="fa fa-eye-slash" aria-hidden="true"></i> :<i className="fa fa-eye" aria-hidden="true"></i> } 
                </div>
          
               
               
                </div>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-4 float-right'>
                Sign In
            </Button>
        </Form>

        <Row className='py-0 mt-5'>
            <Col>
            New Customer ? <Link 
            to={redirect ? `/register?redirect=${redirect}`:`/register`}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
