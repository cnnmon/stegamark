import { client } from '../../lib/constants';

const handler = async (_request, response) => {

  try {
    const resp = await client.pages.create({
        parent: {
            type: "database_id",
            database_id: "8305e69ba7d449718d78c12f087f9437"
        },
        properties: {
            name: {
              type: "title",
              title: [{
                type: "text",
                text: {
                  content: "Title1"
                }
              }]
            },
            uuid8: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: "12345678"
                  }
                }]
            },
            uploader: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: "You"
                  }
                }]
            },
            attr_url: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: "example.com"
                  }
                }]
            },
            attr_alias: {
                type: "rich_text",
                rich_text: [{
                  text: {
                    content: "Shmothy"
                  }
                }]
            },
            attr_date: {
                type: "date",
                date: {
                  start: "2020-12-08"
                }
            },
        }
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
