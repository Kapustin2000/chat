import { useEffect, useState, useRef, useCallback } from 'react';

const useOutsideClick = (initialState) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const ref = useRef();

  const handleOutsideClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsVisible(false);
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  return { ref, isVisible, setIsVisible };
};

export default useOutsideClick;
