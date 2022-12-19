import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks/themeHook";
import Container from "../Container";

import Submit from "../form/Submit";
import Title from "../form/Title";

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
const {isLoggedIn} = authInfo
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
    if (isLoggedIn) navigate("/");
  }, [user,isLoggedIn]);

  return (
    <div className="fixed inset-0 bg-main -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-second rounder p-6  space-y-6"
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

          <Submit value="Verify" />
        </form>
      </Container>
    </div>
  );
}
export default EmailVerification;
