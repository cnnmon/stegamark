import React, { useEffect, useState, useRef} from "react";
import Back from '../components/Back';
import About from "../components/about";
import axios from "axios";

export default function Decode() {
  const [loaded, setLoaded] = useState(); //submit button only appears after a file is selected 
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState('https://stega-storage.s3.amazonaws.com//encoded_images/encoded_bubbles.png');

  const [loading, setLoading] = useState(false); //becomes true while the file is uploading and being encoded, then becomes false again. 
  
  const [secretReturned, setSecretReturned] = useState(false); // true after the secret is returnd
  const [secret, setSecret] = useState(' '); // secretz

  const [key, setKey] = useState(0); // this key thing forces the react component to update 


  const isValidImageUrl = (url) => {
    // Regular expression to match common image file extensions
    const imageExtensions = /\.(jpeg|jpg|gif|png|webp)$/i;

    // Test if the URL ends with a valid image file extension
    return imageExtensions.test(url);
  };

  /* this stuff handles the file upload... */
  function handleFileChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
          console.log('File selected:', selectedFile);
        }
        setLoaded(true)
      };
  /*or the imageUrlinput*/
  function handleInputChange(e) {
      setUrlInput(e.target.value);
      };

    const handleFileSubmit = async(e) =>{ //we have to upload the image first...
        e.preventDefault();
        if (!file) {
          console.error('No file selected');
          return;
        }
        setLoading(true);

        //make a POST request to send this image and ID to the Flask server...
        const formData = new FormData(); //create formdata to send...
        formData.append('file',file);


        // user uploaded a file, so let's upload it to the server...
        try{ 
          let response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/upload', formData);
            if (response.status === 200) {
              const data = await response.data;
              console.log('image uploaded to:', data.imageUrl);


              // if the image uploaded successfully, try decoding it
              const formData2 = new FormData(); //create formdata to send...
              formData2.append('imageUrl',data.imageUrl);
              try{
                let response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/decode', formData2);
                
                if (response.status === 200) {
                  const data = await response.data;
                  console.log('decoded secret:', data.secret);

                  setSecret(data.secret);
                  setSecretReturned(true);
                  setKey((prevKey)=> prevKey+1);
                }
                else{
                  console.error("received failed image decoding response from server")
                }
                
              } catch(error){
                  console.error('Failed to decode image', error);
                }

            }

            else {
              console.error('received a failed upload response from API server');
            }
          } catch (error) {
            console.error('Error submitting image:', error);
          }


    } //end file handler function

    //if the user submits a URL instead of a file...
    const handleUrlSubmit = async(e) =>{ 
        e.preventDefault();
        if (!urlInput){
          console.error('No url inputted');
          return;
        }
        if (!isValidImageUrl(urlInput)){
          console.error('invalid url inputted');
          return;
        }

        setLoading(true);

        //make a POST request to send this image Flask server...
        const formData = new FormData(); //create formdata to send...
        formData.append('imageUrl',urlInput);

        try{
          let response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/decode', formData);
            if (response.status === 200) {
              const data = await response.data;
              console.log('SECRET:', data.secret);
              setSecret(data.secret);
              setSecretReturned(true);
              setKey((prevKey)=> prevKey+1);

              setLoading(false);
              } 
            else {
              console.error('Failed to upload file');
            }
          } catch (error) {
            console.error('Error uploading file:', error);
          }


      }


  return (
    <div className="gap-4 grid">
      <Back />
      <h2>Decode my image</h2>


      <div className="bg-gray-200 flex items-center p-4 rounded-lg gap-2">
        <form onSubmit={handleFileSubmit}>
          <input className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"  
            id="file_input" name="file" type="file" onChange={handleFileChange} />
          <button className = "items-right"style={loaded ? {} : { display: 'none' }} // button appears after upload 
            type="submit">Click here to upload image</button>
        
        </form>

        </div>
        OR enter an imageUrl to check for metadata (i put in a default one for testing -shm)
        <div className="bg-gray-200 flex items-center p-4 rounded-lg gap-2">
          <form onSubmit={handleUrlSubmit}>
            <input className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"  
              id="url_input" name="text" type="text"  
              value={urlInput}
              onChange={handleInputChange}
              />
            <button type="submit">Click here to submit imageUrl</button>
          </form>
        </div>

        <div 
            style={loading ? {} : { display: 'none' }} // this will appear as the image is loading.
            className="flex flex-col gap-4 place-items-center">
             the image has been received! secret url now loading...
        </div>

        <div
          key={key} 
          style={secretReturned ? {} : { display: 'none' }}
          className="flex flex-col gap-4 place-items-center">
          <h3>the encoded secret was: </h3>
          <h1>{secret}</h1>
                
          TODO: we should be:

          - checking if it&apos;s a valid imageID (eg a number that exists in our database) and:
          
            -- if so: show the user the associated data we have on that imageID
          
            -- if not: tell them no metadata was found! 
        </div>
          



            <About />
        </div>
  );
}