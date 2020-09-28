import {useRef, useEffect} from 'react';

const useEventListener = (
  eventName: string,
  handler: (_: any) => void,
  element: EventTarget = document,
): void => {
  const savedHandler = useRef<any>(null);
  useEffect(() => {
    // eslint-disable-next-line immutable/no-mutation
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return () => {};
    }

    const eventListener = (event: any) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
