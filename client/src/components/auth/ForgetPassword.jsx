import React from 'react'

import Container from '../Container'
import CustomLink from '../form/CustomLink'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

function ForgetPassword() {
  return (
    <div className='fixed inset-0 bg-main -z-10 flex justify-center items-center'>
      <Container>
        <form className='bg-second rounder p-6 w-96 space-y-6'>
          <Title>
            Enter Your Email
          </Title>
         <FormInput label='Email' placeholder='bob@doe.com' name='email'/>
        
         <Submit value='Send Link'/>

         <div className="flex justify-between">
          <CustomLink to='/auth/signin'>Sign In</CustomLink>
          <CustomLink  to='/auth/signup'>Sign up</CustomLink>
         </div>
        </form>
      </Container>
    </div>
  )
}
export default ForgetPassword