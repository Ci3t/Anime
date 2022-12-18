import React, { useState } from 'react'

import Container from '../Container'
import CustomLink from '../form/CustomLink'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'


const OTP_LENGTH = 6

function EmailVerification() {
    const [otp,setOtp]=useState(new Array(OTP_LENGTH).fill(''))

const handleOtpChange = ({target},index)=>{
const {value} = target;

}

  return (
    <div className='fixed inset-0 bg-main -z-10 flex justify-center items-center'>
      <Container>
        <form className='bg-second rounder p-6  space-y-6'>
            <div>

          <Title>
            Please enter the OTP Code to verify your account
          </Title>
          <p className='text-center text-dark-subtle'>OTP has been sent to your email</p>
            </div>
            <div className='flex justify-center items-center space-x-4'>

            {otp.map((_,index)=>{
                return <input  key={index} value={otp[index]} onChange={(e)=>{handleOtpChange(e,index)}} type={'number'} className='w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none'/>
            })}
            </div>

         
        
         <Submit value='Send Link'/>

         
        </form>
      </Container>
    </div>
  )
}
export default EmailVerification