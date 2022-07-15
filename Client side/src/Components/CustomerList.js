import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import style from './style.css'
function CustomerList({ customers, staff }) {
  const [allCustomer, setallCustomer] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const deleteCustomerURI = 'http://localhost:4000/admin/deleteCustomer'
  useEffect(() => {
    if (customers.length) {
      setallCustomer(() => {
        setisLoading(false)
         return customers 
        })
    } else {
      setisLoading(true)
    }
  }, [])
  const customerDlt=({customerId})=>{
    if(window.confirm(`Are you sure to delte this user! because the user data will be deleted permsnently from the our database?`)){
      axios.post(deleteCustomerURI, {customerId}).then((res)=>{
        if(res.data.status){
          window.location.reload()
        }else{
          alert(`${res.data.message}`)
        }
      })
    }
  }
  return (
    <div className='cont_fluid px-3 text-center'>
      <h2 className='card-header text-center'>Registered Customers List</h2>
      {
        isLoading ? <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> :
          <table class="table table-hover">
            <thead className='text-center'>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Username</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {
                allCustomer.map((eachOne, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{eachOne.firstname}</td>
                    <td>{eachOne.lastname}</td>
                    <td>{eachOne.email}</td>
                    <td>{eachOne.contact}</td>
                    <td>{eachOne.username}</td>
                    <td><button className='btn btnbg text-white' onClick={()=>customerDlt({customerId: eachOne._id})}><FaTrashAlt /></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </div>
  )
}

export default CustomerList