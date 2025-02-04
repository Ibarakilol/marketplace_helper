import { useCallback, useState } from 'react';

export default function useUnmountAnimation(unmountHandler = () => {}) {
  const [isUnmounting, setIsUnmounting] = useState<boolean>(false);

  const unmountComponent = useCallback(() => {
    setIsUnmounting(true);
  }, [setIsUnmounting]);

  const handleAnimationEnd = useCallback(() => {
    if (isUnmounting) {
      setIsUnmounting(false);
      unmountHandler();
    }
  }, [isUnmounting, unmountHandler]);

  return { isUnmounting, onAnimationEnd: handleAnimationEnd, unmountComponent };
}
