import React, { useState } from "react";
import axios from "axios";
import { STATES, ENCODING_TYPES, getStatusMessage } from '../lib/constants';

export default function Decode() {
  const [decodeState, setDecodeState] = useState(STATES.DEFAULT);
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState(' '); // secretz
  const [encodingType, setEncodingType] = useState(0);

  /* this stuff handles the file upload... */
  function handleFileChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      setFile(selectedFile);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      setDecodeState(STATES.ERROR_NO_FILE);
      return;
    }

    setDecodeState(STATES.UPLOADING);

    //make a POST request to send this image and ID to the Flask server...
    const formData = new FormData(); 
    formData.append('file', file);

    try {
      // this should take in the file image (not the url) and try to decode it
      const response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/decode', formData);

      if (response.status !== 200) {
        console.error('Error decoding image')
        setDecodeState(STATES.FAILURE);
        return;
      }

      const data = await response.data;
      console.log('decoded secret:', data.secret);
      setSecret(data.secret);
      setDecodeState(STATES.SUCCESS);
    } catch (error) {
      console.error('Error uploading file:', error);
      setDecodeState(STATES.ERROR);
    }
  }

  return (
    <div className="gap-8 grid">
      <div>
        <h1>Decoding</h1>
        <p>I want to decode metadata from an existing image.</p>
      </div>

      <form onSubmit={handleFileSubmit} className="flex flex-col gap-8">
        <input
          className="file:border-0 file:outline-none w-full border-2 border-dashed border-[#1A2FE9] rounded-lg px-4 py-10 flex flex-col items-center justify-center file:bg-[#1A2FE9] file:text-white"
          name="file"
          type="file"
          id="imageUpload"
          onChange={handleFileChange}
        />

        <div>
          <h5><b>What kind of decoding would you like to do?*</b></h5>
          <div className="flex flex-row gap-4 w-full justify-between">
            {ENCODING_TYPES.map((type, i) => {
              const isActive = encodingType.toString() === i.toString();
              return (
                <label key={i} className="flex flex-col w-full border-2 border-[#1A2FE9] p-2 cursor-pointer" style={{ backgroundColor: isActive ? "#1A2FE9" : undefined, color: isActive ? "white" : undefined }}>
                  <input type="radio" name="encoding" value={i} onChange={(e) => setEncodingType(e.target.value)} className="hidden" />
                  <span><b>{type}</b></span>
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <button type="submit" className="bg-[#1A2FE9] text-white w-full py-3 font-bold" onClick={handleFileSubmit}>
            Decode my image
          </button>
        </div>
      </form>

      <div>
        {getStatusMessage(decodeState)}
        {decodeState === STATES.SUCCESS && (
          <div className="flex flex-col gap-4 place-items-center">
            <h3>the encoded secret was: </h3>
            <h1>{secret}</h1>
          </div>
        )}
      </div>
    </div>
  );
}