import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Form,Row,Col,Button } from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import { useNavigate, useLocation } from "react-router-dom"
import { register } from '../components/actions/userAction'

export default function RegisterPage() {
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

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] :'/'

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(()=>{
    if(userInfo){
          navigate(redirect)
    }


  },[navigate, userInfo, redirect])

  const submitHandler = (e) =>{
    e.preventDefault()
    if (password !== confirmPassword){
        setMessage('Password did not match!')
    }else{
        dispatch(register(name,email,password))
    }
  }
  return (
    <FormContainer>
         <h2>Register</h2>
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
                required
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
                required
                >
                </Form.Control>
                <div className="float-right mt-n1" onClick={togglePassword}>
                { passwordVisibility ==="password"? <i className="fa fa-eye-slash" aria-hidden="true"></i> :<i className="fa fa-eye" aria-hidden="true"></i> } 
                </div>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-4 float-right'>
                Register
            </Button>

        </Form>

        <Row className='py-0 mt-5'>
            <Col>
            Already Registered ? <Link 
            to={redirect ? `/login?redirect=${redirect}`:`/login`}>Sign In</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}
