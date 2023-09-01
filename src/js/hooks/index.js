import { useEffect, useRef } from "react";
import {Dom7} from 'framework7';
const $$=Dom7;
export function useLongPress(selector, callback = () => {}) {
  

  useEffect(() => {
    if (!selector) return;

  
      $$(selector).on('taphold', callback);
     

    return () => {
     
        $$(selector).off('taphold', callback);

    }
  }, [selector, callback]);

  return null;
}
