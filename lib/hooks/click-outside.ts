import {RefObject, useCallback} from 'react';

import useEventListener from '@hooks/event-listener';

const useOnClickOutside = (
  ref: RefObject<any>,
  handler: () => unknown,
): void => {
  const listener = useCallback(
    (event: Event): void => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    },
    [ref, handler],
  );

  useEventListener('mouseup', listener);
  useEventListener('touchend', listener);
};

export default useOnClickOutside;
