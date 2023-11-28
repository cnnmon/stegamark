import React, { useState } from "react";
import axios from "axios";
import { STATES, ENCODING_TYPES, getStatusMessage } from '../lib/constants';
import Link from 'next/link'

//const python_server = "http://localhost:8000";
const python_server = "https://rosteals-server-fbea1f0f4f47.herokuapp.com/";

export default function Decode() {
  
  const [decodeState, setDecodeState] = useState(STATES.DEFAULT);
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState('https://stega-storage.s3.amazonaws.com//encoded_images/encoded_bubbles.png');
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
      let response = await axios.post(python_server.concat('/upload'), formData);

      if (response.status !== 200) {
        console.error('Error decoding image')
        setDecodeState(STATES.FAILURE);
        return;
      }

      const data = await response.data;
      console.log('image uploaded to:', data.imageUrl);

      // if the image uploaded successfully, try decoding it
      const formData2 = new FormData(); //create formdata to send...
      formData2.append('imageUrl',data.imageUrl);
      try{
        let response = await axios.post(python_server.concat('/decode'), formData2);
        
        if (response.status === 200) {
          const data = await response.data;
          setSecret(data.secret);

          if (isNaN(data.secret)) { //it's not a valid number
            setDecodeState(STATES.FAILURE_DECODE);
          }
          else{
            setSecret(data.secret.padStart(8, '0'));
            console.log('decoded secret:', data.secret.padStart(8, '0')); //pad it with enough 0s to be an 8 digit number
            console.log('Resulting secret url should be: /', secret);
            setDecodeState(STATES.SUCCESS);
          }
        }
        else{
          console.error("received failed image decoding response from server")
        }
                


    } catch (error) {
      console.error('Error uploading file:', error);
      setDecodeState(STATES.ERROR);
    }
  } catch (error) {
    console.error('Error submitting image:', error);
    setDecodeState(STATES.ERROR);
  }


} //end file handler function

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
            <h3>Success! Your image was embedded with this id: </h3>
            <h1>{secret}</h1>
            <Link href={'/'.concat(secret)}>Click here to view its metadata record.</Link>
          </div>
        )}
      </div>

      <div
      className="flex flex-col gap-4 place-items-center"
      style={decodeState==(STATES.FAILURE_DECODE) ? {} : { display: 'none'}}>
            <h3>We found this embedded in your image: </h3>
            <h1>{secret}</h1>
            <h4>This does not seem to be a valid image ID. This suggests we do not have a metadata record for this image. <Link href="/encode"> Click here to embed your own!</Link></h4>
      </div>
    </div>
  );
}