import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SearchBox() {
    const location = useLocation()
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) =>{
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(navigate(location.pathname))
        }
    }
  return (
    <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
  )
}