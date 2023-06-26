import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import { useNavigate} from "react-router-dom"
import { saveShippingAddress } from '../components/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingPage() {
  const cart = useSelector(state =>state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [country, setCountry] = useState(shippingAddress.country)
  const [mobileNo, setMobileNo] = useState(shippingAddress.mobileNo)
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(saveShippingAddress({address,city,country,postalcode,mobileNo}))
      navigate('/payment')

  }
    
  return (
    <React.Fragment>
    <FormContainer>
      
      <CheckoutSteps step1 step2 />
      
      
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler} className='my-0'>
        <Form.Group controlId='address'  className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address ? address :""}
                onChange={(e)=>setAddress(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={city ? city :""}
                onChange={(e)=>setCity(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

        <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country ? country : ""}
                onChange={(e)=>setCountry(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

        <Form.Group controlId='mobileNo' className='my-2'>
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                type='number'
                placeholder='Enter Mobile No'
                value={mobileNo ? mobileNo : ""}
                onChange={(e)=>setMobileNo(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>


        <Form.Group controlId='postalcode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Postal Code'
                value={postalcode ? postalcode : ""}
                onChange={(e)=>setPostalcode(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' className='mt-3 float-right' variant='primary'>
                Continue
            </Button>

      </Form>
    </FormContainer>
    </React.Fragment>
  )
}
