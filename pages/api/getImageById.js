import { images } from '../../lib/constants';

const handler = async (request, response) => {
  const { id } = request.query;

  // TODO: retrieve image from DB here, if it exists
  const image = images.find((image) => image.id === id);

  if (!image) {
    return response.status(404).json({ message: `Image with id: ${id} not found.` });
  }

  return response.status(200).json({ image });
};

export default handler;
