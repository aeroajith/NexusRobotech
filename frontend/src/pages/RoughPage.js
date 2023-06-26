import React from 'react'
import swal from 'sweetalert';

export default function RoughPage() {

    const alert = () =>{
        swal({
            title: "Payment Success",
            text: "Your Payment ID: PAYIBM01012929",
            icon: "success",
            confirmButtonText: "OK",
          });
    }
  return (
    <div>RoughPage
        
         <br/>
        <button className='btn-sm' onClick={alert}>Alert</button>
    </div>
  )
}
