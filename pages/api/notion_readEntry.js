import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.databases.query({
        database_id: "de1ffc3759bf450fbc16df4c69d22d95",
        filter: {
          property: "id",
          title: {
            equals: "00000001"
          }
        }
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
