import { useState, useEffect, useRef } from "react";

const operators = ["x", "%", "+", "-", "÷", "^", "√", "."];
/**
 *
 * @param {string} currentValue
 * @returns
 */
export function useCheckIsOpenParen(currentValue) {
  const [openBrackets, setOpenBrackets] = useState([]);

  useEffect(() => {
    let idxOfCloseParen = currentValue.lastIndexOf(")");
    let idxOfOpenParen = currentValue.lastIndexOf("(");
    const lastChar = currentValue[currentValue.length - 1];

    if (
      idxOfOpenParen !== -1 &&
      idxOfCloseParen < idxOfOpenParen &&
      lastChar !== "("
    ) {
      setOpenBrackets((prev) => [...prev, "("]);
    } else if (
      idxOfCloseParen !== -1 &&
      idxOfOpenParen < idxOfCloseParen &&
      openBrackets.length
    ) {
      setOpenBrackets((prev) => prev.slice(0, prev.length - 1));
    }
  }, [currentValue]);

  return openBrackets.length > 0;
}

export function useLongPress(ref, callback = () => {}, delay = 1500) {
  const timeoutRef = useRef(null);

  function handleMouseDown(evt) {
    evt.stopPropagation();
    timeoutRef.current = setTimeout(callback, delay);
  }

  function handleMouseUp(evt) {
    evt.stopPropagation();
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
