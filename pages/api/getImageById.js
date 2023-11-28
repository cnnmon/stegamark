import { client } from '../../lib/constants';

const handler = async (request, response) => {
  const { id } = request.query;

  try {
    const resp = await client.databases.query({
        database_id: "de1ffc3759bf450fbc16df4c69d22d95",
        filter: {
          property: "id",
          title: {
            equals: id
          }
        }
    });
    if (resp.results.length === 0) {
      return response.status(404).json({ message: `Image with id: ${id} not found.` });
    }
    const properties = resp.results[0].properties;
    const image = {id: properties.id.title[0].plain_text, src: properties.src.rich_text[0].plain_text, metadata: properties.metadata.rich_text[0].plain_text}
    return response.status(200).json({ image });
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
