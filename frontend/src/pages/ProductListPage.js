import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import swal from 'sweetalert'
import { Table,Button,Row,Col } from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from '../components/Paginate'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { listProducts,deleteProduct,createProduct } from '../components/actions/productAction'
import { PRODUCT_CREATE_RESET } from '../components/constants/productConstants'

export default function ProductListPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const productList = useSelector(state =>state.productList)
    const {loading,error,products,pages,page} = productList

    const productCreate = useSelector(state =>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate, product:createdProduct} = productCreate
    
    const productDelete = useSelector(state =>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    
    let keyword = location.search


    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(! userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }

    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,keyword])

    const deleteHandler =(id) =>{
        //pop up
        swal({
            title: "Are you sure want to delete?",
            text: "You will not able to recover this product!", 
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Product has been successfully deleted!", {
              icon: "success",
            });
            dispatch(deleteProduct(id))
           
          } else {
            swal("Product is safe!");
         } })
        }
    const createProductHandler=() =>{
        dispatch(createProduct())


    }

  return (
    <div>
        <Row className='align-items-center'>
            
            <Col className='text-right'></Col>
            <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i> Create Product</Button>
        </Row>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


        <h2>Product List</h2> 
        {loading ?( <Loader/> ):error ?( <Message variant='danger'>{error}</Message>)

        :( <div>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                    </tr>
                    
                </thead>

                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>Rs.{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                       

                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                            </LinkContainer>
                            {""}
                            <Button variant='danger'
                            onClick={()=> deleteHandler(product._id)}
                            className='btn-sm mx-2'>
                                    <i className='fas fa-trash'></i>
                                    </Button>
                        </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
        )}
    </div>
  )
}
