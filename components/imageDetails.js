import { useState } from "react";
import Button from "./button";

export default function ImageDetails({uploadedImageUrl, selectedId, key, formFields, onFormFieldChange}) {

    const [essentialsOpen, setEssentialsOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState(uploadedImageUrl);
    const [id, setId] = useState(selectedId);



    const changePage = () => {
        setEssentialsOpen((current) => !current);
    };

    async function onSubmit(e) {
        //i set us up to use the onmetadatasubmit function in encode.js instead! 
        return;
    }
    const updateId = (newId) => {
        setId(newId);
      };

    const updateImageUrl = (newImageUrl) => {
        setImageUrl(newImageUrl);
      };

    function createFormField(title, name) {
        return (
            <div key={name} className="flex flex-row space-x-4 place-items-center">
                <p>{title}: </p>
                <input type="text" 
                name={name} 
                value={formFields[name]} 
                onChange={(e) => onFormFieldChange(name, e.target.value)} 
                className="h-8 w-[60%]" />
            </div>
        );
    }

    const essentialsPage = (
        <div className="gap-4 grid w-[85%]">
            <h2>Edit image metadata</h2>
            <div key={key} className="flex flex-col items-center p-4 rounded-lg space-x-6 bg-stone-900">
                <div className="flex flex-col items-center p-4 rounded-lg space-x-6 bg-stone-800">
                    hello there world this is where info is gonna go
                </div>
                <p>Upload an image to begin encoding a new secret...</p>
                <p className="">
                    You can change this information at any time. Download the
                    watermarked versions of your image in the next step.
                </p>

                <Button type= "submit" page="" text="Submit" />
            </div>
        </div>
    );

    const technicalStuff = (
        <div className="gap-4 grid w-[85%]">
            <h2>Edit image metadata</h2>
            <div className="flex flex-col items-center p-4 rounded-lg space-x-6 bg-stone-900">
                <div className="flex flex-col items-center p-4 rounded-lg space-x-6 bg-stone-800">
                    hello there world this is where info is gonna go
                </div>
                <p>Upload an image to begin encoding a new secret...</p>
                <p className="">
                    You can change this information at any time. Download the
                    watermarked versions of your image in the next step.
                </p>

                <Button type= "submit" page="" text="Submit" />
            </div>
        </div>
    );

    // return essentialsOpen ? essentialsPage : technicalStuff;

    return (
        <div key={key}className="gap-4 grid w-[85%]">
            <h2>The Essentials</h2>
            <div className="flex flex-col gap-4 p-4 rounded-lg space-x-6 bg-stone-900">
            (DEBUG: Encoding successful! This image has been embeddd with this id: {id}. The permalink for this image and its metadata will be at ourwebsitestegamarkwhatever.com/0000{id}. 
                the image url is https://stega-storage.s3.amazonaws.com//encoded_images/encoded_{id}.png)
                <div className="flex flex-row justify-between">
                    
                    <div className="flex flex-col w-[50%] items-left p-4 rounded-lg bg-stone-800">
                        {/*<form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-4">*/}
                            {createFormField("Title", "title")}
                            {createFormField("Uploaded By", "updatedBy")}
                            {createFormField("Source", "source")}
                            {createFormField("Date Uploaded", "dateUploaded")}
                            {createFormField("Comments", "comments")}
                        {/*</form>}*/}
                    </div>
                    <div className="grid w-[45%] justify-items-center p-4 rounded-lg bg-stone-800">
                        <img src={imageUrl} className="h-[300px] object-contain" />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="">
                        You can change this information at any time. Download
                        the watermarked versions of your image in the next step.
                    </p>
                    <button
                        type="submit"
                        className="bg-gray-400 flex items-center rounded-lg w-[100px] h-[25px] justify-center p-5 text-white"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
