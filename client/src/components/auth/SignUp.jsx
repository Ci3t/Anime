import React, { useEffect, useState } from "react";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks/themeHook";
import { isValidEmail } from "../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
 
  const isValidName = /^[a-z A-z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is Missing" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" };

  if (!email.trim()) return { ok: false, error: "Email is Missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Email Invalid" };

  if (!password.trim()) return { ok: false, error: "Password is Missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be minimum 8 character long" };

  return { ok: true };
};
function SignUp() {
  const navigate = useNavigate()


  const {authInfo} = useAuth()
  const { isLoggedIn} = authInfo
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {updateNotification} = useNotification()
  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification('error',error);

    const response = await createUser(userInfo);
    if (response.error) return updateNotification('error',response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };


  
  useEffect(()=>{

    if(isLoggedIn) navigate('/')
  },[isLoggedIn])
  const { name, email, password } = userInfo;
  return (
    <div className="fixed inset-0 bg-main -z-10 flex justify-center items-center">
      <Container>

        
        <form
          onSubmit={handleSubmit}
          className="bg-second rounder p-6 w-72 space-y-6"
        >
          <Title>Sign Up</Title>
          <FormInput
            value={name}
            label="Name"
            placeholder="Bob Doe"
            name="name"
            onChange={handleChange}
          />
          <FormInput
            value={email}
            label="Email"
            placeholder="bob@doe.com"
            name="email"
            onChange={handleChange}
          />
          <FormInput
            type="password"
            value={password}
            label="Password"
            placeholder="********"
            name="password"
            onChange={handleChange}
          />
          <Submit value="Sign Up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forgot Password</CustomLink>
            <CustomLink to="/auth/signin">Sign In </CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SignUp;
