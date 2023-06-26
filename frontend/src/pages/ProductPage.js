import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails,createProductReview } from '../components/actions/productAction'
import { useParams, useNavigate } from "react-router-dom"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../components/constants/productConstants'



export default function ProductPage() {

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();

  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin

  const productReview = useSelector(state =>state.productReview)
  const {loading:loadingProductReview,error:errorProductReview, success:successProductReview} = productReview

  
  const productDetails = useSelector(state =>state.productDetails)
  const {loading,error,product} = productDetails
 
  useEffect(()=>{
    window.scrollTo(0, 0)
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))
  
     },[dispatch,successProductReview])

  const addToCartHandler = () =>{
    navigate(`/cart/${product._id}?qty=${qty}`)
  }

  const submitHandler =(e) =>{
    e.preventDefault()
    dispatch(createProductReview(id,{rating,comment}))

  }




  
  return (
    <div>
    <Link to='/' className='btn btn-light my-3'>Go  Back</Link>
    {loading ? <Loader/>
    : error 
    ? <Message variant='danger'>{error}</Message>
    :(
      <div>
    <Row>
      <Col md={4}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>

      <Col md={5}>
        <ListGroup variant='flush' className='d-flex justify-content-center'>

          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>

          <ListGroupItem>
            <Rating value = {product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
          </ListGroupItem>

          <ListGroupItem >
            Price: Rs.{product.price}
          </ListGroupItem>

          <ListGroupItem className="d-flex align-items-center justify-content-center" >
            Description: {product.description}
          </ListGroupItem>

        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col>Price :</Col>
                <Col>
                <strong>Rs.{product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Status :</Col>
                <Col>
                {product.countInStock>0 ? "In Stock" : "Out of Stock"}
                </Col>
              </Row>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col >Qty :</Col>
                  <Col xs='auto' className='my-1'>
                  <Form.Control as='select' value={qty} onChange={(e) =>setQty(e.target.value)} >
                    {

                      [...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>{x+1}</option>
                      ))
                    }
                    </Form.Control>
                    </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0 } type='button'>Add to cart</Button>
            </ListGroupItem>

          </ListGroup>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <h4>Reviews</h4>
      
      {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
      <ListGroup variant='flush'>
        {product.reviews.map((review)=>(
          <ListGroup.Item key={review._id}>
          <strong>{review.name}</strong>
          <Rating value={review.rating} color='#f8e825' />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
      </ListGroup.Item>
        ))}
      
        <ListGroup.Item>
          <h4>Write a review</h4>

          {loadingProductReview && <Loader/>}
          {successProductReview && <Message variant='success'>Review Submitted</Message>}
          {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
          
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control 
                as='select'
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
                >
                <option value=''>Select...</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='comment'>
                <Form.Label>Review</Form.Label>
                <Form.Control as='textarea'
                row='5' value={comment} onChange={(e)=>setComment(e.target.value)}
                ></Form.Control>  
              </Form.Group>
              <Button variant='primary'
               disabled={loadingProductReview}
                type='submit' 
                className='float-right my-2'>
                Submit
              </Button>

            </Form>
          ):(
            <Message variant='info'>Please <Link to='/login'>Login to write a review</Link></Message>
          )}
        </ListGroup.Item>
      </ListGroup>
      </Col>
    </Row>

    </div>)

    }
    
    </div>
  )
}
 