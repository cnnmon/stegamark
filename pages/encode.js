import React, { useEffect, useState} from "react";
import Link from "next/link";
import Back from '../components/Back';
//import Encode from "../components/encode";
import Decode from "../components/decode";
import About from "../components/about";
import ImageDetails from "../components/imageDetails";

export default function Encode() {
  const [loaded, setLoaded] = useState();
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        handleSubmit();
      };
    const handleSubmit = async() =>{
        //make a POST request to send this image to the S3 bucket...
        const formData = new FormData(); //create formdata to send...
        formData.append('file',file);

        try{
          const response = await fetch("https://rosteals-server-fbea1f0f4f47.herokuapp.com/upload", {
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData
          });
          if (response.ok) {
              // Handle success
              console.log('File uploaded successfully');
              console.log('file:' + response);
            } else {
              // Handle error
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
        <input className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"  id="file_input" type="file" onChange={handleChange} />

        {//<p>Upload an image to view</p>
        }
      </div>



        <div 
          style={loaded ? {} : { display: 'none' }}
          onLoad={() => setLoaded(true)}
          className="flex flex-col gap-4 place-items-center">
                <ImageDetails />
                <img className="object-contain h-48 w-96 " src={file} />
        </div>

            <About />
        </div>
    );
}
