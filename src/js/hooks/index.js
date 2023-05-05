import { useState, useEffect, useRef } from "react";

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

  return openBrackets.length ===0;
}

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

/**
 *
 * @param {string} value
 * @returns
 */
export function useParenthesesChecker(value) {
  const [isClosed, setIsClosed] = useState(true);

  function checkParentheses(value) {
    let stack = [];

    for (let i = 0; i < value.length; i++) {
      if (value[i] === "(") {
        stack.push("(");
      } else if (value[i] === ")") {
        if (stack.length === 0) {
          setIsClosed(false);
          return;
        } else {
          stack.pop();
        }
      }
    }
    
    setIsClosed(stack.length === 0);
  }
  useEffect(() => {
    checkParentheses(value);
  }, [value]);
  return [isClosed];
}
