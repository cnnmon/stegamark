import Back from "./Back";

export default function Decode() {
    return (
        <div className="gap-4 grid w-[85%]">
            {/* <Back /> */}
            <h2>Decode my image</h2>
            <div className="flex items-center p-4 rounded-lg space-x-6 bg-stone-900">
                <button className="bg-gray-400 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Browse files...
                </button>
                <p>Upload an image to begin encoding a new secret...</p>
            </div>

            <p className="">
                StegaMark will check for any existing records of this image,
                then give you options to digitally watermark the image as your
                own.
            </p>
        </div>
    );
}
