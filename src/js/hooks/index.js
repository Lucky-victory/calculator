import { useEffect, useRef } from "react";

export function useLongPress(ref, callback = () => {}, delay = 1200) {
  const timeoutRef = useRef(null);

  function handleMouseDown(evt) {
    timeoutRef.current = setTimeout(callback, delay);
  }

  function handleMouseUp(evt) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    if (!ref || !ref.current) return;

    const startEvents = ["mousedown", "touchstart"];
    const endEvents = ["mouseup", "touchend", "touchcancel", "mouseleave"];
    startEvents.forEach((evtName) => {
      ref.current?.addEventListener(evtName, handleMouseDown);
    });
    endEvents.forEach((evtName) => {
      ref.current?.addEventListener(evtName, handleMouseUp);
    });

    return () => {
      startEvents.forEach((evtName) => {
        ref.current?.removeEventListener(evtName, handleMouseDown);
      });
      endEvents.forEach((evtName) => {
        ref.current?.removeEventListener(evtName, handleMouseUp);
      });
    };
  }, [ref, callback, delay]);

  return null;
}
