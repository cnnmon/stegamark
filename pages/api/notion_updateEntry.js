import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.pages.update({
        page_id: "942ee638392a4ce0b6982848b7a8f678",
        properties: {
          id: {
            type: "title",
            title: [{
              type: "text",
              text: {
                content: "00000004"
              }
            }]
          },
          src: {
              type: "rich_text",
              rich_text: [{
                text: {
                  content: "example.com"
                }
              }]
          },
          metadata: {
              type: "rich_text",
              rich_text: [{
                text: {
                  content: "{Author: You}"
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
