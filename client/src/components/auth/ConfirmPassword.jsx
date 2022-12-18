import React from 'react'

import Container from '../Container'
import CustomLink from '../form/CustomLink'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

function ConfirmPassword() {
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