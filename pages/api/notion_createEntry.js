import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.pages.create({
        parent: {
            type: "database_id",
            database_id: "de1ffc3759bf450fbc16df4c69d22d95"
        },
        properties: {
            id: {
              type: "title",
              title: [{
                type: "text",
                text: {
                  content: _request.query.title
                }
              }]
            },
            src: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: _request.query.src
                  }
                }]
            },
            metadata: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: `{ "key": ${_request.query.metadata} }`
                  }
                }]
            },
        }
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
