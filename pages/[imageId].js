import Image from 'next/image';
import Back from '../components/Back';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/* Returns all possible paths for https://website.com/:imageId */
export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/api/getAllImages`);

  if (!response.ok) {
    return {
      paths: [],
      fallback: false
    };
  }

  const { images } = await response.json();
  return {
    paths: images.map((image) => ({ params: { imageId: image.id.toString() } })),
    fallback: false
  };
}

/* Returns props if given a specific image id */
export async function getStaticProps({ params: { imageId } }) {
  const response = await fetch(`${API_URL}/api/getImageById?id=${imageId}`);

  if (!response.ok) {
    throw new Error(JSON.stringify(response));
  }

  const { image } = await response.json();

  if (!image) {
    throw new Error(JSON.stringify(response));
  }

  return {
    props: {
      image,
    }
  };
}

/* Render page */
export default function ImageLookup({ image }) {
  if (!image) {
    return (
      <>
        <Back />
        <p>Image not found</p>
      </>
    );
  }

  const { id, src, metadata } = image;

  /* If metadata is given as a string, parse it into JSON 
    and render each key-value pair as a <p> element */
  function renderMetadata() {
    if (!metadata) {
      return null;
    }

    try {
      const parsedMetadata = JSON.parse(metadata);
      return (
        <>
          {Object.keys(parsedMetadata).map((key) => 
            <p key={key}><b>{key}</b> {parsedMetadata[key]}</p>
          )}
        </>
      );
    } catch (error) {
      return <p>{metadata}</p>;
    }
  }
  
  return (
    <>
      <div className="flex flex-col gap-4">
        <Image src={src} alt={id} width={300} height={300} />
        <div>
          <h2>General Information</h2>
          <p><b>ID</b> {id}</p>
          <p><b>Source</b> <Link href={src} className="overflow-ellipsis overflow-hidden">{src}</Link></p>
        </div>
        <div>
          <h2>Decoded Metadata</h2>
          {renderMetadata()}
        </div>
      </div>
    </>
  );
}