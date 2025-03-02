import { useEffect, useState } from "react";

const Counter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(count / 50); // Adjust speed based on count

    const interval = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(interval);
      } else {
        setDisplayCount(current);
      }
    }, 40); // Update every 20ms for smooth effect

    return () => clearInterval(interval);
  }, [count]);

  return <span className="text-xl font-semibold text-slate-700">{displayCount}</span>;
};

export default Counter;
