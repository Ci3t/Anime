import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resendEmailVerification, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks/themeHook";
import Container from "../Container";

import Submit from "../form/Submit";
import Title from "../form/Title";
import styles from '../style/emailVerify.module.css'

const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();
const {isAuth,authInfo} =useAuth()
const {isLoggedIn, profile} = authInfo

const isVerified = profile?.isVerified
  const navigate = useNavigate();

  const {updateNotification} = useNotification()

  const { state } = useLocation();

  const user = state?.user;



  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOtp([...newOtp]);
  };

  const handleOTPResend = async()=>{

   const {error,message} = await resendEmailVerification(user.id)
   if(error) return updateNotification('error',error)

   updateNotification('success',message)
  }

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevInputField(++index);

     
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification('error',"Invalid OTP");

    const { error, message,user: userResponse } = await verifyUserEmail({
      OTP: otp.join(''),
      userId: user.id,
    });
    
    if (error) return updateNotification('error',error);

    updateNotification('success',message);
    localStorage.setItem('auth-token',userResponse.token)
    isAuth()
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user,isLoggedIn,isVerified]);

  return (
    <div className={ styles.signBgImage +" flex justify-center items-center"}>
      <Container className={" w-96 "}>
      <img className="rounded-t pt-2" src="./images/very_cool.png" alt="signin" />
        <form
          onSubmit={handleSubmit}
          className={styles.signFormBlur +"  rounded-b p-6 mb-2 space-y-6"}
        >
          <div>
            <Title>Please enter the OTP Code to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    handleOtpChange(e, index);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e, index);
                  }}
                  type={"number"}
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
            <div>

          <Submit value="Verify" className={styles.submitSignIn} />
          <button onClick={handleOTPResend} type="button" className="dark:text-white text-blue-500 font-semibold hover:underline mt-2">I don't have OTP</button>
            </div>
        </form>
      </Container>
    </div>
  );
}
export default EmailVerification;
