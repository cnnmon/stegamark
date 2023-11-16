import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.databases.query({
        database_id: "8305e69ba7d449718d78c12f087f9437",
        filter: {
          property: "name",
          text: {
            content: "Title1"
          },
          and: [{
            property: "uuid8",
            rich_text: {
              equals: "12345678"
            }
          }]
        }
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
