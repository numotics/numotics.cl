import React, { useState, useRef, useEffect } from 'react';

const DynamicTextArea = ({ ...props }) => {
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaLineHeight, setTextareaLineHeight] = useState(0);

  useEffect(() => {
    const computedStyle = window.getComputedStyle(textareaRef.current);
    const lineHeight = parseInt(computedStyle.getPropertyValue('line-height'));
    setTextareaLineHeight(lineHeight || 18); // Set a default line height if it's not available
  }, []);

  const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
      textareaRef.current.style.height = 'auto'; // Reset height to allow it to shrink
      const newScrollHeight = textareaRef.current.scrollHeight;
      const newRows = Math.ceil(newScrollHeight / textareaLineHeight);
      textareaRef.current.style.height = `${newRows * textareaLineHeight}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      className="resizable-textarea"
      value={textareaValue}
      onChange={handleTextareaChange}
      {...props} // Pass through any additional props
    />
  );
};

export default DynamicTextArea;