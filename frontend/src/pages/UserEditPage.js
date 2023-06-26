import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Form,Button} from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import { useNavigate,useParams } from "react-router-dom"
import { getUserDetails,updateUsers } from '../components/actions/userAction'
import { USER_UPDATE_RESET } from '../components/constants/userConstants'

export default function UserEditPage() {
  const {id} = useParams()
  const userId = id
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { error:errorUpdate, loading:loadingUpdate,success:successUpdate } = userUpdate
 

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      navigate('/admin/userlist')
    }else{

    
    if (!user.name || user._id !== Number(userId)) {
              dispatch(getUserDetails(userId))
          } else {
              setName(user.name)
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
          }
      }},

   [user, userId, successUpdate, navigate])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUsers({_id:user._id,name,email,isAdmin}))
      
  }

  return (
      <div>
        
          <Link to='/admin/userlist'>
              Go Back
          </Link>
          

          <FormContainer>
          <h2>Edit User</h2>
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

                          <Form.Group controlId='email'className='my-2'>
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                  type='email'
                                  placeholder='Enter Email'
                                  value={email}
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                              >
                              </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='isadmin'className='my-3'>
                              <Form.Check
                                  type='checkbox'
                                  label='Is Admin'
                                  checked={isAdmin}
                                  onChange={(e) => setIsAdmin(e.target.checked)}
                              >
                              </Form.Check>
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

