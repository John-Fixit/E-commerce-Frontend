import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import style from './style.css'
function CustomerList({ customers, staff, adminDetail }) {
  const deleteCustomerURI = 'https://jfix-e-commerce-site.herokuapp.com/admin/deleteCustomer'
  const deleteStaffURI = 'https://jfix-e-commerce-site.herokuapp.com/admin/deleteStaff'

  const customerDlt = ({ customerId }) => {
    if (window.confirm(`Are you sure to delete this user! because the user data will be deleted permsnently from the database?`)) {
      axios.post(deleteCustomerURI, { customerId }).then((res) => {
        if (res.data.status) {
          window.location.reload()
        } else {
          alert(`${res.data.message}`)
        }
      })
    }
  }
  const staffDlt = ({ staffId }) => {
    if (adminDetail._id == staffId) {
      alert(`Please go to your profile page and follow the precautions to delete your account!`)
    }
    else {
      if (window.confirm(`Are you sure to delete this staff! because the staff data will be deleted permsnently from the database?`)) {
        axios.post(deleteStaffURI, { staffId }).then((res) => {
          if (res.data.status) {
            window.location.reload()
          } else {
            alert(`${res.data.message}`)
          }
        })
      }
    }
  }
  return (
    <div className='cont_fluid px-3 text-center'>

      <p className='card-header fs-4 text-center text-muted'>Registered Staff List</p>
      {
        staff.length < 1 ? <p >No staff yet</p> :
          <table className="table table-hover">
            <thead className='text-center text-muted'>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Username</th>
              <th>Added By</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {
                staff.map((eachOne, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{eachOne.firstname}</td>
                    <td>{eachOne.lastname}</td>
                    <td>{eachOne.email}</td>
                    <td>{eachOne.contact}</td>
                    <td>{eachOne.username}</td>
                    <td>{eachOne.addedBy? eachOne.addedBy : 'Not Registered'}</td>
                    <td><button className='btn btnbg text-white' onClick={() => staffDlt({ staffId: eachOne._id })}><FaTrashAlt /></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }


      <p className='card-header fs-4 text-center text-muted mt-5'>Registered Customers List</p>
      {
        customers.length < 1 ? <p >No Customer yet</p> :
          <table className="table table-hover">
            <thead className='text-center text-muted'>
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
                customers.map((eachOne, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{eachOne.firstname}</td>
                    <td>{eachOne.lastname}</td>
                    <td>{eachOne.email}</td>
                    <td>{eachOne.contact}</td>
                    <td>{eachOne.username}</td>
                    <td><button className='btn btnbg text-white' onClick={() => customerDlt({ customerId: eachOne._id })}><FaTrashAlt /></button></td>
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