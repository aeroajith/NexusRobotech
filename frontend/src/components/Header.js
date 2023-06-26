import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from './actions/userAction'
import SearchBox from './SearchBox'
import { useNavigate } from 'react-router-dom'
import { USER_LOGOUT } from './constants/userConstants'

export default function Header() {
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const{userInfo} = userLogin

  const cart = useSelector(state => state.cart)
    const {cartItems} = cart

  const dispatch = useDispatch()
  const logoutHandler = () =>{
    if(USER_LOGOUT){
      navigate('/login')
      dispatch(logout())
    }
    
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Nexus Robotech</Navbar.Brand>
            </LinkContainer>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/>
            <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                    <Nav.Link ><i className="fas fa-shopping-cart"></i>
                    Cart <Badge className='cartBadge' variant="info">{cartItems.length}</Badge>
                    </Nav.Link>
                    </LinkContainer>

                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                          <NavDropdown.Item >Profile</NavDropdown.Item>
                          </LinkContainer>
                           

                          
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          
                          
                        </NavDropdown>
                      ):(
                        <LinkContainer to='/login'>
                        <Nav.Link href='/login' ><i className="fas fa-user"></i>Login</Nav.Link>
                        </LinkContainer>
    
                      )}
                      
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="ADMIN" id='admin'>

                        <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item >Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item >Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item >Orders</NavDropdown.Item>
                        </LinkContainer>

                      </NavDropdown>
                      )}

                   
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

  )
}
