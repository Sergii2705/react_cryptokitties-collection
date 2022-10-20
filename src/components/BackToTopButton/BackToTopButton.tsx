import { useState, useEffect, useCallback } from "react";
import './BackToTopButton.scss';

export const BackToTopButton = () => {
  const [isBackToTopButton, setIsBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        setIsBackToTopButton(true);
      } else {
        setIsBackToTopButton(false);
      }
    })
  }, [])

  const scrollUp = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, []);
  
  return (
    <>
      {isBackToTopButton && (
        <div
          className="upward"
          onClick={scrollUp}
        >
        </div>
      )}
    </>
  )
}