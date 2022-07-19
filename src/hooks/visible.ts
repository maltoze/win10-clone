import { useState } from 'react';

const useVisible = (show = false) => {
  const [isVisible, setIsVisible] = useState(show);
  const handleShow = () => setIsVisible(true);
  const handleHide = () => setIsVisible(false);
  return [isVisible, handleShow, handleHide] as const;
};

export default useVisible;
