import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Container from "../Container";

import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { GiSpinningSword } from "react-icons/gi";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks/themeHook";
import styles from '../style/confirmPass.module.css'

function ConfirmPassword() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const [password, setPassword] = useState({
    one: "",
    two: "",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);

      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({target})=>{

    const {name,value} = target

    setPassword({...password,[name]:value})
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    
    if(!password.one.trim()) return updateNotification('error','Password is Missing')

    if(password.one.trim().length< 8) return updateNotification('error','Password must be 8 characters long')
   
    if(password.one !== password.two) return updateNotification('error','Password do not match')

    const {error,message} = await resetPassword({newPassword:password.one,userId:id,token})
    if (error) return updateNotification("error", error);

    updateNotification('success',message)

    navigate('/auth/signin',{replace:true})
    
  }

  if (isVerifying)
    return (
      <>
        <div className="flex justify-center items-center">
          <h1>Please Wait we are Verifying your token</h1>
        </div>
        <div className="flex justify-center items-center">
          <GiSpinningSword className="animate-spin" />
        </div>
      </>
    );

  if (!isValid)
    return (
      <>
        <div className="flex justify-center items-center">
          <h1>Sorry the token is invalid</h1>
        </div>
      </>
    );

  return (
    <div className={ styles.signBgImage +" fixed inset-0 -z-10 flex justify-center items-center"}>
      <Container className={" w-96"}>
      <img className="rounded-t" src="./images/very_cool.png" alt="signin" />
        <form onSubmit={handleSubmit} className={styles.signFormBlur +"  rounded-b p-6  space-y-6"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="one"
            type={"password"}
            value={password.one}
            onChange={handleChange}
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="two"
            type={"password"}
            value={password.two}
            onChange={handleChange}
          />

          <Submit value="Submit" className={styles.submitSignIn}/>
        </form>
      </Container>
    </div>
  );
}
export default ConfirmPassword;
