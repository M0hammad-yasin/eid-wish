import { useState, useEffect } from "react";

export default function useTypewriter(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIsTyping(true);

    let index = -1;
    if (text.length <= 0) {
      setIsTyping(false);
      return;
    }

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
}
