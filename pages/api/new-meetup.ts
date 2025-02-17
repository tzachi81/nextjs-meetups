import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './dbConnet';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'POST') {
    const data = request.body; // new meetup details sent from add new meetup form


    const meetupsCollection = client.db('meetups').collection('meetups');

    await meetupsCollection.insertOne(data)
      .then(() => {
        response
          .status(201)
          .json({ message: 'Meetup was created in the Data-Base', details: data });
      })
      .catch((error: Error) => {
        console.error(error.message);
        response
          .status(500)
          .json({ message: `Failed to create meetup ${data.title}` })
      }
      );

    client.close();

  }


}

export default handler;