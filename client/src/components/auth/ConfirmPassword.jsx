import React, { useEffect, useState } from 'react'
import {useNavigate, useSearchParams } from 'react-router-dom'

import Container from '../Container'

import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'
import {GiSpinningSword} from 'react-icons/gi'
import { verifyPasswordResetToken } from '../../api/auth'
import { useNotification } from '../../hooks/themeHook'

function ConfirmPassword() {

  const [isVerifying,setIsVerifying] = useState(true)
  const [isValid,setIsValid] = useState(false)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  const navigate = useNavigate()
  const {updateNotification} = useNotification()

  useEffect(()=>{
    isValidToken()
  },[])

  const isValidToken = async()=>{
  const {error,valid} =  await verifyPasswordResetToken(token,id)
  setIsVerifying(false);
  if(error){

    navigate('/auth/reset-password',{replace:true})
    return updateNotification('error',error)
  }
  if(!valid){

    setIsValid(false);
  
    return navigate('/auth/reset-password',{replace:true})
  }

  setIsValid(true);

  }

 

  if(isVerifying)
  return(
    <>
    <div className='flex justify-center items-center'>
      <h1>Please Wait we are Verifying your token</h1>
    </div>
    <div className='flex justify-center items-center'>
    <GiSpinningSword className='animate-spin'/>
    </div>
    </>
  )

  if(!isValid)
  return(
    <>
    <div className='flex justify-center items-center'>
      <h1>Sorry the token is invalid</h1>
    </div>
  
    </>
  )

 

  return (
    <div className='fixed inset-0 bg-main -z-10 flex justify-center items-center'>
      <Container>
        <form className='bg-second rounder p-6 w-96 space-y-6'>
          <Title>
            Enter New Password
          </Title>
         <FormInput label='New Password' placeholder='********' name='password'  type={'password'}/>
         <FormInput label='Confirm Password' placeholder='********' name='confirmPassword' type={'password'}/>
        
         <Submit value='Submit'/>

    
        </form>
      </Container>
    </div>
  )
}
export default ConfirmPassword