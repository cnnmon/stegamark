import Back from "./Back";
import Image from 'next/image';
import Link from "next/link";


export default function Encode() {
    return (
        <div className="gap-4 grid w-[85%]">
            {/* <Back /> */}
            <h2>Encode my image</h2>
            <div className="flex items-center p-4 rounded-lg space-x-6 bg-stone-900">
                <button className="bg-gray-400 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Browse files...
                </button>
                <p>Upload an image to begin encoding a new secret...</p>
            </div>
            <div className="grid justify-items-end">
                <p>
                    ...or <Link href="/">sign in</Link> to add an image to your
                    Creator record
                </p>
            </div>
        </div>
    );
}
