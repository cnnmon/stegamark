import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.databases.create({
        parent: {
            type: "page_id",
            page_id: "942ee638392a4ce0b6982848b7a8f678"
        },
        title: [
            {
                type: "text",
                text: {
                    content: "image_metadata"
                }
            }
        ],
        properties: {
            name: {
              title: {}
            },
            uuid8: {
                type: "rich_text",
                rich_text: {}
            },
            uploader: {
                type: "rich_text",
                rich_text: {}
            },
            attr_url: {
                type: "rich_text",
                rich_text: {}
            },
            attr_alias: {
                type: "rich_text",
                rich_text: {}
            },
            attr_date: {
                type: "date",
                date: {}
            },
        }
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
