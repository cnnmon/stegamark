import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  const resp = await client.users.list({});
  return response.status(200).json({ resp });
};

export default handler;
