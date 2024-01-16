import React, { useRef, useState, useEffect, ReactNode } from 'react'
import { ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react'

let currentOTPIndex = 0;

type Props = {
  invalid?: boolean,
  onInvalid: () => ReactNode,
  setOTPCode: Dispatch<SetStateAction<string>>
}

const OTPInput = ({ invalid = false, onInvalid, setOTPCode }: Props) => {

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPindex, setActiveOTPindex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setOTPCode(otp.join(""))
  }, [otp])

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPindex])

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target
    const constrain = /^[0-9]$/ // Sólo admite digitos del 0 al 9 (ningún tipo de caractér ajeno a un número)

    const ONLY_ONE_DIGIT = (constrain.test(value) || value === "")

    if (ONLY_ONE_DIGIT) {

      const newOTP = [...otp]
      newOTP[currentOTPIndex] = value.substring(value.length - 1);

      if (newOTP[currentOTPIndex]) setActiveOTPindex(currentOTPIndex + 1)
      else setActiveOTPindex(currentOTPIndex - 1)

      setOtp(newOTP)
      // event.target.value = newOTP[index]
    }
  }

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      setActiveOTPindex(currentOTPIndex - 1)
    }
  }

  //console.log(otp)

  return (
    <div className={`OTPInput ${invalid && "invalid"}`}>
      <div className="inputs">
        {
          otp.map((_, index) =>
            <input
              key={index}
              ref={index === activeOTPindex ? inputRef : null}
              type="text"
              // pattern="(?!+-)"
              value={otp[index]}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              required
            />
          )
        }
      </div>
      <p>*Código incorrecto</p>
      {
        invalid && onInvalid()
      }
    </div>
  )
}

export default OTPInput;