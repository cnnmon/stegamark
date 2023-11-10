import { images } from '../../lib/constants';

const handler = async (_request, response) => {
  // TODO: fetch image ids from DB here
  return response.status(200).json({ images });
};

export default handler;
