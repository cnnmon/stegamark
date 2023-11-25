import { useState, useRef } from 'react';

export default function JsonInput({ text, setText }) {
  const [isValidJson, setIsValidJson] = useState(true);
  const ref = useRef(null);

  const handleTextChange = (value) => {
    try {
      JSON.parse(value);
      setIsValidJson(true);
    } catch (err) {
      setIsValidJson(false);
    }
    setText(value);
  }

  return (
    <>
      <textarea
        className="border-2 p-4 border-[#1A2FE9]"
        name="metadata"
        type="text"
        ref={ref}
        id="metadata"
        value={text}
        placeholder="Enter your metadata here."
        onChange={(e) => handleTextChange(e.target.value)}
        rows="10"
        onKeyDown={(e) => {
          /* allow tabs to be entered in the textarea (useful for json input) */
          if (e.key == 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const newText = text.substring(0, selectionStart) + '  ' + text.substring(selectionEnd, text.length);
            ref.current.focus();
            ref.current.value = newText;
            ref.current.setSelectionRange(
              selectionStart + 2,
              selectionStart + 2
            );
            setText(newText);
          }
        }}
      />
      {!isValidJson && <p className="text-red-600 mt-[-2px]">Invalid JSON. Try removing the last comma following an object, or ensuring that all strings are in quotations.</p>}
    </>

  )
};