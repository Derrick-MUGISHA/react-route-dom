import { useState, useEffect } from 'react';

// Each caller gets its own slide index and timer.
export default function useAutoSlide(total, delay = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // One or zero slides do not need a timer.
    if (total <= 1) return;

    const interval = setInterval(() => {
      // Use the latest index and wrap back to zero after the last slide.
      setIndex((previous) => (previous + 1) % total);
    }, delay);

    // Stop the timer on unmount or before total/delay starts a new timer.
    return () => clearInterval(interval);
  }, [total, delay]);

  // Hero reads the index and uses the setter for its manual slide buttons.
  return [index, setIndex];
}
