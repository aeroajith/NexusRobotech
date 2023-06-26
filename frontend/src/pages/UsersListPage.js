import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import swal from 'sweetalert'
import { Table,Button } from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { listUsers, deleteUsers } from '../components/actions/userAction'

export default function UsersListPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state =>state.userList)
    const {loading,error,user} = userList

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state =>state.userDelete)
    const {success, successDelete} = userDelete



    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            
            dispatch(listUsers())
        }else{
            navigate('/login')
        }

    },[dispatch,navigate,successDelete,userInfo])

    const deleteHandler =(id) =>{
        //pop up
        swal({
            title: "Are you sure want to delete?",
            text: "You will not able to recover this user", 
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! user has been successfully deleted!", {
              icon: "success",
            });
            dispatch(deleteUsers(id))
            window.location.reload(false);
          } else {
            swal("User is safe!");
         } })
        }


  return (
    <div>
        <h2>Users List</h2> 
        {loading ?( <Loader/> ):error ?( <Message variant='danger'>{error}</Message>)

        :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    </tr>
                    
                </thead>

                <tbody>
                    {user.map(user=>(
                        <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ?(
                            <i className='fas fa-check' style={{color:'green'}}></i>
                        ):(
                            <i className='fas fa-times' style={{color:'red'}}></i>
                        )}</td>

                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                            </LinkContainer>
                            {""}
                            <Button variant='danger'
                            onClick={()=> deleteHandler(user._id)}
                            className='btn-sm mx-2'>
                                    <i className='fas fa-trash'></i>
                                    </Button>
                        </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        )}
    </div>
  )
}
