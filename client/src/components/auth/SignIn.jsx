import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks/themeHook";

import Container from "../Container";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { isValidEmail } from "../utils/helper";

import styles from '../style/signin.module.css'

const validateUserInfo = ({  email, password }) => {


  if (!email.trim()) return { ok: false, error: "Email is Missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Email Invalid" };

  if (!password.trim()) return { ok: false, error: "Password is Missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be minimum 8 character long" };

  return { ok: true };
};

function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const {updateNotification} = useNotification()

  const {handleLogin,authInfo} = useAuth()

  const {isPending , isLoggedIn} = authInfo

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification('error',error);

    handleLogin(userInfo.email,userInfo.password)
 
  };

  // useEffect(()=>{

  //   if(isLoggedIn) navigate('/')
  // },[isLoggedIn])

  return (
    <div className={ styles.signBgImage +" fixed inset-0 -z-10 flex justify-center items-center"}>
      <Container className={" w-80"}>
        <img className="rounded-t" src="./images/Fullstacker_anime.png" alt="signin" />
        <form onSubmit={handleSubmit} className={styles.signFormBlur +"  rounded-b p-6  space-y-6"}>
          <Title>Sign In</Title>
          <FormInput
            label="Email"
            placeholder="bob@doe.com"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            type='password'
          />
          <Submit value="Sign In" className={styles.submitSignIn} busy={isPending}/>

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SignIn;
