import React, { useEffect } from 'react';

function NavigationButton({ page, text }) {
  const onClick = () => {
    window.location.href = `/${page}`;
  }

  return (
    <button onClick={onClick} className="bg-gray-200 flex items-center rounded-lg w-[50%] h-[200px] justify-center p-5">
      {text}
    </button>

  )
}

export default function Home() {
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    fetch('/api/getAllImages')
      .then((response) => response.json())
      .then((data) => setImages(data.images));
  });
 
  return (
    <div className="gap-8 grid">
      <div className="flex flex-col items-center">
        <h1>StegaMark</h1>
        <p>reliable, deep digital watermarking & image attribution</p>
      </div>

      <div className="flex gap-4 justify-center">
        <NavigationButton
          page="encode"
          text="I want to encode a new image"
        />
        <NavigationButton
          page="decode"
          text="I want to decode an existing images"
        />
      </div>

      <div>
        <h2>Saved images</h2>
        <div className="flex flex-col">
          {images.map((image) => 
            <a href={`/${image.id}`} key={image.id}>{image.id}</a>
          )}
        </div>
      </div>
    </div>
  );
}