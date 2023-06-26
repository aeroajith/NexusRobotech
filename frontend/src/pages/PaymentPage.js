import React,{useState} from 'react'
import { Form,Col,Button,Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import { useNavigate } from "react-router-dom"
import { savePaymentMethod } from '../components/actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentPage() {
    const cart = useSelector(state =>state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col className='mt-2'>
                <Form.Check 
                type='radio'
                label = 'Cash on Delivery'
                id='cashondelivery'
                name="paymentMethod"
                value='Cash on Delivery'
                onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                </Form.Check>
                </Col>

                <Col className='mt-2'>
                
                <Form.Check
                type='radio'
                label = 'Paypal or Credit Card'
                id='paypal'
                name="paymentMethod"
                value='Paypal'
                onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                
                </Form.Check>
                {paymentMethod === 'Paypal' ? (<>
      {[
        'Info',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '28rem' }}
          className="mb-2 my-2"
        >
          <Card.Header className='text-center'>Paypal Payment</Card.Header>
          <Card.Body>
            <Card.Title className='text-center'> Supported Payment Methods </Card.Title>
            <Card.Text className='text-center'>
            Pay with all your international accounts from all over the world
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
     ):""}
                
                </Col>

                <Col className='mt-2'>
                <Form.Check
                type='radio'
                label = 'Razorpay'
                id='razorpay'
                name="paymentMethod"
                value='Razorpay'
                onChange={(e)=>setPaymentMethod(e.target.value)}
                >

                </Form.Check>
                {paymentMethod === 'Razorpay' ? ( <>
      {[
        'Info',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '28rem' }}
          className="mb-2 my-2"
        >
          <Card.Header className='text-center'>Razorpay Payment</Card.Header>
          <Card.Body>
            <Card.Title className='text-center'> Supported Payment Methods </Card.Title>
            <Card.Text className='text-center'>
            Phonepe, Google pay, Paytm, Internetbanking, Credit or Debit cards
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
                ):""}

                </Col>

                
            </Form.Group>

            <Button className='mt-2' type='submit' variant='primary'>
                Continue
            </Button>

        </Form>

    </FormContainer>
  )
}
