import { useState } from "react";
import Button from "./button";

export default function ImageDetails() {
    const [essentialsOpen, setEssentialsOpen] = useState(true);

    const changePage = () => {
        setEssentialsOpen((current) => !current);
    };

    async function onSubmit(event) {
        return;
    }

    function createFormField(id, name) {
        return (
            <div className="flex flex-row space-x-4 place-items-center">
                <p>{id}: </p>
                <input type="text" name={name} className="h-8 w-[60%]" />
            </div>
        );
    }

    const essentialsPage = (
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

                <Button page="" text="Submit" />
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

                <Button page="" text="Submit" />
            </div>
        </div>
    );

    // return essentialsOpen ? essentialsPage : technicalStuff;

    return (
        <div className="gap-4 grid w-[85%]">
            <h2>The Essentials</h2>
            <div className="flex flex-col gap-4 p-4 rounded-lg space-x-6 bg-stone-900">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-[50%] items-left p-4 rounded-lg bg-stone-800">
                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-4"
                        >
                            {createFormField("Title", "title")}
                            {createFormField("Uploaded By", "updatedBy")}
                            {createFormField("Source", "source")}
                            {createFormField("Date Uploaded", "dateUploaded")}
                            {createFormField("Comments", "comments")}
                        </form>
                    </div>
                    <div className="grid w-[45%] justify-items-center p-4 rounded-lg bg-stone-800">
                        <img src="/stegalogo.png" className="h-[300px]" />
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
