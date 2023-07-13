import { useEffect } from "react";

const useAutosizeTextArea = (textAreaRef, value, theMaxHeight) => {
  const maxHeight = theMaxHeight || 200;
  useEffect(() => {
    if (textAreaRef?.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "80px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      // Set the height with a maximum limit of maxHeight
      textAreaRef.current.style.overflowY = "auto";
      textAreaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [textAreaRef, value, maxHeight]);
};

export default useAutosizeTextArea;
