import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface Iprops {
  otpCode: string;
  setOtpCode: (otpCode: string) => void;
  hideText?: boolean;
}
export function OTPInput({ otpCode, setOtpCode, hideText = false }: Iprops) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const currentOtpCountRef = useRef<number>(0);
  useEffect(() => {
    const filledDigits = otp.filter((digit) => digit !== "").length;
    currentOtpCountRef.current = filledDigits;
    console.log(currentOtpCountRef.current);
    if (currentOtpCountRef.current === 6) {
      inputRefs.current[activeIndex]?.blur();
      inputRefs.current[activeIndex + 1]?.blur();
    }
  }, [otp]);

  const changehandler = (text: string, index: number) => {
    setActiveIndex(index);
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (newOtp[index] !== "") {
      inputRefs.current[index + 1]?.focus();
    }
    // if (index === 5 && newOtp[index] !== "" && otpCode.length === 5) {
    //   inputRefs.current[index]?.blur();
    // }
    // if ((index === 5 && otpCode.length === 5)) {
    // if (currentOtpCountRef.current === 6) {
    //   inputRefs.current[index]?.blur();
    // }
    const otppCode = newOtp.join("");
    setOtpCode(otppCode);
  };
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    setActiveIndex(index);
    const key = e.nativeEvent.key;
    if (key === "Backspace") {
      if (otp[index] === "") {
        console.log("iamempty");
        if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs.current[index - 1]?.focus();
          setTimeout(() => {
            inputRefs.current[index]?.focus();
            inputRefs.current[index - 1]?.focus();
          }, 50);
        } else {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs.current[index]?.focus();
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
            inputRefs.current[index]?.focus();
          }, 50);
        }
      } else {
        console.log("iammlyan");
        console.log(index);
        // If input has a value, clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        if (index === 0) {
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
            inputRefs.current[index]?.focus();
          }, 50);
        } else {
          setTimeout(() => {
            inputRefs.current[index - 1]?.focus();
            inputRefs.current[index]?.focus();
          }, 50);
        }
      }
    }
    // if (/^\d$/.test(key)) {
    //   if (index < otp.length - 1) {
    //     inputRefs.current[index + 1]?.focus();
    //   } else if (index === otp.length - 1 && otpCode.length === 6) {
    //     inputRefs.current[index]?.blur();
    //   }
    // }
    // if (currentOtpCountRef.current === 6) {
    //   inputRefs.current[index]?.blur();
    // }
  };

  return (
    <View className="flex-row justify-center items-center space-x-4 mb-2">
      {otp.map((digit, index) => (
        <View
          key={index}
          style={{
            overflow: "visible",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 5,
            shadowRadius: 4,
            backgroundColor: "white",
            elevation: 4,
            borderRadius: 28,
          }}
          className="relative items-center justify-center mr-2"
        >
          <TextInput
            ref={(el) => (inputRefs.current[index] = el)}
            keyboardType="numeric"
            keyboardAppearance="default"
            maxLength={1}
            cursorColor={"#9d9a9a"}
            value={hideText === true && digit ? "*" : digit}
            secureTextEntry={false}
            onFocus={() => setActiveIndex(index)}
            className="w-14 h-14 text-center text-2xl rounded-full relative items-center justify-center color-primary"
            onChangeText={(text) => changehandler(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            // onKeyPress={(e) => {
            //   if (e.nativeEvent.key === "Backspace") {
            //     handleKeyPress(index);
            //   }
            // }}
          />
          <Pressable
            onPress={() => {
              inputRefs.current[index]?.focus();
            }}
            className={`absolute w-4 h-4 rounded-full mr-1 ${
              otp[index] !== "" ? "bg-[transparent]" : "bg-muted"
            }`}
          />
        </View>
      ))}
    </View>
  );
}
