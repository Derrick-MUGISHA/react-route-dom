
import { useState, useEffect } from "react";

export default function useAutoSlide(total, delay = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, delay);

    // Cleanup
    return () => clearInterval(interval);

  }, [total, delay]);

  return [index, setIndex];
}
