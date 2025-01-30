import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface OtpTimerProps {
  onResend: () => void;
}

const OtpTimer: React.FC<OtpTimerProps> = ({ onResend }) => {
  const [seconds, setSeconds] = useState<number>(59);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleResend = () => {
    setSeconds(59);
    setIsActive(true);
    onResend(); // Call the function to resend OTP
  };

  return (
    <View style={styles.container}>
      {isActive ? (
        <Text style={styles.timerText}>
          Resend Code in <Text style={styles.timerNumber}>{formatTime(seconds)}</Text>
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
  },
  resendText: {
    fontSize: 16,
    color: "#007d7e",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#007d7e",
  },
  timerText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  timerNumber: {
    color: "#007d7e",
    fontWeight: "bold",
  },
});

export default OtpTimer; 





