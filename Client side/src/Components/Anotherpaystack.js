import React, { useState } from 'react'
import PaystackPop from '@paystack/inline-js'
function Anotherpaystack() {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [amount, setamount] = useState('')
    const payWithPayStack=(e)=>{
        e.preventDefault()
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: 'pk_test_8e0adf1d74b3595f09d84c9b4ec645477eeb20fd',
            amount,
            email,
            firstname,
            lastname,
            onSuccess(transaction){
                let message = `payment complete! Reference ${transaction.reference}`;
                console.log(message);
            },
            onCancel:()=>{
                console.log(`pay your amount savely before going`)
            }
        })
    }
    return (

        <>
            <h1>Welcome to paystack payment</h1>
            <div className='col-6'>
                <form action='' className='ms-5 shadow p-2'>
                    <div >
                        <label >Firstname</label>
                        <input type='text' onChange={(e) => setfirstname(e.target.value)} className='mt-2 form-control' />
                    </div>
                    <div >
                        <label >lastname</label>
                        <input type='text' onChange={(e) => setlastname(e.target.value)} className='mt-2 form-control' />            </div>
                    <div >
                        <label>Email</label>
                        <input type='text' onChange={(e) => setemail(e.target.value)} className='mt-2 form-control' />            </div>

                    <div >
                        <label >amount</label>
                        <input type='number' onChange={(e) => setamount(e.target.value)} className='mt-2 form-control' />
                    </div>
                    <button type='submit' className='btn btn-danger mt-2 float-end' onClick={payWithPayStack}>Pay Now</button>
                </form>
            </div>
        </>
    )
}

export default Anotherpaystack