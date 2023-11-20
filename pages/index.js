import React, { useEffect } from "react";
import Link from "next/link";
import Encode from "../components/encode";
import Decode from "../components/decode";
import About from "../components/about";
import ImageDetails from "../components/imageDetails";

function NavigationButton({ page, text }) {
    const onClick = () => {
        window.location.href = `/${page}`;
    };

    return (
        <button onClick={onClick} className="bg-gray-200 flex items-center rounded-lg w-[50%] h-[200px] justify-center p-5">
      {text}
        </button>
    );
}

export default function Home() {
    const [images, setImages] = React.useState([]);

    useEffect(() => {
        fetch("/api/getAllImages")
            .then((response) => response.json())
            .then((data) => setImages(data.images));
    }, []);

    return (
        <div className="gap-8 grid">
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

             <div className="flex gap-4 justify-center">
                <NavigationButton
                  page="encode"
                  text="I want to encode - embed an image with new metadata"
                />
                <NavigationButton
                  page="decode"
                  text="I want to decode - check for or edit an image's embedded metadata"
                />
              </div>

        <div>
            <h2>Saved images</h2>
            <p>Try appending any 8-digit number (padded with 0s) to the end of the url, or try the below:</p>
            <div className="flex flex-col">
              {images.map((image) => 
                <Link href={`/${image.id}`} key={image.id}>{image.id}</Link>
              )}
            </div>
        </div>        


            <div className="flex flex-col gap-4 place-items-center">
                {/*<Encode />
                <Decode />*/}
            </div>

            <About />

            {/* <div>
                <h2>Saved images</h2>
                <p>
                    Try appending any 8-digit number (padded with 0s) to the end
                    of the url, or try the below:
                </p>
                <div className="flex flex-col">
                    {images.map((image) => (
                        <Link href={`/${image.id}`} key={image.id}>
                            {image.id}
                        </Link>
                    ))}
                </div>
            </div> */}
        </div>
    );
}
