import Image from 'next/image';
import Back from '../components/Back';
import { images } from '../lib/constants';
import Link from 'next/link';

// TODO: Change this to wherever it's hosted
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/* Returns all possible paths for https://website.com/:imageId */
export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/api/getAllImages`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { images } = await response.json();
  return {
    paths: images.map((image) => ({ params: { imageId: image.id } })),
    fallback: false
  };
}

/* Returns props if given a specific image id */
export async function getStaticProps({ params: { imageId } }) {
  const response = await fetch(`${API_URL}/api/getImageById?id=${imageId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return {
    props: {
      image: images.find(({ id }) => id === imageId)
    }
  };
}

/* Render page */
export default function ImageLookup({ image }) {
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
      <Back />
      <div className="flex flex-col gap-4">
        <Image src={src} alt={id} width={300} height={300} />
        <div>
          <h2>General</h2>
          <p><b>ID</b> {id}</p>
          <p><b>Source</b> <Link href={src} className="overflow-ellipsis overflow-hidden">{src}</Link></p>
        </div>
        <div>
          <h2>Metadata</h2>
          {renderMetadata()}
        </div>
      </div>
    </>
  );
}