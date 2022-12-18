import React from 'react'

import Container from '../Container'
import CustomLink from '../form/CustomLink'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

function SignUp() {
  return (
    <div className='fixed inset-0 bg-main -z-10 flex justify-center items-center'>
      <Container>
        <form className='bg-second rounder p-6 w-72 space-y-6'>
          <Title>
            Sign Up
          </Title>
         <FormInput label='Name' placeholder='Bob Doe' name='name'/>
         <FormInput label='Email' placeholder='bob@doe.com' name='email'/>
         <FormInput label='Password' placeholder='********' name='password'/>
         <Submit value='Sign Up'/>

         <div className="flex justify-between">
         <CustomLink to='/auth/forget-password'>Forgot Password</CustomLink>
         <CustomLink to='/auth/signin'>Sign In </CustomLink>
         </div>
        </form>
      </Container>
    </div>
  )
}

export default SignUp