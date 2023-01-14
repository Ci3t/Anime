import React, { useState } from 'react'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../hooks/themeHook'

import Container from '../Container'
import CustomLink from '../form/CustomLink'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'
import { isValidEmail } from '../utils/helper'

import styles from '../style/forgotPass.module.css'

function ForgetPassword() {

  const [email,setEmail] = useState('')

  const {updateNotification} = useNotification()

  const handleChange = ({ target }) => {
    const { value } = target;

    setEmail(value );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)) return updateNotification('error','Invalid Email')
    const{error,message} =await forgetPassword(email)
    if(error) return updateNotification('error',error)

    updateNotification('success',message)
 
  };

  return (
    <div className={ styles.signBgImage +" flex px-2 justify-center items-center"}>
      <Container className={" w-96"}>
      <img className="rounded-t pt-2" src="./images/very_cool.png" alt="signin" />
        <form onSubmit={handleSubmit} className={styles.signFormBlur +"  rounded-b p-6 mb-2 space-y-6"}>
          <Title>
            Enter Your Email
          </Title>
         <FormInput onChange={handleChange} value={email} label='Email' placeholder='bob@doe.com' name='email'/>
        
         <Submit value='Send Link' className={styles.submitSignIn}/>

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