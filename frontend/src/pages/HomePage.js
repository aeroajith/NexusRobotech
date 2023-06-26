import React,{useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../components/actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousal from '../components/ProductCarousal'

 
export default function HomePage() {
    
    let location = useLocation()
    const dispatch = useDispatch()
    let keyword = location.search
   

    const productList =  useSelector (state => state.productList)
    const {error, loading,products,page,pages} = productList

    useEffect(()=>{

        dispatch(listProducts(keyword))

    },[dispatch, keyword])
    
        
  return (
    <div> {!keyword && <ProductCarousal/>}
           
            <h2>Latest Products</h2>
            {loading ? <h6><Loader/></h6>
            : error ? <Message variant='danger'>{error}</Message>
            :
            <div >
            <Row>
                {products.map(product => (
                <Col className='card' key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product} />
             </Col>
            ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}/>
            </div>
                        
            
        }
            
        </div>

  )
}
