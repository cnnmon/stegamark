
import React, { useEffect } from "react";
import Image from 'next/image';

function Card({ color, img, content, link }) {
    return (
        <div className="flex flex-col items-center">
            <div style={{ backgroundColor: color }} onClick={() => window.location.href=link} className="nav-card">
                <Image src={img} alt="encode/decode art" width={290} height={290} />
                <br />
                {content}
            </div>
        </div>

    )
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
            <div className="flex flex-col items-center">
                <h1>StegaMark</h1>
                <p>All-in-one tool for reliable, deep digital watermarking & image attribution.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-center gap-4 px-0 lg:px-16">
                    <Card color="#C69AFE" img="/encode_art.png" link="/encode" content={<h3>I want to <b><u>encode</u></b> a new image.</h3>} />
                    <h2><b>or</b></h2>
                    <Card color="#F8D479" img="/decode_art.png" link="/decode" content={<h3>I want to <b><u>decode</u></b> an existing image.</h3>} />
                </div>
            </div>
            <div>
                <h4>Explore previously embedded images</h4>
                <p>Click on an image to view its metadata and more information about its embedding. Or, try decoding one of these images.</p>
                <br />
                <div className="flex flex-row gap-4 justify-center">
                    {images.map((image) => 
                        <>
                            <div key={image.id} className="preview-card" onClick={() => window.location.href=`/${image.id}`}>
                                <Image src={image.src} alt={image.id} width={300} height={300} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div>
                <h4>Why do we need robust embedding?</h4>
                <p>Robust embedding is essential in the digital age. Our tool offers an invisible watermark that contributes to the proper attribution of artists and creators, while also being robust to compression and sharing across social media. Try it out yourself!</p>
            </div>
        </div>
    );
}
