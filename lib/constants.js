const { Client } = require("@notionhq/client")

export const images = [
  { id: '00000001', src: 'https://pbs.twimg.com/media/FBigYlMXEAIRzej?format=jpg&name=4096x4096', metadata: `{ "Author": "data for test1", "Date": "0002302", "Twitter Handle": "@twitter" }` },
  { id: '00000002', src: 'https://pbs.twimg.com/media/FBigYmKWEAUv1sY?format=jpg&name=4096x4096', metadata: `{ "key": "data for test2" }` },
  { id: '00000003', src: 'https://pbs.twimg.com/media/FEgfuwSVgAI-P5F?format=png&name=small', metadata: `{ "key": "data for test3" }` },
];

export const STATES = {
  DEFAULT: 'DEFAULT',
  UPLOADING: 'UPLOADING',
  ERROR_NO_FILE: 'ERROR_NO_FILE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  FAILURE_DECODE: 'FAILURE',
}

export const ENCODING_TYPES = ["RoSteALS: Robust Steganography using Autoencoder Latent Space", "EXIF Data", "QR Code"];

export const client = new Client({
  auth: "secret_L3sgvYtiLhQPlbT6LYuCmC8xLigzRi6JiOborAxNgPC"
});

export function getStatusMessage(uploadState) {
  switch (uploadState) {
    case STATES.DEFAULT:
      return 'Fill out the required fields and upload an image.';
    case STATES.UPLOADING:
      return 'Processing... (This may take a few minutes)';
    case STATES.UPLOADED:
      return 'Image uploaded!';
    case STATES.ERROR_NO_FILE:
      return 'Please select an image.';
    case STATES.SUCCESS:
        return 'Success!';
    case STATES.ERROR:
      return 'Something went wrong. Please try again.';
    case STATES.FAILURE_DECODE:
      return 'Could not decode image. The metadata either may not exist, or has been corrupted.'
    default:
      return 'Something went wrong.';
  }
}