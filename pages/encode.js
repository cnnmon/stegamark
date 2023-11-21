import React, { useEffect, useState, useRef} from "react";
import Link from "next/link";
import Back from '../components/Back';
//import Encode from "../components/encode";
import Decode from "../components/decode";
import About from "../components/about";
import ImageDetails from "../components/imageDetails";
import axios from 'axios'

function listUsers() {
    fetch('/api/notion_listUsers')
      .then((response) => response.json())
      .then((data) => console.log(data));
}

function createDB() {
  fetch('/api/notion_createDB')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function createEntry() {
  fetch('/api/notion_createEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function readEntry() {
  fetch('/api/notion_readEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function updateEntry() {
  fetch('/api/notion_updateEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function archiveEntry() {
  fetch('/api/notion_archiveEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function getNextId(){
  //TODO: this should (ig by looking at the database?) grab the next unique id. 
  // ex, if there are 0050 images in the database, the next id should be 51 (or something like that.)
  let nextId = "0050"
  console.log(nextId);
  return nextId
}

export default function Encode() {
  const [loaded, setLoaded] = useState(); //allows user to hit submit after a file is selected 
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false); //becomes true while the file is uploading and being encoded, then becomes false again. 


  const [uploaded, setUploaded] = useState(); //becomes true after the file is uploaded, and the url is in uploadUrl
  const [uploadUrl, setUploadUrl] = useState(null);

  const [id, setId] = useState(0); // Initial ID value
  const [key, setKey] = useState(0); // this key thing forces the react component to update 


  function handleChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
          console.log('File selected:', selectedFile);
        }
        setLoaded(true)
      };
    const handleMetadataSubmit = async(e) =>{
        e.preventDefault();
        console.log(e);
          // Create FormData and append form fields
        const formData = new FormData();
        /*Object.entries(formFields).forEach(([key, value]) => {
          formData.append(key, value);
        });*/

        console.log(formData);


      }

    const handleSubmit = async(e) =>{
          e.preventDefault();
          if (!file) {
          console.error('No file selected');
          return;
        }
        setLoading(true);
        //Get an ID....
        const id = await getNextId(); //get this image's id and set that state before doing anything else...
        setId(id);

        //make a POST request to send this image and ID to the Flask server...
        const formData = new FormData(); //create formdata to send...
        formData.append('file',file);
        formData.append('id', id)

        try{
          let response = await axios.post('https://rosteals-server-fbea1f0f4f47.herokuapp.com/encode', formData);
            if (response.status === 200) {
              const data = await response.data;
              console.log('image uploaded to:', data.imageUrl);
              console.log("set id to: " + id);
              setUploadUrl(response.data.imageUrl);
              setUploaded(true);
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
        <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-5 place-items-center">
                <img src="/stegalogo.png" className="h-24" />
                <div className="flex flex-col items-left space-y-2">
                    <h1>StegaMark</h1>
                    <p>
                        reliable, deep digital watermarking & image
                        attribution
                    </p>
                </div>
            </div>
        <div className="flex flex-row space-x-8 place-items-center">
            <a href="/" className="text-gray-400">
                About
            </a>
            <a href="/" className="text-gray-400">
                Sign In / Register
            </a>
        </div>
    </div>
      <Back />
      <h2>Encode my image</h2>

      <div className="bg-gray-200 flex items-center p-4 rounded-lg gap-2">
        <form onSubmit={handleSubmit}>
          <input className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"  
            id="file_input" name="file" type="file" onChange={handleChange} />
          <button className = "items-right"style={loaded ? {} : { display: 'none' }} // button appears after upload 
            type="submit">Click here to upload image</button>
        
    
        </form>


        </div>

        <div 
            style={loading ? {} : { display: 'none' }} // this will appear as the image is loading.
            className="flex flex-col gap-4 place-items-center">
             the image has been received! encoded version now loading...
        </div>
        <div 
          style={uploaded ? {} : { display: 'none' }}
          className="flex flex-col gap-4 place-items-center">
                <form onSubmit={handleMetadataSubmit}>
                <ImageDetails key={key} selectedId={id} uploadedImageUrl={uploadUrl}/>
                </form>
                
              
        </div>
          





            <About />
        </div>
    );
}
