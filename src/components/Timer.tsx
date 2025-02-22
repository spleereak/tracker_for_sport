import React from "react";

interface Props {
  minutes: number;
  isResting: boolean;
}

export const Timer: React.FC<Props> = ({
  minutes,
  isResting
}) => {
  const [timeLeft, setTimeLeft] = React.useState(minutes * 60);

  React.useEffect(() => {
    if (!isResting || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <div className="text-xl font-bold">{formatTime(timeLeft)}</div>;
};

export default Timer;
