import { client } from '../../lib/constants';

const handler = async (_request, response) => {
   try {
    const resp = await client.databases.query({
        database_id: "de1ffc3759bf450fbc16df4c69d22d95",
    });
    const results = resp.results;
    const images = [];
    // iterates through all the rows in the db
    for (const result of results) {
      var properties = result.properties;
      images.push({id: properties.id.title[0].plain_text, src: properties.src.rich_text[0].plain_text, metadata: properties.metadata.rich_text[0].plain_text});
    }
    return response.status(200).json({ images });
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
