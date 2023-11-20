import { client } from '../../lib/constants';

// The API does not support permanently deleting pages. This is consistent with the Notion UI.
// from https://developers.notion.com/reference/archive-a-page

const handler = async (_request, response) => {

  try {
    const resp = await client.pages.update({
        page_id: "29276451-d0b4-4258-82a5-703768acaac2",
        archived: true
    });
    return response.status(200).json({ resp })
  } catch (err) {
    return response.status(500).json({ err });
  }
};

export default handler;
