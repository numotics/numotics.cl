import { useState, useRef, useEffect } from 'react';

const DynamicTextArea = ({setValue: propsSetValue, value: propsValue, chatBoxRef, ...props}) => {
  const [textareaLineHeight, setTextareaLineHeight] = useState(0);

  useEffect(() => {
    if (chatBoxRef.current) {
      const computedStyle = window.getComputedStyle(chatBoxRef.current);
      const lineHeight = parseInt(computedStyle.getPropertyValue('line-height'));
      setTextareaLineHeight(lineHeight || 18); // Set a default line height if it's not available
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.style.height = 'auto';
      const newScrollHeight = chatBoxRef.current.scrollHeight;
      const newRows = Math.ceil(newScrollHeight / textareaLineHeight);
      chatBoxRef.current.style.height = `${newRows * textareaLineHeight}px`;
    }
  }, [propsValue, textareaLineHeight]);

  const handleTextareaChange = (event) => {
    propsSetValue(event.target.value);
    if (chatBoxRef.current) {
      chatBoxRef.current.style.height = 'auto';
      const newScrollHeight = chatBoxRef.current.scrollHeight;
      const newRows = Math.ceil(newScrollHeight / textareaLineHeight);
      chatBoxRef.current.style.height = `${newRows * textareaLineHeight}px`;
    }
  };

  return (
    <textarea
      ref={chatBoxRef}
      className="resizable-textarea sm:w-2/3"
      onChange={handleTextareaChange}
      value={propsValue}
      {...props} // Pass through any additional props
    />
  );
};

export default DynamicTextArea;