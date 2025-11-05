import React, { useState, useEffect } from 'react';

export default function Timer({ initialMinutes, onTimeUp, onTimeChange }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // 초 단위로 변환

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        // 남은 시간을 부모 컴포넌트에 전달 (분 단위)
        if (onTimeChange) {
          onTimeChange(Math.ceil(newTime / 60));
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, onTimeChange]);

  // 분:초 형식으로 변환
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}