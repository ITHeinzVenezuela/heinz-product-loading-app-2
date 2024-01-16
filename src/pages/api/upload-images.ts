import { NextApiRequest, NextApiResponse } from "next";

const uploadImages = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    // Process a POST request
    response.status(200).json({ data: 'success' });
  } else {
    // Handle any other HTTP method
    response.status(405).json({ error: `Method '${request.method}' Not Allowed` });
  }
}

export default uploadImages