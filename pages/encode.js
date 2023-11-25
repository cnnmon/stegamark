import React, { useState } from "react";
import axios from 'axios';
import JsonInput from '../components/JsonInput';
import { STATES, ENCODING_TYPES, getStatusMessage } from '../lib/constants';

const DEFAULT_METADATA = `{
  "Title": "My image",
  "Description": "This is a description of my image",
  "By": "Me",
  "Date created": "2021-09-01",
  "Twitter": "@mytwitterhandle"
}`

export default function Encode() {
  const [uploadState, setUploadState] = useState(STATES.DEFAULT);
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(DEFAULT_METADATA);
  const [encodingType, setEncodingType] = useState(0);

  /* this stuff handles the file upload... */
  function handleFileChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      console.log('File selected:', selectedFile);
    }
  };

  /* handles form submission, including image + metadata upload */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      console.error('No file selected');
      setUploadState(STATES.ERROR_NO_FILE);
      return;
    }

    setUploadState(STATES.UPLOADING);

    // make a POST request to send this image and ID to the Flask server...
    const formData = new FormData(); // create formdata to send...
    formData.append('file', file);
    formData.append('metadata', metadata);

    try {
      // this should take in the file image and metadata, log all of this in the database (including getting & storing an image url and generating a unique id)
      // then, it should only need to return the id
      const response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/encode', formData);

      if (response.status !== 200) {
        console.error('Error encoding image')
        setUploadState(STATES.ERROR);
        return;
      }

      const data = await response.data;
      console.log(data);

      /*!! TODO: at this point we have the metadata form all filled out, plus the encoded image's url and its id. 
        * we've put that data in formData.
        * next we need to log this in the database
        * It also would be nice to send the user to the directory URL for this image at this point,
        * where they can see their encoded image and metadata. */

      setUploadState(STATES.SUCCESS);
    } catch (error) {
      console.error(error);
      setUploadState(STATES.ERROR);
      return;
    }
  }

  return (
  <div className="gap-8 grid">
      <div>
        <h1>Encoding</h1>
        <p>I want to encode my metadata into a new image.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          className="file:border-0 file:outline-none w-full border-2 border-dashed border-[#1A2FE9] rounded-lg px-4 py-10 flex flex-col items-center justify-center file:bg-[#1A2FE9] file:text-white"
          name="file"
          type="file"
          id="imageUpload"
          onChange={handleFileChange}
        />

        <div className="flex flex-col gap-4 w-full">
          <h5><b>Input your metadata*</b> (in JSON formatting)</h5>
          <JsonInput text={metadata} setText={setMetadata} />
        </div>

        <div>
          <h5><b>What kind of encoding would you like to do?*</b></h5>
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
          <button type="submit" className="bg-[#1A2FE9] text-white w-full py-3 font-bold" onClick={handleSubmit}>
            Encode my image
          </button>
        </div>
      </form>
      <p>
        {getStatusMessage(uploadState)}
      </p>
    </div>
  );
}
