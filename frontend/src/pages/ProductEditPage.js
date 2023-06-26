import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Form,Button} from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import { useNavigate,useParams } from "react-router-dom"
import { listProductDetails,updateProduct } from '../components/actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../components/constants/productConstants'


export default function ProductEditPage() {
  const {id} = useParams()
  const productId = id
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails


  const productUpdate = useSelector(state => state.productUpdate)
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate

  

   
 

  useEffect(() => {

    if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        navigate('/admin/productlist')
    }else{
        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
               }
    }
 },

   [dispatch, product, productId, navigate, successUpdate])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({_id:productId,name,price,image,brand,category,countInStock,description}))
      
  }


  const uploadFileHandler = async (e) =>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image',file)
    formData.append('product_id',productId)
    setUploading(true)

    try{
        const config = {
            headers:{
                'Content-type':'multipart/form-data'
            }
        }

        const{data} = await axios.post('/api/products/upload/',formData,config)
        setImage(data)
        setUploading(false)

    }catch(error){
        setUploading(false)
    }
  }
  

  return (
      <div>
        
          <Link to='/admin/productlist'>
              Go Back
          </Link>
          

          <FormContainer>
          <h2>Edit Product</h2>
          {loadingUpdate && <Loader/>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
           
               
              {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                  : (
                      <Form onSubmit={submitHandler}>

                          <Form.Group controlId='name'className='my-2'>
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                  type='name'
                                  placeholder='Enter name'
                                  value={name}
                                  required
                                  onChange={(e) => setName(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>


                          <Form.Group controlId='price'className='my-2'>
                              <Form.Label>Price</Form.Label>
                              <Form.Control
                                  type='number'
                                  placeholder='Enter Price'
                                  value={price}
                                  required
                                  onChange={(e) => setPrice(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>


                          <Form.Group controlId='image' className='my-2'>
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control
                                    type='file'
                                    label='Choose File'
                                    custom ='true'
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {uploading && <Loader />}

                            </Form.Group>


                          <Form.Group controlId='brand'className='my-2'>
                              <Form.Label>Brand</Form.Label>
                              <Form.Control
                                  type='text'
                                  placeholder='Enter Brand'
                                  value={brand}
                                  required
                                  onChange={(e) => setBrand(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='stock'className='my-2'>
                              <Form.Label>Count In Stock</Form.Label>
                              <Form.Control
                                  type='number'
                                  placeholder='Enter Stock'
                                  value={countInStock}
                                  required
                                  onChange={(e) => setCountInStock(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='category'className='my-2'>
                              <Form.Label>Category</Form.Label>
                              <Form.Control
                                  type='text'
                                  placeholder='Enter Category'
                                  value={category}
                                  required
                                  onChange={(e) => setCategory(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='description'className='my-2'>
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                  type='text'
                                  placeholder='Enter Description'
                                  value={description}
                                  required
                                  onChange={(e) => setDescription(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>

                          

                          <Button type='submit' variant='primary'className='my-2 float-right'>
                              Update
                      </Button>

                      </Form>
                  )}

          </FormContainer >
      </div>

  )
}

